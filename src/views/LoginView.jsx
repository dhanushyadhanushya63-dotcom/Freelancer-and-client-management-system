import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, ArrowRight, ArrowLeft, Shield, User, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginView({ onBackToHome }) {
  const { login, authError, setAuthError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Freelancer'); // 'Freelancer' or 'Client'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setAuthError('Please fill in both email and password.');
      return;
    }

    login(email.trim(), password.trim(), selectedRole);
  };

  const handleQuickDemoLogin = (role) => {
    if (role === 'Freelancer') {
      setEmail('vimal@freelancer.dev');
      setPassword('demo1234');
      setSelectedRole('Freelancer');
      login('vimal@freelancer.dev', 'demo1234', 'Freelancer');
    } else {
      setEmail('karthik@technova.io');
      setPassword('demo1234');
      setSelectedRole('Client');
      login('karthik@technova.io', 'demo1234', 'Client');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-indigo-50/40 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 px-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home Page
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-600/30">
            ₹
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Sign In to Your Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Module 2: Authenticate and route directly to your role dashboard
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
          {/* Error Message Box (Flowchart: Show Error Message) */}
          {authError && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{authError}</span>
            </div>
          )}

          {/* Role Selector Tabs */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select Your Role (Routing Target)
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedRole('Freelancer')}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition ${
                  selectedRole === 'Freelancer'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" /> Freelancer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Client')}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition ${
                  selectedRole === 'Client'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" /> Client
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'Freelancer' ? 'vimal@freelancer.dev' : 'karthik@technova.io'}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition active:scale-98"
            >
              Sign In to {selectedRole} Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
              Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Freelancer')}
                className="py-2 px-3 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition text-center"
              >
                Demo Freelancer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Client')}
                className="py-2 px-3 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 transition text-center"
              >
                Demo Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
