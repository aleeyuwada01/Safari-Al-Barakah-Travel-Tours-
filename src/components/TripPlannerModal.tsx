import React, { useState } from 'react';
import { X, Sparkles, MapPin, Calendar, Compass, Clock, Check, ArrowRight, Plane } from 'lucide-react';
import { TravelPackage } from '../types';

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: TravelPackage[];
  onBookSuggestedPackage: (pkg: TravelPackage) => void;
}

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  onClose,
  packages,
  onBookSuggestedPackage
}) => {
  const [destination, setDestination] = useState('Dubai, UAE');
  const [daysCount, setDaysCount] = useState<number>(7);
  const [style, setStyle] = useState<'luxury' | 'family' | 'business' | 'spiritual'>('luxury');
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  const getMatchedPackage = () => {
    if (destination.includes('Dubai')) return packages.find(p => p.country.includes('Emirates')) || packages[1];
    if (destination.includes('UK') || destination.includes('London')) return packages.find(p => p.country.includes('United Kingdom')) || packages[10];
    if (destination.includes('Paris') || destination.includes('Schengen')) return packages.find(p => p.country.includes('Schengen')) || packages[5];
    if (destination.includes('Egypt') || destination.includes('Cairo')) return packages.find(p => p.id === 'pkg-13') || packages[2];
    if (destination.includes('Makkah') || destination.includes('Umrah')) return packages.find(p => p.id === 'pkg-14') || packages[13];
    return packages[0];
  };

  const matchedPkg = getMatchedPackage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">Trip.Planner</h3>
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
              </div>
              <p className="text-xs text-blue-100">
                AI & Expert Curated Journey Itinerary Builder
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {!generated ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Where would you like to travel?
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Dubai, UAE">Dubai & Abu Dhabi, UAE</option>
                    <option value="London, UK">London & Oxford, United Kingdom</option>
                    <option value="Paris & Rome, Europe">Paris, France & Rome (Schengen)</option>
                    <option value="Cairo & Nile, Egypt">Cairo, Giza & Nile River, Egypt</option>
                    <option value="Makkah & Madinah, Saudi Arabia">Makkah & Madinah (Umrah VIP)</option>
                    <option value="Istanbul & Cappadocia, Turkey">Istanbul & Cappadocia, Turkey</option>
                    <option value="Beijing & Shanghai, China">Beijing & Shanghai, China</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Journey Duration
                  </label>
                  <select
                    value={daysCount}
                    onChange={(e) => setDaysCount(Number(e.target.value))}
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                    <option value={5}>5 Days / 4 Nights (Express)</option>
                    <option value={7}>7 Days / 6 Nights (Standard Holiday)</option>
                    <option value={10}>10 Days / 9 Nights (Comprehensive)</option>
                    <option value={14}>14 Days / 13 Nights (Grand Tour)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Preferred Travel Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setStyle('luxury')}
                    className={`p-3 border rounded-xl text-center transition-all ${
                      style === 'luxury' ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 shadow-xs' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    👑 VIP Luxury
                  </button>
                  <button
                    type="button"
                    onClick={() => setStyle('family')}
                    className={`p-3 border rounded-xl text-center transition-all ${
                      style === 'family' ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 shadow-xs' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    👨‍👩‍👧 Family Leisure
                  </button>
                  <button
                    type="button"
                    onClick={() => setStyle('business')}
                    className={`p-3 border rounded-xl text-center transition-all ${
                      style === 'business' ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 shadow-xs' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    💼 Business & Trade
                  </button>
                  <button
                    type="button"
                    onClick={() => setStyle('spiritual')}
                    className={`p-3 border rounded-xl text-center transition-all ${
                      style === 'spiritual' ? 'border-blue-600 bg-blue-50 font-bold text-blue-700 shadow-xs' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🌙 Spiritual / Umrah
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Custom Trip Itinerary</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-blue-900">{daysCount}-Day {style.toUpperCase()} Plan: {destination}</h4>
                  <p className="text-xs text-blue-700 mt-0.5">Customized for Safari Al-Barakah passengers</p>
                </div>
                <button
                  onClick={() => setGenerated(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Edit Options
                </button>
              </div>

              {/* Sample Day by Day Schedule generated */}
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Day 1: VIP Arrival & Private Hotel Check-in</span>
                    <span className="text-[11px] text-blue-600 font-semibold">Chauffeur</span>
                  </div>
                  <p className="text-slate-600">Airport meet & greet, immigration fast-track, luxury transfer to 5-star suite accommodation, evening welcome dinner.</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Day 2: Iconic Landmarks & Guided Private Tour</span>
                    <span className="text-[11px] text-blue-600 font-semibold">Culture & Sightseeing</span>
                  </div>
                  <p className="text-slate-600">Certified English/Arabic speaking guide for historic architectural highlights, private priority entry passes, and scenic photo stops.</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Day 3: Halal Gastronomy & Premium Shopping</span>
                    <span className="text-[11px] text-blue-600 font-semibold">Leisure & Shopping</span>
                  </div>
                  <p className="text-slate-600">Private personal shopping experience, curated halal dining reservations, and evening skyline view.</p>
                </div>
              </div>

              {/* Matched Package Recommendation */}
              {matchedPkg && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Matching Visa & Tour Package</span>
                    <h5 className="text-sm font-bold text-emerald-950 mt-1">{matchedPkg.title}</h5>
                    <p className="text-xs text-emerald-700">₦{matchedPkg.priceNgn.toLocaleString()} · {matchedPkg.processingTime}</p>
                  </div>
                  <button
                    onClick={() => {
                      onBookSuggestedPackage(matchedPkg);
                      onClose();
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <span>Submit Passport Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
