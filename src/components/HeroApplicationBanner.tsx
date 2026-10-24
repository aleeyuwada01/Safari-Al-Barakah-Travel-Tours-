import React, { useState } from 'react';
import { 
  ArrowRight, Search, Clock, Plane
} from 'lucide-react';
import { TravelPackage } from '../types';

interface HeroApplicationBannerProps {
  packages: TravelPackage[];
  onOpenBookingWithPackage: (pkg: TravelPackage) => void;
  onOpenFindBooking: () => void;
}

export const HeroApplicationBanner: React.FC<HeroApplicationBannerProps> = ({
  packages,
  onOpenBookingWithPackage,
  onOpenFindBooking
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('United Kingdom');

  // Popular quick destination tabs
  const destinationList = [
    'United Kingdom',
    'France / Schengen',
    'United Arab Emirates',
    'Egypt',
    'United States',
    'China',
    'Saudi Arabia',
    'Turkey'
  ];

  // Find active package
  const currentPkg = packages.find(p => p.country.toLowerCase().includes(selectedCountry.toLowerCase())) || packages[0];

  return (
    <div className="relative">
      {/* High-End Aeroplane Sky Backdrop matching Trip.com reference */}
      <div 
        className="relative bg-cover bg-center pt-12 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden rounded-b-3xl shadow-sm"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 45, 115, 0.82) 0%, rgba(20, 80, 190, 0.65) 50%, rgba(20, 80, 190, 0.25) 100%), url('/src/assets/images/airplane_sky_hero_bg_1792847232545.jpg')`
        }}
      >
        <div className="relative max-w-4xl mx-auto space-y-4 z-10 py-4">
          {/* Main Headline requested: Safari Al-Barakah Travel & Tours, Travel Made Easy */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            Safari Al-Barakah Travel & Tours, Travel Made Easy
          </h1>
        </div>
      </div>

      {/* Modern, Compact Lodgement Widget */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-14 sm:-mt-18 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-6 space-y-4">
          
          {/* Header Row: Title & Track Button */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Fast-Track Passport Lodgement
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Select your destination to preview official tariff and lodge passport data.
              </p>
            </div>
            
            <button
              type="button"
              onClick={onOpenFindBooking}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100/70 transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Application</span>
            </button>
          </div>

          {/* Quick Destination Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
            {destinationList.map((country) => (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  selectedCountry === country
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {country}
              </button>
            ))}
          </div>

          {/* Sleek Package Summary & Action Box */}
          {currentPkg && (
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Destination & Timing Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                    {currentPkg.country}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {currentPkg.processingTime}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {currentPkg.title}
                </h3>
                <div className="text-xs text-slate-500">
                  Validity: <span className="font-semibold text-slate-700">{currentPkg.validity}</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-600 block">Tariff</span>
                  <div className="text-xl sm:text-2xl font-black text-blue-600 tabular-nums">
                    ₦{currentPkg.priceNgn.toLocaleString()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBookingWithPackage(currentPkg)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Submit Passport Data</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
