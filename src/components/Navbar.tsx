import React, { useState } from 'react';
import { 
  Search, Mail, Bell, ChevronDown, LayoutDashboard, 
  Package, FileText, Compass, UserCheck, ShieldCheck, 
  Headphones, Menu, X, LogOut, Check, Phone, Sparkles
} from 'lucide-react';
import { UserAccount } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'packages' | 'client' | 'admin';
  onNavigate: (view: 'landing' | 'packages' | 'client' | 'admin') => void;
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenFindBooking: () => void;
  onOpenBookingModal: () => void;
  onSearchGlobal: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenFindBooking,
  onOpenBookingModal,
  onSearchGlobal
}) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [showSupportMenu, setShowSupportMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      onSearchGlobal(globalSearch.trim());
      onNavigate('landing');
      const target = document.getElementById('catalog-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      
      {/* ======================================================== */}
      {/* TIER 1: Top Royal Blue Enterprise Bar (JustDo / Fily Style) */}
      {/* ======================================================== */}
      <div className="bg-[#1a73e8] text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 gap-4">
          
          {/* Left: Brand Identity with Orange-Gold Check Emblem */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              {/* Gold/Orange Emblem like the JustDo logo */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center text-blue-900 shadow-sm font-black transform group-hover:scale-105 transition-transform">
                <Check className="w-5 h-5 stroke-[3.5]" />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-black tracking-tight leading-none text-white flex items-center gap-1">
                  Safari<span className="font-extrabold text-blue-100">Al-Barakah</span>
                </div>
                <div className="text-[9px] uppercase tracking-wider text-blue-200/90 font-semibold mt-0.5">
                  Travel & Tours · Abuja & Cairo
                </div>
              </div>
            </button>
          </div>

          {/* Center: Search Now input (Exact JustDo styling) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-sm items-center relative"
          >
            <Search className="w-4 h-4 text-blue-200 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search now..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-blue-200 bg-white/15 hover:bg-white/20 focus:bg-white/25 border border-white/20 rounded-md focus:outline-none transition-all"
            />
          </form>

          {/* Right: Message, Notification Bell, User Avatar */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-white">
            
            {/* Direct Hotlines / Messages icon */}
            <div className="relative">
              <button
                onClick={() => setShowSupportMenu(!showSupportMenu)}
                className="relative p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                title="Consular Inquiries & Hotlines"
              >
                <Mail className="w-4 h-4 text-blue-100" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400"></span>
              </button>

              {showSupportMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3.5 z-50 text-xs text-slate-800 space-y-2 animate-in fade-in duration-150">
                  <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                    <span>Direct Diplomatic Hotlines</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">24/7 Desk</span>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <a href="tel:+2348039521527" className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg">
                      <span>🇳🇬 Abuja Liaison</span>
                      <strong className="text-slate-900 font-mono">+234 8039521527</strong>
                    </a>
                    <a href="tel:+201558064537" className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg">
                      <span>🇪🇬 Cairo Liaison</span>
                      <strong className="text-slate-900 font-mono">+20 1558064537</strong>
                    </a>
                    <div className="p-1.5 text-slate-500 text-[11px] flex justify-between">
                      <span>Official Email</span>
                      <span className="text-blue-600 font-medium">Safarialbarakah@gmail.com</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell with red pulse dot */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                title="Dossier Notifications"
              >
                <Bell className="w-4 h-4 text-blue-100" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3.5 z-50 text-xs text-slate-800 space-y-2.5 animate-in fade-in duration-150">
                  <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                    <span>Recent Diplomatic Alerts</span>
                    <span className="text-[10px] text-blue-600 font-bold">Consular Desk</span>
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-600">
                    <div className="p-2 bg-blue-50/60 rounded-lg border border-blue-100">
                      <span className="font-bold text-slate-900 block">UK Standard Visitor Dossiers</span>
                      <span>TLScontact biometric slots now allocated for Abuja & Lagos applicants.</span>
                    </div>
                    <div className="p-2 bg-emerald-50/60 rounded-lg border border-emerald-100">
                      <span className="font-bold text-slate-900 block">Confirmed E-Tickets Issued</span>
                      <span>British Airways PNR SAB789BA generated for approved UK dossier.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar with Name & Dropdown Caret */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-xs text-white shadow-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold hidden sm:inline-block max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-xs text-white">
                    U
                  </div>
                  <span className="text-xs font-semibold hidden sm:inline-block">Sign in</span>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </button>
              )}

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs text-slate-800 animate-in fade-in duration-150">
                  {currentUser && (
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      onNavigate('client');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Passenger Portal</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Safari Admins Desk</span>
                  </button>
                  {currentUser ? (
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onOpenAuth();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 text-blue-600 flex items-center gap-2 border-t border-slate-100 font-bold"
                    >
                      <span>Sign in / Register</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md hover:bg-white/10 text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* TIER 2: Clean White Sub-navigation Bar (JustDo / Fily Style) */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200/90 text-slate-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 h-11 text-xs font-semibold overflow-x-auto scrollbar-none">
            
            {/* Dashboard (Home) */}
            <button
              onClick={() => onNavigate('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                currentView === 'landing'
                  ? 'text-blue-600 font-bold bg-blue-50/70 border-b-2 border-blue-600'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* Travel Packages */}
            <button
              onClick={() => onNavigate('packages')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                currentView === 'packages'
                  ? 'text-blue-600 font-bold bg-blue-50/70 border-b-2 border-blue-600'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Packages</span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded-full">
                14
              </span>
            </button>

            {/* Lodge Passport */}
            <button
              onClick={onOpenBookingModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Lodge Passport</span>
            </button>

            {/* Track Application */}
            <button
              onClick={onOpenFindBooking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Application</span>
            </button>

            {/* Passenger Portal */}
            <button
              onClick={() => onNavigate('client')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                currentView === 'client'
                  ? 'text-blue-600 font-bold bg-blue-50/70 border-b-2 border-blue-600'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Passenger Portal</span>
            </button>

            {/* Admin Desk */}
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors cursor-pointer shrink-0 ${
                currentView === 'admin'
                  ? 'text-blue-600 font-bold bg-blue-50/70 border-b-2 border-blue-600'
                  : 'hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Desk</span>
            </button>

            {/* Support Hotlines */}
            <button
              onClick={() => setShowSupportMenu(!showSupportMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer ml-auto shrink-0 text-slate-500"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hotlines: +234 8039521527</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 text-xs text-slate-800 animate-in fade-in duration-150">
          
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                onOpenBookingModal();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 bg-[#1a73e8] text-white font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Lodge Passport</span>
            </button>
            <button
              onClick={() => {
                onOpenFindBooking();
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 bg-slate-100 text-slate-800 font-bold rounded-lg flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <Search className="w-4 h-4" />
              <span>Track Ref #</span>
            </button>
          </div>

          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentView === 'landing' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              onNavigate('packages');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
              currentView === 'packages' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Travel Packages</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700 font-bold">14</span>
          </button>

          <button
            onClick={() => {
              onNavigate('client');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentView === 'client' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>Passenger Portal</span>
          </button>

          <button
            onClick={() => {
              onNavigate('admin');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 ${
              currentView === 'admin' ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Safari Admins Desk</span>
          </button>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
            <span>🇳🇬 Abuja: +234 8039521527</span>
            <span>🇪🇬 Cairo: +20 1558064537</span>
          </div>

        </div>
      )}

    </header>
  );
};
