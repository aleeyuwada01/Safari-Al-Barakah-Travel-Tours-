import React, { useState } from 'react';
import { X, User, Shield, Check, Lock, Mail, Phone, Sparkles } from 'lucide-react';
import { UserAccount } from '../types';
import { storageService } from '../services/storageService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+234 ');
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickDemoClient = () => {
    const user = storageService.login('client@safarialbarakah.com');
    if (user) {
      onLoginSuccess(user);
      onClose();
    }
  };

  const handleQuickDemoAdmin = () => {
    const user = storageService.login('admin@safarialbarakah.com');
    if (user) {
      onLoginSuccess(user);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signin') {
      if (!email) {
        setErrorMsg('Please enter your email.');
        return;
      }
      const user = storageService.login(email);
      if (user) {
        onLoginSuccess(user);
        onClose();
      } else {
        setErrorMsg('Unable to sign in. Please verify your credentials.');
      }
    } else {
      if (!name || !email) {
        setErrorMsg('Please fill in your name and email.');
        return;
      }
      const newUser = storageService.register(name, email, phone, role);
      onLoginSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {mode === 'signin' ? 'Sign in to Trip Account' : 'Create New Account'}
            </h3>
            <p className="text-xs text-slate-500">
              Manage your bookings, itineraries and visa status
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* 1-Click Demo Credentials Box */}
          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant Demo Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickDemoClient}
                className="px-3 py-2 text-xs font-semibold bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Client Demo</span>
              </button>
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className="px-3 py-2 text-xs font-semibold bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Demo</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-500 text-center">
              Client: <code>client@safarialbarakah.com</code> · Admin: <code>admin@safarialbarakah.com</code>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">Or enter details</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ibrahim Aliyu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="yourname@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className={`p-2 border rounded-lg cursor-pointer flex items-center justify-between ${role === 'client' ? 'border-blue-600 bg-blue-50 font-semibold text-blue-700' : 'border-slate-200 text-slate-600'}`}>
                    <span>Passenger / Client</span>
                    <input type="radio" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} className="hidden" />
                  </label>
                  <label className={`p-2 border rounded-lg cursor-pointer flex items-center justify-between ${role === 'admin' ? 'border-blue-600 bg-blue-50 font-semibold text-blue-700' : 'border-slate-200 text-slate-600'}`}>
                    <span>Agency Admin</span>
                    <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} className="hidden" />
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              {mode === 'signin' ? 'Sign In to Account' : 'Create & Sign In'}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="text-center text-xs text-slate-500 pt-1">
            {mode === 'signin' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Register now
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
