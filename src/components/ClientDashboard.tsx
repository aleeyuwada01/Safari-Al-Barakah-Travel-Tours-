import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Plane, Hotel, Calendar, Mail, 
  Download, Printer, AlertCircle, FileText, Phone, ArrowRight,
  Shield, ExternalLink, User, FileCheck, Receipt, Building, Check,
  ChevronLeft, ChevronRight, Layers, BookOpen, Compass, PanelLeftClose, PanelLeft, Plus
} from 'lucide-react';
import { AutomatedEmail, BookingReservation, ClientItinerary, UserAccount } from '../types';

interface ClientDashboardProps {
  reservations: BookingReservation[];
  itineraries: ClientItinerary[];
  emails: AutomatedEmail[];
  currentUser: UserAccount | null;
  onOpenEmailPreview: (email: AutomatedEmail) => void;
  onOpenBookingModal: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  reservations,
  itineraries,
  emails,
  currentUser,
  onOpenEmailPreview,
  onOpenBookingModal
}) => {
  // Collapsible sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [selectedReservationId, setSelectedReservationId] = useState<string>(
    reservations[0]?.id || ''
  );
  const [activeTab, setActiveTab] = useState<'vouchers' | 'receipt' | 'itinerary' | 'emails'>('vouchers');

  const currentReservation = reservations.find(r => r.id === selectedReservationId) || reservations[0];
  const currentItinerary = itineraries.find(it => it.reservationId === currentReservation?.id || it.bookingRef === currentReservation?.referenceCode);
  const clientEmails = emails.filter(e => e.bookingRef === currentReservation?.referenceCode || e.recipientEmail === currentReservation?.clientEmail);

  if (!currentReservation) {
    return (
      <div className="bg-[#f4f7fc] min-h-screen py-16 text-center text-slate-500 space-y-4">
        <p className="text-sm font-semibold">No travel dossiers found in your account.</p>
        <button
          onClick={onOpenBookingModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
        >
          Submit Passport Application
        </button>
      </div>
    );
  }

  const isApproved = currentReservation.status === 'approved' || currentReservation.status === 'completed';

  return (
    <div className="bg-[#f4f7fc] min-h-screen text-slate-800 flex flex-col md:flex-row">
      
      {/* ======================================================== */}
      {/* COLLAPSIBLE PASSENGER SIDEBAR (Left Rail) */}
      {/* ======================================================== */}
      <aside 
        className={`bg-white border-r border-slate-200/90 shrink-0 transition-all duration-300 ease-in-out flex flex-col justify-between hidden md:flex ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-4 space-y-6">
          
          {/* Sidebar Header & Toggle */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentReservation.clientName.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {currentReservation.clientName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    {currentReservation.referenceCode}
                  </div>
                </div>
              </div>
            )}
            {isSidebarCollapsed && (
              <div className="w-8 h-8 mx-auto rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {currentReservation.clientName.charAt(0).toUpperCase()}
              </div>
            )}

            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>
          </div>

          {/* Dossier Switcher if multiple */}
          {!isSidebarCollapsed && reservations.length > 1 && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Select Active Dossier
              </label>
              <select
                value={selectedReservationId}
                onChange={(e) => setSelectedReservationId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg p-2 focus:border-blue-600 focus:outline-none"
              >
                {reservations.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res.country} ({res.referenceCode})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            
            {/* Tickets & Vouchers */}
            <button
              onClick={() => setActiveTab('vouchers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'vouchers'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Tickets & Vouchers"
            >
              <div className="flex items-center gap-2.5">
                <Plane className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Tickets & Vouchers</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'vouchers' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {currentReservation.flightBooking ? 'Active' : 'Pending'}
                </span>
              )}
            </button>

            {/* Payment Receipt */}
            <button
              onClick={() => setActiveTab('receipt')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'receipt'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Official Payment Receipt (₦)"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Payment Receipt (₦)</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'receipt' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  ₦
                </span>
              )}
            </button>

            {/* Travel Itinerary */}
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Travel Itinerary"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Travel Itinerary</span>}
              </div>
            </button>

            {/* Consular Email Notices */}
            <button
              onClick={() => setActiveTab('emails')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'emails'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Automated Notices"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Email Notices</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'emails' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {clientEmails.length}
                </span>
              )}
            </button>

          </nav>

          {/* Quick Actions in Sidebar */}
          {!isSidebarCollapsed && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Quick Actions
              </div>
              <button
                onClick={onOpenBookingModal}
                className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Application</span>
              </button>
              <button
                onClick={() => window.print()}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
            </div>
          )}

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 text-slate-500 text-[11px]">
          {!isSidebarCollapsed ? (
            <div className="space-y-1">
              <div className="font-bold text-slate-700">Passenger Hotline</div>
              <div>+234 8039521527</div>
            </div>
          ) : (
            <div className="text-center font-bold text-blue-600">SAB</div>
          )}
        </div>

      </aside>

      {/* ======================================================== */}
      {/* MAIN PASSENGER DASHBOARD CONTENT CANVAS */}
      {/* ======================================================== */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 space-y-6 overflow-y-auto max-w-7xl">
        
        {/* Mobile Sidebar Strip */}
        <div className="md:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-800">Dossier:</span>
            <span className="text-xs font-bold text-blue-600 uppercase">{activeTab}</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md"
          >
            {mobileSidebarOpen ? 'Close Menu' : 'Switch Tab'}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-white rounded-xl border border-slate-200 p-3 space-y-2 text-xs">
            <button
              onClick={() => { setActiveTab('vouchers'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeTab === 'vouchers' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Tickets & Vouchers
            </button>
            <button
              onClick={() => { setActiveTab('receipt'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeTab === 'receipt' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Payment Receipt (₦)
            </button>
            <button
              onClick={() => { setActiveTab('itinerary'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeTab === 'itinerary' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Travel Itinerary
            </button>
            <button
              onClick={() => { setActiveTab('emails'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeTab === 'emails' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Email Notices ({clientEmails.length})
            </button>
          </div>
        )}

        {/* 1. TOP GREETING BANNER */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hi, Welcomeback!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {currentReservation.clientName} Passenger Dashboard,
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Published Tariff</span>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tabular-nums">
                ₦{currentReservation.totalAmountNgn.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Payment Status</span>
              <span className="font-extrabold text-emerald-600 text-sm sm:text-base uppercase">
                {currentReservation.paymentReceiptVerified ? 'VERIFIED' : 'RECORDED'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Dossier Ref</span>
              <span className="font-mono font-extrabold text-blue-600 text-sm sm:text-base">
                {currentReservation.referenceCode}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Destination</span>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                {currentReservation.country}
              </span>
            </div>

            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Travel Dossier</span>
            </button>
          </div>
        </div>

        {/* 2. FOUR PRIMARY TRAVEL KPI METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Consular Review Stage</span>
              <Shield className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-black text-slate-900 capitalize truncate">
                {isApproved ? 'Visa Granted' : currentReservation.status.replace('_', ' ')}
              </div>
              <div className="text-[11px] font-bold text-emerald-600 mt-1">
                ✓ <span className="text-slate-500 font-normal">Diplomatic Liaison Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Lead Passenger</span>
              <User className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-black text-slate-900 truncate">
                {currentReservation.clientName}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">
                Passport: <strong className="text-slate-800">{currentReservation.passportNumber || 'A09876543'}</strong>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Confirmed Flight PNR</span>
              <Plane className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono">
                {currentReservation.flightBooking ? currentReservation.flightBooking.pnr : 'In Ticketing'}
              </div>
              <div className="text-[11px] font-bold text-slate-500 mt-1">
                {currentReservation.flightBooking ? currentReservation.flightBooking.airline : 'Airline Booking Desk'}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Hotel Lodging Voucher</span>
              <Hotel className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
                {currentReservation.hotelBooking ? currentReservation.hotelBooking.confirmationNumber : 'In Allocation'}
              </div>
              <div className="text-[11px] font-bold text-slate-500 mt-1 truncate">
                {currentReservation.hotelBooking ? currentReservation.hotelBooking.hotelName.slice(0, 22) : '5-Star Accommodations'}
              </div>
            </div>
          </div>
        </div>

        {/* 3. DETAILED REPORTS & READINESS DONUT */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-slate-800">Dossier Progression & Travel Readiness</h2>
              <span className="text-xs text-blue-600 font-semibold hidden sm:inline-block">
                {currentReservation.packageName} ({currentReservation.country})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedReservationId}
                onChange={(e) => setSelectedReservationId(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg px-2.5 py-1 focus:border-blue-600 focus:outline-none"
              >
                {reservations.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res.clientName} — {res.country}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">
                ₦{currentReservation.totalAmountNgn.toLocaleString()}
              </div>
              <div className="text-base font-bold text-slate-800">
                {currentReservation.packageName}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Your international passport data is audited and submitted to embassy consular desks. Confirmed airline reservation and 5-star lodging are linked directly to your dossier.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="w-36 text-slate-600 font-medium truncate">Passport Biodata Audit</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="font-bold text-emerald-600 text-[11px] w-14 text-right">Verified</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="w-36 text-slate-600 font-medium truncate">Embassy Diplomatic Review</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: isApproved ? '100%' : '80%' }}></div>
                </div>
                <span className="font-bold text-amber-600 text-[11px] w-14 text-right">
                  {isApproved ? 'Granted' : 'In Review'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="w-36 text-slate-600 font-medium truncate">Airline Flight E-Ticket</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: currentReservation.flightBooking ? '100%' : '50%' }}></div>
                </div>
                <span className="font-bold text-slate-800 text-[11px] w-14 text-right font-mono">
                  {currentReservation.flightBooking ? currentReservation.flightBooking.pnr : 'Pending'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="w-36 text-slate-600 font-medium truncate">Hotel Lodging Voucher</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: currentReservation.hotelBooking ? '100%' : '50%' }}></div>
                </div>
                <span className="font-bold text-slate-800 text-[11px] w-14 text-right font-mono">
                  {currentReservation.hotelBooking ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="11" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#22c55e" strokeWidth="11" fill="none" strokeDasharray="238.7" strokeDashoffset={isApproved ? "20" : "50"} strokeLinecap="round" />
                  <circle cx="50" cy="50" r="38" stroke="#f59e0b" strokeWidth="11" fill="none" strokeDasharray="238.7" strokeDashoffset="180" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="11" fill="none" strokeDasharray="238.7" strokeDashoffset="210" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                    {isApproved ? '98%' : '85%'}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-2">Dossier Readiness Score</span>
            </div>
          </div>
        </div>

        {/* 4. FOUR COLORED TRAVEL METRIC TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#00c986] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-100 block">Consular Status</span>
              <div className="text-lg font-black capitalize">
                {isApproved ? 'Visa Granted' : 'Embassy Review'}
              </div>
            </div>
          </div>

          <div className="bg-[#248aff] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-blue-100 block">Payment Settled</span>
              <div className="text-lg font-black tabular-nums">
                ₦{currentReservation.totalAmountNgn.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-[#ff4069] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-rose-100 block">Flight E-Ticket</span>
              <div className="text-lg font-black font-mono">
                {currentReservation.flightBooking ? currentReservation.flightBooking.pnr : 'Confirmed PNR'}
              </div>
            </div>
          </div>

          <div className="bg-[#ff9f00] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-amber-100 block">Hotel Voucher</span>
              <div className="text-lg font-black font-mono">
                {currentReservation.hotelBooking ? currentReservation.hotelBooking.confirmationNumber : 'Active Stay'}
              </div>
            </div>
          </div>
        </div>

        {/* 5. PASSENGER APPLICATION DOSSIER WORKBENCH */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
          
          {/* TAB 1: TICKETS & VOUCHERS */}
          {activeTab === 'vouchers' && (
            <div className="space-y-6">
              
              {/* Flight E-Ticket Card */}
              {currentReservation.flightBooking ? (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold">
                      <Plane className="w-4 h-4 text-sky-400" />
                      <span>Confirmed Flight E-Ticket (Admin Issued)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">PNR:</span>
                      <span className="bg-blue-600 text-white font-mono px-2 py-0.5 rounded font-black text-xs">
                        {currentReservation.flightBooking.pnr}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Airline & Flight</span>
                      <strong className="text-slate-900 text-sm">{currentReservation.flightBooking.airline}</strong>
                      <div className="text-slate-500">{currentReservation.flightBooking.flightNumber} · {currentReservation.flightBooking.cabinClass} Class</div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Departure</span>
                      <strong className="text-slate-900">{currentReservation.flightBooking.departureAirport}</strong>
                      <div className="text-blue-600 font-bold">{currentReservation.flightBooking.departureTime}</div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Arrival Destination</span>
                      <strong className="text-slate-900">{currentReservation.flightBooking.arrivalAirport}</strong>
                      <div className="text-blue-600 font-bold">{currentReservation.flightBooking.arrivalTime}</div>
                    </div>

                    <div className="flex flex-col justify-center items-start md:items-end">
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold border border-emerald-200">
                        ✓ Verified by Ticketing Desk
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Boarding Slip</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong>Flight Reservation Pending:</strong> Our travel ticketing desk is finalizing the round-trip flight booking to match your consular appointment.
                  </div>
                </div>
              )}

              {/* Hotel Voucher Card */}
              {currentReservation.hotelBooking ? (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold">
                      <Hotel className="w-4 h-4 text-amber-400" />
                      <span>Hotel Lodging Voucher (Admin Issued)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Voucher Ref:</span>
                      <span className="bg-amber-500 text-slate-950 font-mono px-2 py-0.5 rounded font-black text-xs">
                        {currentReservation.hotelBooking.confirmationNumber}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Hotel Property</span>
                      <strong className="text-slate-900 text-sm">{currentReservation.hotelBooking.hotelName}</strong>
                      <div className="text-slate-500">{currentReservation.hotelBooking.address}</div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Room Category</span>
                      <strong className="text-slate-900">{currentReservation.hotelBooking.roomType}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block uppercase font-bold">Check-In / Out</span>
                      <div className="text-slate-800">In: <strong>{currentReservation.hotelBooking.checkIn}</strong></div>
                      <div className="text-slate-800">Out: <strong>{currentReservation.hotelBooking.checkOut}</strong></div>
                    </div>

                    <div className="flex flex-col justify-center items-start md:items-end">
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold border border-emerald-200">
                        ✓ Confirmed Lodging
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Hotel Voucher</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <strong>Hotel Voucher Processing:</strong> Lodging accommodation is currently being assigned by our hotel reservation desk.
                  </div>
                </div>
              )}

              {/* Visa Grant Slip */}
              {currentReservation.visaGrantNumber && (
                <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Official Visa Grant Number
                    </span>
                    <div className="text-lg font-black font-mono text-emerald-900">
                      {currentReservation.visaGrantNumber}
                    </div>
                    <div className="text-xs text-emerald-700">
                      Issued: {currentReservation.visaIssuedDate || 'Recently Approved'} · Country: {currentReservation.country}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg self-start sm:self-auto">
                    Consular Visa Granted
                  </span>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: PAYMENT RECEIPT */}
          {activeTab === 'receipt' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 max-w-2xl mx-auto shadow-xs space-y-6">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-xs font-black text-blue-600 tracking-wider uppercase">
                    Safari Al-Barakah Travel & Tours
                  </div>
                  <h2 className="text-xl font-black text-slate-900 mt-0.5">
                    Official Payment Receipt
                  </h2>
                  <p className="text-xs text-slate-500">
                    Receipt Reference: <span className="font-mono font-bold text-slate-800">{currentReservation.paymentReference || 'PAY-SAB-894101'}</span>
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-lg">
                  ✓ PAID & VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Applicant</span>
                  <strong className="text-slate-900 text-sm">{currentReservation.clientName}</strong>
                  <div className="text-slate-500">{currentReservation.clientEmail}</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Package Destination</span>
                  <strong className="text-slate-900 text-sm">{currentReservation.packageName}</strong>
                  <div className="text-slate-500">{currentReservation.country}</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Payment Method</span>
                  <strong className="text-slate-900 capitalize">{currentReservation.paymentMethod ? currentReservation.paymentMethod.replace('_', ' ') : 'Direct Bank Settlement'}</strong>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-bold">Date Settled</span>
                  <strong className="text-slate-900">{currentReservation.paidAt ? new Date(currentReservation.paidAt).toLocaleDateString() : 'Confirmed'}</strong>
                </div>
              </div>

              {/* Amount Box */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Total Tariff Paid</span>
                  <div className="text-2xl font-black text-amber-400 tabular-nums">
                    ₦{currentReservation.totalAmountNgn.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-300">
                  Published Consular Tariff
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  Safari Al-Barakah Travel Ltd · CAC/RC: 1849204
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Receipt</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ITINERARY */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {currentItinerary ? (
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-black text-slate-900">{currentItinerary.title}</h3>
                    <p className="text-xs text-slate-500">Destination: {currentItinerary.destination} · Officer: {currentItinerary.agencyOfficer}</p>
                  </div>

                  <div className="space-y-3">
                    {currentItinerary.days.map((day) => (
                      <div key={day.dayNumber} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>Day {day.dayNumber}: {day.title}</span>
                          <span className="text-blue-600">{day.location}</span>
                        </div>
                        <p className="text-slate-600">{day.description}</p>
                        <div className="space-y-1 pt-1 border-t border-slate-200">
                          {day.activities.map((act) => (
                            <div key={act.id} className="flex items-center gap-2 text-slate-700">
                              <span className="font-mono text-blue-600 font-bold">{act.time}</span>
                              <span>{act.title} ({act.location})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                  Your customized itinerary is being curated by your assigned travel officer.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EMAIL NOTICES */}
          {activeTab === 'emails' && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-900">
                Automated Consular & Booking Notices ({clientEmails.length})
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {clientEmails.map((email) => (
                  <div key={email.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">{email.subject}</div>
                      <div className="text-[11px] text-slate-500">Sent: {new Date(email.sentAt).toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => onOpenEmailPreview(email)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      View Email
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>

    </div>
  );
};
