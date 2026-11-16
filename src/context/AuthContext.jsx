import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const API_BASE = 'http://localhost:8080/api';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ficm_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ficm_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ficm_current_user');
      localStorage.removeItem('ficm_token');
    }
  }, [currentUser]);

  // Login - calls Spring Boot backend
  const login = async (email, password, roleHint = null) => {
    setAuthError('');
    setLoading(true);

    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      setLoading(false);
      return false;
    }

    try {
      // Try backend API first
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Save JWT token
        localStorage.setItem('ficm_token', data.token);

        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role === 'FREELANCER' ? 'Freelancer' : 'Client',
          company: 'DK Creative Studio',
          token: data.token
        };

        setCurrentUser(userData);
        setLoading(false);
        return true;
      } else {
        // Fallback to local demo login
        return localLogin(email, password, roleHint);
      }
    } catch (err) {
      // Backend not running - fallback to local demo login
      console.warn('Backend not available, using local demo login');
      return localLogin(email, password, roleHint);
    }
  };

  // Local demo login (when backend is offline)
  const localLogin = (email, password, roleHint) => {
    let detectedRole = roleHint;
    if (!detectedRole) {
      if (email.includes('client') || email.includes('technova') || email.includes('karthik')) {
        detectedRole = 'Client';
      } else {
        detectedRole = 'Freelancer';
      }
    }

    const userData = {
      id: detectedRole === 'Freelancer' ? 'fl-1' : 'cli-1',
      name: detectedRole === 'Freelancer' ? 'Dhanushya Muthumani' : 'Dhivya Murugeshan',
      email: email,
      role: detectedRole,
      company: detectedRole === 'Freelancer' ? 'DK Creative Studio' : 'Murugeshan Enterprises'
    };

    setCurrentUser(userData);
    setLoading(false);
    return true;
  };

  // Register - calls Spring Boot backend
  const register = async (formData, role) => {
    setAuthError('');
    setLoading(true);

    if (!formData.email || !formData.password || !formData.name) {
      setAuthError('Please fill in all mandatory fields.');
      setLoading(false);
      return false;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role === 'Freelancer' ? 'FREELANCER' : 'CLIENT',
          phone: formData.phone || '',
          company: formData.company || ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('ficm_token', data.token);

        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role === 'FREELANCER' ? 'Freelancer' : 'Client',
          company: formData.company || '',
          token: data.token
        };

        setCurrentUser(userData);
        setLoading(false);
        return userData;
      } else {
        const err = await response.json();
        setAuthError(err.error || 'Registration failed');
        setLoading(false);
        return false;
      }
    } catch (err) {
      // Fallback local register
      const newUser = {
        id: 'user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        role: role,
        company: formData.company || '',
        phone: formData.phone || ''
      };
      setCurrentUser(newUser);
      setLoading(false);
      return newUser;
    }
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    setAuthError('');
    setLoading(false);
  };

  // Quick role switch for demo — direct state set (no async gap = no blank flash)
  const switchRole = (role) => {
    if (role === 'Freelancer') {
      setCurrentUser({
        id: 'fl-1',
        name: 'Dhanushya Muthumani',
        email: 'dhanushya@freelancer.dev',
        role: 'Freelancer',
        company: 'DK Creative Studio'
      });
    } else {
      setCurrentUser({
        id: 'cli-1',
        name: 'Dhivya Murugeshan',
        email: 'dhivya@murugeshan.in',
        role: 'Client',
        company: 'Murugeshan Enterprises'
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      authError,
      setAuthError,
      loading,
      login,
      register,
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
