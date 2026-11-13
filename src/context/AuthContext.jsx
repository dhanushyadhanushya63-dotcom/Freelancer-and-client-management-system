import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ficm_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ficm_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ficm_current_user');
    }
  }, [currentUser]);

  // Login handler
  const login = (email, password, roleHint = null) => {
    setAuthError('');
    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      return false;
    }

    // Role check logic
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
      name: detectedRole === 'Freelancer' ? 'Vimalanathan R.' : 'Karthik Subramanian',
      email: email,
      role: detectedRole, // 'Freelancer' | 'Client'
      company: detectedRole === 'Freelancer' ? 'Vimal Tech Studio' : 'TechNova Solutions',
      avatar: detectedRole === 'Freelancer' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    };

    setCurrentUser(userData);
    return true;
  };

  // Register handler
  const register = (formData, role) => {
    setAuthError('');
    if (!formData.email || !formData.password || !formData.name) {
      setAuthError('Please fill in all mandatory fields.');
      return false;
    }

    const newUser = {
      id: 'user-' + Date.now(),
      name: formData.name,
      email: formData.email,
      role: role, // 'Freelancer' or 'Client'
      company: formData.company || (role === 'Freelancer' ? 'Independent Freelancer' : 'Independent Client'),
      phone: formData.phone || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`
    };

    return newUser;
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    setAuthError('');
  };

  // Quick switch role for testing demo
  const switchRole = (role) => {
    if (role === 'Freelancer') {
      login('vimal@freelancer.dev', 'password123', 'Freelancer');
    } else {
      login('karthik@technova.io', 'password123', 'Client');
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      authError,
      setAuthError,
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
