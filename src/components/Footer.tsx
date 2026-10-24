import React from 'react';
import { Compass, Phone, Mail, ShieldCheck, Globe, Plane } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'packages' | 'client' | 'admin') => void;
  onOpenTripPlanner: () => void;
  onOpenFindBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTripPlanner,
  onOpenFindBooking
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      
      {/* Partner Airlines Strip (Trip.com style trust strip) */}
      <div className="border-b border-slate-100 bg-slate-50/70 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Partner Airlines & Consular Networks:
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-semibold text-slate-500">
              <span className="hover:text-blue-600 transition-colors">British Airways</span>
              <span>·</span>
              <span className="hover:text-blue-600 transition-colors">Emirates</span>
              <span>·</span>
              <span className="hover:text-blue-600 transition-colors">Qatar Airways</span>
              <span>·</span>
              <span className="hover:text-blue-600 transition-colors">EgyptAir</span>
              <span>·</span>
              <span className="hover:text-blue-600 transition-colors">Air France</span>
              <span>·</span>
              <span className="hover:text-blue-600 transition-colors">Turkish Airlines</span>
              <span>·</span>
              <span className="hover:text-blue-600 transition-colors">Saudia</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Wordmark */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-blue-600 tracking-tight">
                Safari<span className="text-slate-900">Al-Barakah</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              "Journeys that inspire, memories that last." Dedicated travel management, fast-track visa processing, custom executive itineraries, and spiritual Umrah journeys.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Certified Consular Dossiers</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('landing')}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Featured Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-blue-600 transition-colors cursor-pointer font-bold text-blue-600"
                >
                  All 14 Destinations & Tariffs
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFindBooking}
                  className="hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Find Bookings & Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('client')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Passenger Portal & Itineraries
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTripPlanner}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  <span>Trip.Planner Itinerary Builder</span>
                  <span className="px-1 text-[9px] font-bold bg-red-500 text-white rounded">NEW</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Agency Operations Command
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visa Destinations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Primary Destinations
            </h4>
            <div className="space-y-1 text-xs text-slate-600">
              <div>United Kingdom (London & Manchester)</div>
              <div>European Union (France, Schengen & Italy)</div>
              <div>United Arab Emirates (Dubai & Abu Dhabi)</div>
              <div>Egypt (Cairo & Nile Pharaohs Tour)</div>
              <div>Saudi Arabia (Umrah Makkah & Madinah)</div>
              <div>People's Republic of China</div>
            </div>
          </div>

          {/* Col 4: Hotlines & Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Official Consular Hotlines
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">🇳🇬 Nigeria:</span>
                <a href="tel:+2348039521527" className="text-blue-600 font-mono font-bold hover:underline">+234 8039521527</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">🇪🇬 Egypt:</span>
                <a href="tel:+201558064537" className="text-blue-600 font-mono font-bold hover:underline">+20 1558064537</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">✉️ Email:</span>
                <a href="mailto:Safarialbarakah@gmail.com" className="text-blue-600 font-bold hover:underline">Safarialbarakah@gmail.com</a>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                24/7 client dispatch and airport escort assistance.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Safari Al-Barakah Travel & Tours. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Statement</span>
            <span>·</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms & Conditions</span>
            <span>·</span>
            <span className="hover:text-slate-600 cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
