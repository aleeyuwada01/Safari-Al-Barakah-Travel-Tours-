import React, { useState } from 'react';
import { Search, ShieldCheck, Filter, ArrowLeft, Globe, Zap, CheckCircle2 } from 'lucide-react';
import { TravelPackage } from '../types';
import { PackageCard } from './PackageCard';

interface PackagesPageProps {
  packages: TravelPackage[];
  onBookPackage: (pkg: TravelPackage) => void;
  onViewPackageDetails: (pkg: TravelPackage) => void;
  onBackToHome: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  packages,
  onBookPackage,
  onViewPackageDetails,
  onBackToHome
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const availableCountries = [
    'all',
    'United Kingdom',
    'France / Schengen',
    'United Arab Emirates',
    'Egypt',
    'China',
    'United States',
    'Turkey',
    'Qatar',
    'Morocco',
    'India',
    'Saudi Arabia'
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = 
      !searchQuery ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.city?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (countryFilter !== 'all' && !pkg.country.toLowerCase().includes(countryFilter.toLowerCase())) {
      return false;
    }

    if (activeCategory === 'all') return true;
    if (activeCategory === 'Visa') return pkg.category === 'Visa';
    if (activeCategory === 'Tour') return pkg.category === 'Tour';
    if (activeCategory === 'Umrah') return pkg.category === 'Umrah & Hajj';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-800">
      
      {/* Top Header Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            All International Visa & Travel Packages
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Published consular tariffs strictly in Nigerian Naira (₦). Complete dossier auditing and embassy liaison.
          </p>
        </div>

        {/* Search input in header */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search country or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Pills & Country Filter Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            Category:
          </span>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Packages ({packages.length})
          </button>
          <button
            onClick={() => setActiveCategory('Visa')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'Visa' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Consular Visas
          </button>
          <button
            onClick={() => setActiveCategory('Tour')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'Tour' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Curated Tours
          </button>
          <button
            onClick={() => setActiveCategory('Umrah')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'Umrah' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Umrah & Hajj
          </button>
        </div>

        {/* Country Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Country:
          </span>
          {availableCountries.map((c) => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                countryFilter === c
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c === 'all' ? 'All Destinations' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Packages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onBook={onBookPackage}
            onViewDetails={onViewPackageDetails}
          />
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No packages match your search or filter. Try selecting "All Destinations".
        </div>
      )}

    </div>
  );
};
