import React, { useState } from 'react';
import { 
  Users, CheckCircle2, Clock, Plus, Trash2, Mail, 
  Send, Search, Filter, Sparkles, Building, AlertCircle, 
  Eye, RefreshCw, FileText, Shield, Plane, Hotel, 
  FileCheck, Check, ChevronRight, X, Receipt, CreditCard, 
  Building2, Printer, ChevronLeft, Calendar, User, BookOpen, Layers,
  ChevronDown, PanelLeftClose, PanelLeft, LayoutDashboard, Settings
} from 'lucide-react';
import { 
  AutomatedEmail, 
  BookingReservation, 
  ClientItinerary, 
  ContactInquiry, 
  EmailTemplateType, 
  FlightBookingDetails, 
  HotelBookingDetails, 
  PackageCategory, 
  ReservationStatus, 
  TravelPackage 
} from '../types';
import { storageService } from '../services/storageService';

interface AdminPortalProps {
  reservations: BookingReservation[];
  packages: TravelPackage[];
  itineraries: ClientItinerary[];
  emails: AutomatedEmail[];
  inquiries: ContactInquiry[];
  onRefreshData: () => void;
  onOpenEmailPreview: (email: AutomatedEmail) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  reservations,
  packages,
  itineraries,
  emails,
  inquiries,
  onRefreshData,
  onOpenEmailPreview
}) => {
  // Collapsible sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [activeMainTab, setActiveMainTab] = useState<'submissions' | 'payments' | 'packages' | 'emails' | 'inquiries'>('submissions');
  
  // Country Filter for Submissions
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Active Reservation Processing Modal
  const [processingReservation, setProcessingReservation] = useState<BookingReservation | null>(null);
  const [processingSubTab, setProcessingSubTab] = useState<'visa' | 'flight' | 'hotel' | 'passport'>('visa');

  // Visa processing fields
  const [visaStatus, setVisaStatus] = useState<ReservationStatus>('document_verification');
  const [visaGrantNumber, setVisaGrantNumber] = useState('');
  const [visaIssuedDate, setVisaIssuedDate] = useState('');
  const [officerNote, setOfficerNote] = useState('');

  // Flight processing fields
  const [flightAirline, setFlightAirline] = useState('British Airways');
  const [flightNumber, setFlightNumber] = useState('BA 083');
  const [flightDepAirport, setFlightDepAirport] = useState('Nnamdi Azikiwe Intl Airport, Abuja (ABV)');
  const [flightArrAirport, setFlightArrAirport] = useState('London Heathrow Airport Terminal 5 (LHR)');
  const [flightDepTime, setFlightDepTime] = useState('08:20 AM');
  const [flightArrTime, setFlightArrTime] = useState('03:45 PM GMT');
  const [flightPnr, setFlightPnr] = useState('SAB789BA');
  const [flightCabin, setFlightCabin] = useState('Business');

  // Hotel processing fields
  const [hotelName, setHotelName] = useState('The Landmark London (5-Star)');
  const [hotelRoom, setHotelRoom] = useState('Executive Marylebone Suite');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-11-15');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-11-28');
  const [hotelAddress, setHotelAddress] = useState('222 Marylebone Rd, London NW1 6JQ');
  const [hotelVoucherCode, setHotelVoucherCode] = useState('LMK-LON-44910');

  // Package creator modal state
  const [isCreatingPackage, setIsCreatingPackage] = useState(false);
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgCountry, setPkgCountry] = useState('');
  const [pkgCity, setPkgCity] = useState('');
  const [pkgCategory, setPkgCategory] = useState<PackageCategory>('Visa');
  const [pkgPriceNgn, setPkgPriceNgn] = useState<number>(650000);
  const [pkgProcessingTime, setPkgProcessingTime] = useState('5 - 7 Working Days');
  const [pkgValidity, setPkgValidity] = useState('30 Days Single Entry');
  const [pkgDescription, setPkgDescription] = useState('');

  // Country filter options
  const countryFilters = [
    { label: 'All Countries', value: 'all' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'France / Schengen', value: 'France / Schengen' },
    { label: 'Dubai / UAE', value: 'United Arab Emirates' },
    { label: 'Egypt', value: 'Egypt' },
    { label: 'China', value: 'China' },
    { label: 'United States', value: 'United States' },
    { label: 'Saudi Arabia', value: 'Saudi Arabia' }
  ];

  // Open processing drawer with prefilled values
  const handleOpenProcessing = (res: BookingReservation) => {
    setProcessingReservation(res);
    setVisaStatus(res.status);
    setVisaGrantNumber(res.visaGrantNumber || `SAB-GRT-${res.referenceCode.replace('SAB-', '')}`);
    setVisaIssuedDate(res.visaIssuedDate || new Date().toISOString().split('T')[0]);
    setOfficerNote('');

    if (res.flightBooking) {
      setFlightAirline(res.flightBooking.airline);
      setFlightNumber(res.flightBooking.flightNumber);
      setFlightDepAirport(res.flightBooking.departureAirport);
      setFlightArrAirport(res.flightBooking.arrivalAirport);
      setFlightDepTime(res.flightBooking.departureTime);
      setFlightArrTime(res.flightBooking.arrivalTime);
      setFlightPnr(res.flightBooking.pnr);
      setFlightCabin(res.flightBooking.cabinClass);
    } else {
      setFlightAirline(res.country.includes('Kingdom') ? 'British Airways (BA 083)' : res.country.includes('Emirates') ? 'Emirates (EK 784)' : res.country.includes('Egypt') ? 'EgyptAir (MS 876)' : 'Air Peace (P4 7578)');
      setFlightNumber(res.country.includes('Kingdom') ? 'BA 083' : res.country.includes('Emirates') ? 'EK 784' : 'MS 876');
      setFlightDepAirport('Nnamdi Azikiwe Intl Airport, Abuja (ABV)');
      setFlightArrAirport(`${res.country} International Airport`);
      setFlightDepTime('08:30 AM');
      setFlightArrTime('04:15 PM Local');
      setFlightPnr(`SAB${Math.floor(100 + Math.random() * 900)}`);
      setFlightCabin('Economy');
    }

    if (res.hotelBooking) {
      setHotelName(res.hotelBooking.hotelName);
      setHotelRoom(res.hotelBooking.roomType);
      setHotelCheckIn(res.hotelBooking.checkIn);
      setHotelCheckOut(res.hotelBooking.checkOut);
      setHotelAddress(res.hotelBooking.address);
      setHotelVoucherCode(res.hotelBooking.confirmationNumber);
    } else {
      setHotelName(`Grand Safari Luxury Hotel & Suites (${res.country})`);
      setHotelRoom('Executive Deluxe Suite with Breakfast');
      setHotelCheckIn(res.departureDate);
      setHotelCheckOut(res.returnDate || res.departureDate);
      setHotelAddress(`Central Diplomatic District, ${res.country}`);
      setHotelVoucherCode(`HTL-${Math.floor(10000 + Math.random() * 90000)}`);
    }

    setProcessingSubTab('visa');
  };

  // Admin Action: Save Visa Status
  const handleSaveVisaMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processingReservation) return;

    if (visaStatus === 'approved') {
      storageService.updateVisaGrant(
        processingReservation.id,
        visaGrantNumber.trim(),
        visaIssuedDate,
        'approved',
        officerNote
      );
    } else {
      storageService.updateReservationStatus(
        processingReservation.id,
        visaStatus,
        officerNote
      );
    }

    onRefreshData();
    setProcessingReservation(null);
  };

  // Admin Action: Issue Flight
  const handleSaveFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processingReservation) return;

    const flightDetails: FlightBookingDetails = {
      airline: flightAirline.trim(),
      flightNumber: flightNumber.trim(),
      departureAirport: flightDepAirport.trim(),
      arrivalAirport: flightArrAirport.trim(),
      departureTime: flightDepTime.trim(),
      arrivalTime: flightArrTime.trim(),
      pnr: flightPnr.trim().toUpperCase(),
      cabinClass: flightCabin,
      issuedAt: new Date().toISOString()
    };

    storageService.issueFlightBooking(processingReservation.id, flightDetails, true);
    onRefreshData();
    setProcessingReservation(null);
  };

  // Admin Action: Issue Hotel
  const handleSaveHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processingReservation) return;

    const hotelDetails: HotelBookingDetails = {
      hotelName: hotelName.trim(),
      roomType: hotelRoom.trim(),
      checkIn: hotelCheckIn,
      checkOut: hotelCheckOut,
      address: hotelAddress.trim(),
      confirmationNumber: hotelVoucherCode.trim().toUpperCase(),
      issuedAt: new Date().toISOString()
    };

    storageService.issueHotelBooking(processingReservation.id, hotelDetails, true);
    onRefreshData();
    setProcessingReservation(null);
  };

  // Admin Action: Create New Package
  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgTitle || !pkgCountry || !pkgPriceNgn) return;

    const newPkg: TravelPackage = {
      id: `pkg-${Date.now()}`,
      code: `PKG-${pkgCountry.slice(0, 3).toUpperCase()}-${packages.length + 1}`,
      numberTag: packages.length + 1,
      title: pkgTitle.trim(),
      country: pkgCountry.trim(),
      city: pkgCity.trim() || pkgCountry.trim(),
      category: pkgCategory,
      priceNgn: Number(pkgPriceNgn),
      rating: 4.9,
      reviewsCount: 12,
      processingTime: pkgProcessingTime,
      validity: pkgValidity,
      description: pkgDescription || `Official consular processing and verified travel arrangements for ${pkgTitle}.`,
      requirements: ['Valid International Passport (6 months validity)', 'White background photographs', 'Bank statement with reference letter'],
      inclusions: ['Embassy Consular Processing Fee', 'Document Audit & Translation Review', 'Biometric Slot Appointment'],
      available: true,
      badge: 'Official Published Tariff'
    };

    storageService.savePackage(newPkg);
    setIsCreatingPackage(false);
    setPkgTitle('');
    setPkgCountry('');
    onRefreshData();
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Delete this travel package from the catalog?')) {
      storageService.deletePackage(id);
      onRefreshData();
    }
  };

  // Filter Submissions
  const filteredReservations = reservations.filter(res => {
    const matchesCountry = 
      selectedCountryFilter === 'all' || 
      res.country.toLowerCase().includes(selectedCountryFilter.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || 
      res.status === statusFilter;

    const matchesSearch = 
      !searchQuery ||
      res.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.passportNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCountry && matchesStatus && matchesSearch;
  });

  const totalRevenueNgn = reservations.reduce((acc, r) => acc + (r.totalAmountNgn || 0), 0);
  const pendingCount = reservations.filter(r => r.status === 'pending' || r.status === 'document_verification').length;
  const approvedCount = reservations.filter(r => r.status === 'approved' || r.status === 'completed').length;
  const issuedFlightsCount = reservations.filter(r => !!r.flightBooking).length;
  const issuedHotelsCount = reservations.filter(r => !!r.hotelBooking).length;

  return (
    <div className="bg-[#f4f7fc] min-h-screen text-slate-800 flex flex-col md:flex-row">
      
      {/* ======================================================== */}
      {/* COLLAPSIBLE ENTERPRISE SIDEBAR (Professional Left Rail) */}
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
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Shield className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-none">Safari Admin</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">Consular Command</div>
                </div>
              </div>
            )}
            {isSidebarCollapsed && (
              <div className="w-8 h-8 mx-auto rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Shield className="w-4 h-4 text-amber-300" />
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

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            
            {/* Submissions */}
            <button
              onClick={() => setActiveMainTab('submissions')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'submissions'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Dossier Submissions"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Dossiers</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeMainTab === 'submissions' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {reservations.length}
                </span>
              )}
            </button>

            {/* Payments */}
            <button
              onClick={() => setActiveMainTab('payments')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'payments'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Financial Ledger & Receipts"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Payments (₦)</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeMainTab === 'payments' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  ₦
                </span>
              )}
            </button>

            {/* Tariff Catalog */}
            <button
              onClick={() => setActiveMainTab('packages')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'packages'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Tariff Catalog"
            >
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Tariff Catalog</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeMainTab === 'packages' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {packages.length}
                </span>
              )}
            </button>

            {/* Email Notices */}
            <button
              onClick={() => setActiveMainTab('emails')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'emails'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Automated Dispatch Log"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Email Alerts</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeMainTab === 'emails' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {emails.length}
                </span>
              )}
            </button>

            {/* Inquiries */}
            <button
              onClick={() => setActiveMainTab('inquiries')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'inquiries'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              } ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
              title="Customer Inquiries"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span>Inquiries</span>}
              </div>
              {!isSidebarCollapsed && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeMainTab === 'inquiries' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {inquiries.length}
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
                onClick={() => setIsCreatingPackage(true)}
                className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Package</span>
              </button>
              <button
                onClick={() => {
                  storageService.resetAllData();
                  onRefreshData();
                }}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Records</span>
              </button>
            </div>
          )}

        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 text-slate-500 text-[11px]">
          {!isSidebarCollapsed ? (
            <div className="space-y-1">
              <div className="font-bold text-slate-700">Consular Liaison Hub</div>
              <div>Abuja · Cairo · London</div>
            </div>
          ) : (
            <div className="text-center font-bold text-blue-600">SAB</div>
          )}
        </div>

      </aside>

      {/* ======================================================== */}
      {/* MAIN ADMIN DASHBOARD CONTENT CANVAS */}
      {/* ======================================================== */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 space-y-6 overflow-y-auto max-w-7xl">
        
        {/* Mobile Sidebar Toggle Strip */}
        <div className="md:hidden flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-800">Admin Section:</span>
            <span className="text-xs font-bold text-blue-600 uppercase">{activeMainTab}</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md"
          >
            {mobileSidebarOpen ? 'Close Menu' : 'Switch Tab'}
          </button>
        </div>

        {/* Mobile Sidebar Dropdown */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-white rounded-xl border border-slate-200 p-3 space-y-2 text-xs">
            <button
              onClick={() => { setActiveMainTab('submissions'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeMainTab === 'submissions' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Dossier Submissions ({reservations.length})
            </button>
            <button
              onClick={() => { setActiveMainTab('payments'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeMainTab === 'payments' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Payments & Receipts (₦)
            </button>
            <button
              onClick={() => { setActiveMainTab('packages'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeMainTab === 'packages' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Tariff Catalog ({packages.length})
            </button>
            <button
              onClick={() => { setActiveMainTab('emails'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeMainTab === 'emails' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Email Alerts ({emails.length})
            </button>
            <button
              onClick={() => { setActiveMainTab('inquiries'); setMobileSidebarOpen(false); }}
              className={`w-full text-left p-2 rounded-lg font-bold ${activeMainTab === 'inquiries' ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'}`}
            >
              Inquiries ({inquiries.length})
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
              Safari Al-Barakah Consular Admin Desk — Abuja & Cairo,
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Tariff Volume</span>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tabular-nums">
                ₦{totalRevenueNgn.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Dossiers</span>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tabular-nums">
                {reservations.length}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Approved Visas</span>
              <span className="font-extrabold text-emerald-600 text-sm sm:text-base tabular-nums">
                {approvedCount}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Issued Flights</span>
              <span className="font-extrabold text-blue-600 text-sm sm:text-base tabular-nums">
                {issuedFlightsCount}
              </span>
            </div>

            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Audit Dossier</span>
            </button>
          </div>
        </div>

        {/* 2. FOUR PRIMARY KPI METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Visa Dossiers Lodged</span>
              <FileCheck className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
                {reservations.length}
              </div>
              <div className="text-[11px] font-bold text-amber-500 mt-1">
                +12.4% <span className="text-slate-400 font-normal">(30 days)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Registered Passengers</span>
              <Users className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
                {reservations.length * 4 + 8}
              </div>
              <div className="text-[11px] font-bold text-emerald-500 mt-1">
                +8.2% <span className="text-slate-400 font-normal">(30 days)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Confirmed Flight PNRs</span>
              <Plane className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
                {issuedFlightsCount}
              </div>
              <div className="text-[11px] font-bold text-emerald-500 mt-1">
                100% <span className="text-slate-400 font-normal">Active Tickets</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-xs font-semibold text-slate-500">Hotel Vouchers Active</span>
              <Hotel className="w-5 h-5 text-slate-400 stroke-1" />
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
                {issuedHotelsCount}
              </div>
              <div className="text-[11px] font-bold text-emerald-500 mt-1">
                +22.0% <span className="text-slate-400 font-normal">(30 days)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DETAILED CONSULAR REPORTS & EMBASSY PROGRESS BREAKDOWN */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Embassy Lodgement & Consular Breakdown</h2>
              <p className="text-xs text-slate-500">Real-time diplomatic filings and visa issuance volumes.</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">
                ₦{totalRevenueNgn.toLocaleString()}
              </div>
              <div className="text-base font-bold text-slate-800">
                Global Travel & Visa Portfolio
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                Total published consular filings processed through Abuja and Cairo diplomatic liaison desks with confirmed flight tickets and 5-star lodging.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="w-32 text-slate-600 font-medium truncate">United Kingdom (UKVI)</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="font-bold text-slate-800 tabular-nums w-12 text-right">₦818k</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="w-32 text-slate-600 font-medium truncate">Dubai / UAE Consular</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="font-bold text-slate-800 tabular-nums w-12 text-right">₦450k</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="w-32 text-slate-600 font-medium truncate">France / Schengen</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="font-bold text-slate-800 tabular-nums w-12 text-right">₦920k</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="w-32 text-slate-600 font-medium truncate">Egypt & Saudi Umrah</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="font-bold text-slate-800 tabular-nums w-12 text-right">₦680k</span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="11" fill="none" />
                  <circle cx="50" cy="50" r="38" stroke="#22c55e" strokeWidth="11" fill="none" strokeDasharray="238.7" strokeDashoffset="40" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="38" stroke="#f59e0b" strokeWidth="11" fill="none" strokeDasharray="238.7" strokeDashoffset="180" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="11" fill="none" strokeDasharray="238.7" strokeDashoffset="210" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">96%</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-2">Embassy Approval Rate</span>
            </div>
          </div>
        </div>

        {/* 4. FOUR COLOR PILLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#00c986] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-emerald-100 block">Approved Visas</span>
              <div className="text-xl font-black tabular-nums">
                {approvedCount} <span className="text-[10px] font-normal text-emerald-100">Granted Dossiers</span>
              </div>
            </div>
          </div>

          <div className="bg-[#248aff] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-blue-100 block">Verified Payments</span>
              <div className="text-xl font-black tabular-nums">
                ₦{totalRevenueNgn.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="bg-[#ff4069] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-rose-100 block">Issued Flight PNRs</span>
              <div className="text-xl font-black tabular-nums">
                {issuedFlightsCount} <span className="text-[10px] font-normal text-rose-100">Confirmed Tickets</span>
              </div>
            </div>
          </div>

          <div className="bg-[#ff9f00] text-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-amber-100 block">Hotel Vouchers</span>
              <div className="text-xl font-black tabular-nums">
                {issuedHotelsCount} <span className="text-[10px] font-normal text-amber-100">Active Bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. MAIN WORKBENCH */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
          
          {/* TAB 1: SUBMISSIONS BY COUNTRY */}
          {activeMainTab === 'submissions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {countryFilters.map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedCountryFilter(filter.value)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                        selectedCountryFilter === filter.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search applicant or ref..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Destination & Dossier</th>
                      <th className="py-3 px-4">Passport #</th>
                      <th className="py-3 px-4">Published Tariff</th>
                      <th className="py-3 px-4">Consular Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredReservations.map((res) => {
                      const initials = res.clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                      return (
                        <tr key={res.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                                {initials}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{res.clientName}</div>
                                <div className="text-[11px] text-slate-500">{res.clientEmail}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{res.country}</div>
                            <div className="text-[11px] text-blue-600 font-mono font-bold">{res.referenceCode}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-mono text-slate-700">{res.passportNumber || 'N/A'}</div>
                            <div className="text-[10px] text-slate-400">Exp: {res.passportExpiry || '2030'}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 tabular-nums">
                              ₦{(res.totalAmountNgn || 818000).toLocaleString()}
                            </div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              res.paymentReceiptVerified
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {res.paymentReceiptVerified ? 'Receipt Verified' : 'Payment Recorded'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              res.status === 'approved' || res.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : res.status === 'embassy_processing'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {res.status.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleOpenProcessing(res)}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                            >
                              Process Dossier
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PAYMENTS */}
          {activeMainTab === 'payments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Financial Transaction Ledger</h3>
                  <p className="text-xs text-slate-500">Audit simulated bank transfers and debit card payments.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Verified Volume</span>
                  <span className="text-lg font-black text-blue-600 tabular-nums">
                    ₦{totalRevenueNgn.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3 px-4">Payment Ref #</th>
                      <th className="py-3 px-4">Payer / Dossier</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Verification Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                          {res.paymentReference || `PAY-SAB-${res.referenceCode.replace('SAB-', '')}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{res.clientName}</div>
                          <div className="text-[11px] text-slate-500">{res.packageName} ({res.country})</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                            {res.paymentMethod === 'bank_transfer' ? 'Zenith Bank Transfer' : 'Debit Card'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-black text-slate-900 tabular-nums">
                          ₦{(res.totalAmountNgn || 818000).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          {res.paymentReceiptVerified ? (
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verified Receipt</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Pending Verification</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              storageService.verifyPaymentReceipt(res.id, !res.paymentReceiptVerified);
                              onRefreshData();
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              res.paymentReceiptVerified
                                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                            }`}
                          >
                            {res.paymentReceiptVerified ? 'Mark Pending' : 'Verify Receipt'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES */}
          {activeMainTab === 'packages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Travel & Visa Tariffs</h3>
                  <p className="text-xs text-slate-500">Manage published destination packages and consular rates.</p>
                </div>
                <button
                  onClick={() => setIsCreatingPackage(true)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Package</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          {pkg.country}
                        </span>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-slate-900 mt-2 text-sm">{pkg.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{pkg.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <div className="text-base font-black text-blue-600 tabular-nums">
                        ₦{pkg.priceNgn.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{pkg.processingTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EMAILS */}
          {activeMainTab === 'emails' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Automated Consular Dispatch Log</h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {emails.map((em) => (
                  <div key={em.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-xs">{em.subject}</div>
                      <div className="text-[11px] text-slate-500">
                        Recipient: <strong className="text-slate-700">{em.recipientEmail}</strong> · Ref: <span className="font-mono text-blue-600">{em.bookingRef}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenEmailPreview(em)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      View Notice
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INQUIRIES */}
          {activeMainTab === 'inquiries' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Direct Customer Travel Inquiries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900">{inq.name}</div>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">{inq.destination}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      <div>Email: <strong>{inq.email}</strong></div>
                      <div>Phone: <strong>{inq.phone}</strong></div>
                    </div>
                    <p className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                      "{inq.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ======================================================== */}
      {/* PROCESSING DRAWER MODAL (Visa, Flight, Hotel Issuance) */}
      {/* ======================================================== */}
      {processingReservation && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Process Dossier: {processingReservation.clientName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Ref: {processingReservation.referenceCode} · {processingReservation.country}
                </p>
              </div>
              <button
                onClick={() => setProcessingReservation(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold">
              <button
                onClick={() => setProcessingSubTab('visa')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  processingSubTab === 'visa' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Visa Milestone
              </button>
              <button
                onClick={() => setProcessingSubTab('flight')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  processingSubTab === 'flight' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Issue Flight E-Ticket
              </button>
              <button
                onClick={() => setProcessingSubTab('hotel')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  processingSubTab === 'hotel' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Issue Hotel Voucher
              </button>
            </div>

            {/* TAB: VISA MILESTONE */}
            {processingSubTab === 'visa' && (
              <form onSubmit={handleSaveVisaMilestone} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Consular Application Status</label>
                  <select
                    value={visaStatus}
                    onChange={(e) => setVisaStatus(e.target.value as ReservationStatus)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-semibold"
                  >
                    <option value="pending">Pending Document Lodgement</option>
                    <option value="document_verification">Document Audit & Verification Passed</option>
                    <option value="embassy_processing">Embassy Lodgement & Biometrics Scheduled</option>
                    <option value="approved">Visa Approved & Granted</option>
                    <option value="completed">Completed (Tickets & Lodging Dispatched)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Visa Grant / Sticker #</label>
                    <input
                      type="text"
                      value={visaGrantNumber}
                      onChange={(e) => setVisaGrantNumber(e.target.value)}
                      placeholder="e.g. SAB-UK-2026-991"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Grant Issued Date</label>
                    <input
                      type="date"
                      value={visaIssuedDate}
                      onChange={(e) => setVisaIssuedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Consular Officer Memo</label>
                  <textarea
                    rows={2}
                    value={officerNote}
                    onChange={(e) => setOfficerNote(e.target.value)}
                    placeholder="Notes for client dossier..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setProcessingReservation(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    Save Consular Status
                  </button>
                </div>
              </form>
            )}

            {/* TAB: FLIGHT ISSUANCE */}
            {processingSubTab === 'flight' && (
              <form onSubmit={handleSaveFlight} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Airline Carrier</label>
                    <input
                      type="text"
                      value={flightAirline}
                      onChange={(e) => setFlightAirline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Flight Number</label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Departure Airport</label>
                    <input
                      type="text"
                      value={flightDepAirport}
                      onChange={(e) => setFlightDepAirport(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Arrival Airport</label>
                    <input
                      type="text"
                      value={flightArrAirport}
                      onChange={(e) => setFlightArrAirport(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Airline PNR Reference</label>
                    <input
                      type="text"
                      value={flightPnr}
                      onChange={(e) => setFlightPnr(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono font-bold uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Cabin Class</label>
                    <select
                      value={flightCabin}
                      onChange={(e) => setFlightCabin(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-semibold"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setProcessingReservation(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    Issue Flight E-Ticket
                  </button>
                </div>
              </form>
            )}

            {/* TAB: HOTEL ISSUANCE */}
            {processingSubTab === 'hotel' && (
              <form onSubmit={handleSaveHotel} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hotel Property Name</label>
                  <input
                    type="text"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Room Category</label>
                    <input
                      type="text"
                      value={hotelRoom}
                      onChange={(e) => setHotelRoom(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Confirmation Voucher Code</label>
                    <input
                      type="text"
                      value={hotelVoucherCode}
                      onChange={(e) => setHotelVoucherCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hotel Address</label>
                  <input
                    type="text"
                    value={hotelAddress}
                    onChange={(e) => setHotelAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setProcessingReservation(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                  >
                    Issue Hotel Voucher
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Package Creation Modal */}
      {isCreatingPackage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-base">Add New Consular Package</h3>
              <button onClick={() => setIsCreatingPackage(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePackage} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Canada Tourist & Business Visa"
                  value={pkgTitle}
                  onChange={(e) => setPkgTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    placeholder="Canada"
                    value={pkgCountry}
                    onChange={(e) => setPkgCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tariff (₦ NGN)</label>
                  <input
                    type="number"
                    required
                    value={pkgPriceNgn}
                    onChange={(e) => setPkgPriceNgn(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Turnaround Time</label>
                  <input
                    type="text"
                    value={pkgProcessingTime}
                    onChange={(e) => setPkgProcessingTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Validity</label>
                  <input
                    type="text"
                    value={pkgValidity}
                    onChange={(e) => setPkgValidity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPackage(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer shadow-xs"
                >
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
