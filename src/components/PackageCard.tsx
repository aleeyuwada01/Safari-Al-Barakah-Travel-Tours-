import React from 'react';
import { Star, Clock, Check, ArrowRight, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { TravelPackage } from '../types';

interface PackageCardProps {
  pkg: TravelPackage;
  onBook: (pkg: TravelPackage) => void;
  onViewDetails: (pkg: TravelPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onBook,
  onViewDetails
}) => {
  const displayPrice = `₦${pkg.priceNgn.toLocaleString()}`;

  // Trip.com clean theme gradient backgrounds based on region
  const getBannerGradient = (country: string) => {
    if (country.includes('United Kingdom')) return 'from-blue-700 via-indigo-800 to-slate-900';
    if (country.includes('Emirates')) return 'from-amber-600 via-orange-700 to-slate-900';
    if (country.includes('Egypt')) return 'from-yellow-600 via-amber-700 to-slate-900';
    if (country.includes('France') || country.includes('Schengen')) return 'from-blue-600 via-sky-700 to-indigo-900';
    if (country.includes('Saudi')) return 'from-emerald-700 via-teal-800 to-slate-900';
    if (country.includes('China')) return 'from-red-600 via-rose-700 to-slate-900';
    if (country.includes('United States')) return 'from-slate-800 via-blue-900 to-slate-950';
    return 'from-blue-800 via-slate-800 to-slate-900';
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      
      {/* Top Banner with Destination & Category */}
      <div>
        <div className={`h-28 bg-gradient-to-br ${getBannerGradient(pkg.country)} p-4 flex flex-col justify-between text-white relative overflow-hidden`}>
          {/* Subtle background glow circle */}
          <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between z-10">
            <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-black/40 backdrop-blur-xs text-white uppercase tracking-wider">
              {pkg.category}
            </span>
            {pkg.badge ? (
              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-400 text-slate-950 shadow-xs flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" />
                <span>{pkg.badge}</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-white/20 text-white backdrop-blur-xs">
                Official Embassy Rate
              </span>
            )}
          </div>

          <div className="z-10">
            <div className="flex items-center gap-1 text-[11px] text-white/80">
              <MapPin className="w-3 h-3 text-amber-300 shrink-0" />
              <span className="font-medium truncate">{pkg.city ? `${pkg.city}, ${pkg.country}` : pkg.country}</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight truncate mt-0.5">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Card Body - Crisp & Decluttered */}
        <div className="p-4 sm:p-5 space-y-3">
          
          {/* Trip.com Score & Turnaround */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 bg-blue-600 text-white font-black text-[11px] rounded">
                {pkg.rating}
              </span>
              <span className="text-xs font-bold text-slate-900">
                {pkg.rating >= 4.9 ? 'Outstanding' : 'Exceptional'}
              </span>
              <span className="text-[11px] text-slate-400">({pkg.reviewsCount})</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 text-[11px] font-medium bg-slate-100 px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-blue-600 shrink-0" />
              <span>{pkg.processingTime}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {pkg.description}
          </p>

          {/* Quick Highlight Inclusions (Only 2 concise points) */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            {pkg.inclusions.slice(0, 2).map((inc, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Tariff & Action Buttons strictly in Naira */}
      <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Official Rate
            </span>
            <div className="text-xl font-black text-blue-600 tabular-nums">
              {displayPrice}
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            ₦ NGN Guaranteed
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(pkg)}
            className="w-full py-2 px-3 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors text-center cursor-pointer"
          >
            Requirements
          </button>
          <button
            onClick={() => onBook(pkg)}
            className="w-full py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Apply</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
