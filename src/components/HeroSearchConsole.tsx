import React, { useState } from 'react';
import { 
  Building2, Plane, Train, Car, Compass, Luggage, ArrowLeftRight, 
  Calendar, Users, Search, CheckCircle2, Award, Globe, ShieldCheck
} from 'lucide-react';
import { TravelPackage } from '../types';

interface HeroSearchConsoleProps {
  onSearch: (origin: string, destination: string, category: string) => void;
  onOpenBookingWithDestination: (destination: string) => void;
}

export const HeroSearchConsole: React.FC<HeroSearchConsoleProps> = ({
  onSearch,
  onOpenBookingWithDestination
}) => {
  const [activeTab, setActiveTab] = useState<'visas' | 'flights' | 'hotels' | 'tours' | 'umrah' | 'combo'>('visas');
  const [tripType, setTripType] = useState<'round' | 'oneway' | 'multi'>('round');
  const [isNonstop, setIsNonstop] = useState(false);
  
  const [leavingFrom, setLeavingFrom] = useState('Abuja (ABV)');
  const [goingTo, setGoingTo] = useState('United Kingdom (London)');
  const [departDate, setDepartDate] = useState('2026-11-15');
  const [returnDate, setReturnDate] = useState('2026-11-28');
  const [travelers, setTravelers] = useState('1 adult · Economy');

  const handleSwap = () => {
    const temp = leavingFrom;
    setLeavingFrom(goingTo);
    setGoingTo(temp);
  };

  const handleFormSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(leavingFrom, goingTo, activeTab);
    const targetElement = document.getElementById('catalog-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Sky Blue Banner Backdrop (Trip.com exact look) */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 pt-10 sm:pt-14 pb-28 sm:pb-36 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden rounded-b-3xl">
        
        {/* Subtle decorative cloud and airplane accents */}
        <div className="absolute right-6 top-8 opacity-15 pointer-events-none hidden lg:block">
          <Plane className="w-56 h-56 text-white rotate-12" />
        </div>

        <div className="relative max-w-4xl mx-auto space-y-3 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-xs">
            Your next journey awaits
          </h1>
          
          {/* Trust proof strip like Trip.com */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-blue-100 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Join 50,000+ travelers</span>
            </span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-sky-200" />
              <span>12+ Global Visa Processing Hubs</span>
            </span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Award-winning Consular Service</span>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Search Console Card (Trip.com exact signature card) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-7 text-slate-800">
          
          {/* Top Category Tabs with Blue Icons */}
          <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-8 overflow-x-auto pb-4 border-b border-slate-100 text-xs sm:text-sm font-semibold">
            
            <button
              type="button"
              onClick={() => setActiveTab('visas')}
              className={`flex flex-col items-center gap-1 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'visas'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-600'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>Visa Services (12 Hubs)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('flights')}
              className={`flex flex-col items-center gap-1 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'flights'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-600'
              }`}
            >
              <Plane className="w-5 h-5" />
              <span>Flights</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hotels')}
              className={`flex flex-col items-center gap-1 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'hotels'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-600'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Hotels & Homes</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('tours')}
              className={`flex flex-col items-center gap-1 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'tours'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-600'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Attractions & Tours</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('umrah')}
              className={`flex flex-col items-center gap-1 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'umrah'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-600'
              }`}
            >
              <Award className="w-5 h-5" />
              <span>Umrah & Pilgrimage</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('combo')}
              className={`flex flex-col items-center gap-1 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'combo'
                  ? 'border-blue-600 text-blue-600 font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-600'
              }`}
            >
              <Luggage className="w-5 h-5" />
              <span>Flight + Hotel</span>
            </button>

          </div>

          {/* Radio sub-options */}
          <div className="flex flex-wrap items-center gap-5 pt-4 text-xs font-medium text-slate-600">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="triptype"
                checked={tripType === 'round'}
                onChange={() => setTripType('round')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Round-trip</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="triptype"
                checked={tripType === 'oneway'}
                onChange={() => setTripType('oneway')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>One-way</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="triptype"
                checked={tripType === 'multi'}
                onChange={() => setTripType('multi')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Multi-city</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer ml-auto">
              <input
                type="checkbox"
                checked={isNonstop}
                onChange={(e) => setIsNonstop(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Nonstop only</span>
            </label>
          </div>

          {/* Search Inputs Row (Trip.com exact 4-segment grid) */}
          <form onSubmit={handleFormSearch} className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            
            {/* Leaving from ⇄ Going to */}
            <div className="lg:col-span-5 grid grid-cols-11 border border-slate-300 rounded-xl overflow-hidden focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-white shadow-xs">
              
              <div className="col-span-5 p-2.5">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Leaving from</span>
                <input
                  type="text"
                  value={leavingFrom}
                  onChange={(e) => setLeavingFrom(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 focus:outline-none truncate"
                  placeholder="City or airport"
                />
              </div>

              <div className="col-span-1 flex items-center justify-center border-x border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-200/60 rounded-full transition-colors"
                  title="Swap locations"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="col-span-5 p-2.5">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Going to</span>
                <select
                  value={goingTo}
                  onChange={(e) => setGoingTo(e.target.value)}
                  className="w-full text-xs font-bold text-slate-900 focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="United Kingdom (London)">United Kingdom (London)</option>
                  <option value="United Arab Emirates (Dubai)">United Arab Emirates (Dubai)</option>
                  <option value="France, Schengen & Italy">France, Schengen & Italy</option>
                  <option value="Egypt (Cairo & Nile)">Egypt (Cairo & Nile)</option>
                  <option value="Saudi Arabia (Makkah & Madinah)">Saudi Arabia (Umrah VIP)</option>
                  <option value="United States (USA)">United States (USA)</option>
                  <option value="People's Republic of China">China (Beijing/Guangzhou)</option>
                  <option value="Qatar (Doha)">Qatar (Doha)</option>
                  <option value="Turkey (Istanbul)">Turkey (Istanbul)</option>
                  <option value="Morocco (Marrakech)">Morocco (Marrakech)</option>
                  <option value="India">India</option>
                </select>
              </div>

            </div>

            {/* Dates range */}
            <div className="lg:col-span-4 border border-slate-300 rounded-xl p-2.5 bg-white shadow-xs focus-within:border-blue-600">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Travel Dates</span>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-28 text-xs font-semibold focus:outline-none"
                />
                <span className="text-slate-300">—</span>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-28 text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Travelers & Class */}
            <div className="lg:col-span-3 border border-slate-300 rounded-xl p-2.5 bg-white shadow-xs focus-within:border-blue-600">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Travelers & Cabin</span>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mt-0.5">
                <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full text-xs font-semibold focus:outline-none bg-transparent"
                >
                  <option value="1 adult · Economy">1 adult · Economy</option>
                  <option value="2 adults · Economy">2 adults · Economy</option>
                  <option value="Family (3-4) · Economy">Family (3-4) · Economy</option>
                  <option value="1 adult · Business Class">1 adult · Business VIP</option>
                  <option value="2 adults · Business Class">2 adults · Business VIP</option>
                </select>
              </div>
            </div>

            {/* Search Action Buttons */}
            <div className="lg:col-span-12 flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => onOpenBookingWithDestination(goingTo)}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shadow-xs"
              >
                Direct Visa Reservation
              </button>
              
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Packages</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
