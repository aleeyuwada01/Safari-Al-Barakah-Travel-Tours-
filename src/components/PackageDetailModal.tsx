import React from 'react';
import { X, CheckCircle2, ShieldAlert, Clock, Calendar, FileText, ArrowRight, Star, MapPin } from 'lucide-react';
import { TravelPackage } from '../types';

interface PackageDetailModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onBook: (pkg: TravelPackage) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  pkg,
  onClose,
  onBook
}) => {
  if (!pkg) return null;

  const displayPrice = `₦${pkg.priceNgn.toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-slate-800">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded text-white">
                {pkg.category}
              </span>
              <span className="text-xs text-blue-100 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-300" />
                {pkg.city || pkg.country}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-wide mt-0.5">
              {pkg.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Processing Time</div>
                <div className="text-xs font-bold text-slate-800">{pkg.processingTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Visa Validity</div>
                <div className="text-xs font-bold text-slate-800">{pkg.validity}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Published Tariff</div>
                <div className="text-sm font-extrabold text-blue-700 tabular-nums">{displayPrice}</div>
              </div>
            </div>
          </div>

          {/* Review Score */}
          <div className="flex items-center gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs">
            <div className="px-2 py-1 bg-blue-600 text-white font-bold rounded">
              {pkg.rating}
            </div>
            <div>
              <span className="font-bold text-slate-900">Safari Al-Barakah Verified Rating</span>
              <span className="text-slate-500 ml-1">· Based on {pkg.reviewsCount} customer experiences</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Package Scope & Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Inclusions */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Safari Al-Barakah Service Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.inclusions.map((inc, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Mandatory Passenger Requirements
            </h4>
            <div className="space-y-1.5">
              {pkg.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agency Trust Guarantee */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-900 block">
                Official Consular Verification Policy
              </span>
              <p className="text-slate-600">
                All client passport files are submitted directly through official embassy channels (Abuja, Lagos, Cairo). Safari Al-Barakah admins issue confirmed airline itineraries and lodging vouchers from our backend.
              </p>
            </div>
          </div>

        </div>

        {/* Footer with Price and Book button */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Official Published Tariff</span>
            <div className="text-2xl font-black text-blue-700 tabular-nums">
              {displayPrice}
            </div>
          </div>
          <button
            onClick={() => onBook(pkg)}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Submit Passport Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
