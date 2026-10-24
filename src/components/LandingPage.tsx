import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowRight, Phone, Mail, CheckCircle2, 
  FileCheck, Plane, Hotel, Sparkles, Send, Check, ChevronRight
} from 'lucide-react';
import { TravelPackage, UserAccount } from '../types';
import { HeroApplicationBanner } from './HeroApplicationBanner';
import { PackageCard } from './PackageCard';
import { storageService } from '../services/storageService';

interface LandingPageProps {
  packages: TravelPackage[];
  currentUser: UserAccount | null;
  onBookPackage: (pkg: TravelPackage) => void;
  onViewPackageDetails: (pkg: TravelPackage) => void;
  onOpenBookingModal: (destinationPreset?: string) => void;
  onOpenFindBooking: () => void;
  onOpenAuth: () => void;
  onNavigateToPackages: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  packages,
  currentUser,
  onBookPackage,
  onViewPackageDetails,
  onOpenBookingModal,
  onOpenFindBooking,
  onOpenAuth,
  onNavigateToPackages
}) => {
  // Inquiry form state
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('+234 ');
  const [cDest, setCDest] = useState('United Kingdom');
  const [cMessage, setCMessage] = useState('');
  const [cSuccess, setCSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName || !cEmail || !cMessage) return;

    storageService.addInquiry({
      name: cName.trim(),
      email: cEmail.trim(),
      phone: cPhone.trim(),
      destination: cDest,
      message: cMessage.trim()
    });

    setCSuccess(true);
    setTimeout(() => {
      setCName('');
      setCEmail('');
      setCPhone('+234 ');
      setCMessage('');
      setCSuccess(false);
    }, 4000);
  };

  // Exactly 3 featured packages for the main landing page
  const featuredThree = packages.slice(0, 3);

  return (
    <div className="space-y-12 pb-16 text-slate-800">
      
      {/* 1. Official Passport Application Banner */}
      <HeroApplicationBanner
        packages={packages}
        onOpenBookingWithPackage={(pkg) => onBookPackage(pkg)}
        onOpenFindBooking={onOpenFindBooking}
      />

      {/* 2. Featured Packages Showcase - Exactly 3 Cards */}
      <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Guaranteed Published Embassy Tariffs
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Featured Travel & Visa Packages
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top requested destination dossiers prepared by Safari Al-Barakah diplomatic liaison team.
            </p>
          </div>

          <button
            onClick={onNavigateToPackages}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-all border border-blue-200 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Explore All {packages.length} Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredThree.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onBook={onBookPackage}
              onViewDetails={onViewPackageDetails}
            />
          ))}
        </div>

        {/* View All Callout Card */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-black tracking-tight">
              Looking for Schengen, Egypt, USA, Turkey, or Umrah?
            </h3>
            <p className="text-xs text-blue-100 max-w-xl">
              We offer full consular processing and backend ticket/hotel reservation for 12+ international destinations.
            </p>
          </div>
          <button
            onClick={onNavigateToPackages}
            className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>View All {packages.length} Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3. Agency Operational Pillars (Decluttered & Clean) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Agency Backend Operations
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              How Safari Admins Process Your Application
            </h3>
            <p className="text-xs text-slate-500">
              Clients register and lodge their passport data. Our travel desk handles the entire consular filing, airline reservation, and hotel lodging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                1. Passport Audit & Filing
              </h4>
              <p className="text-slate-600 leading-relaxed">
                We review passport biodata validity, prepare required consular documents, and schedule official appointments at TLScontact or VFS Global.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                2. Backend Flight E-Tickets
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Admins issue confirmed round-trip airline tickets with verified PNR references directly into your passenger portal dossier.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Hotel className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                3. Luxury Lodging Vouchers
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Confirmed reservations with partner hotels in London, Paris, Dubai, Cairo, and Makkah for official visa submission and travel.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Direct Inquiries Section (Clean & Responsive) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Direct Consular Consultation
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Need Help Selecting the Right Destination?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our licensed immigration officers in Kano, Abuja, and Cairo provide swift guidance on bilateral visa requirements and corporate group rates.
              </p>

              <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Nigeria Direct: <strong>+234 8039521527</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Egypt Direct: <strong>+20 1558064537</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Official Email: <strong>Safarialbarakah@gmail.com</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleContactSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="font-bold text-slate-900 text-xs">Send Instant Inquiry</div>
              
              {cSuccess && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Your inquiry has been received! Our officer will call you.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={cEmail}
                  onChange={(e) => setCEmail(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Phone Number (+234...)"
                  value={cPhone}
                  onChange={(e) => setCPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-blue-600 focus:outline-none"
                />
                <select
                  value={cDest}
                  onChange={(e) => setCDest(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France / Schengen">France / Schengen</option>
                  <option value="United Arab Emirates">Dubai / UAE</option>
                  <option value="Egypt">Egypt</option>
                  <option value="China">China</option>
                  <option value="Saudi Arabia">Umrah / Saudi Arabia</option>
                  <option value="United States">United States</option>
                </select>
              </div>

              <textarea
                rows={2}
                required
                placeholder="Brief message or questions..."
                value={cMessage}
                onChange={(e) => setCMessage(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:border-blue-600 focus:outline-none resize-none"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
};
