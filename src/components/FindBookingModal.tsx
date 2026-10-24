import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Calendar, Plane, ArrowRight, AlertCircle, FileText } from 'lucide-react';
import { BookingReservation } from '../types';

interface FindBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: BookingReservation[];
  onSelectReservation: (res: BookingReservation) => void;
}

export const FindBookingModal: React.FC<FindBookingModalProps> = ({
  isOpen,
  onClose,
  reservations,
  onSelectReservation
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [match, setMatch] = useState<BookingReservation | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = searchTerm.trim().toLowerCase();
    const found = reservations.find(r => 
      r.referenceCode.toLowerCase() === cleaned || 
      r.clientEmail.toLowerCase() === cleaned ||
      r.clientName.toLowerCase().includes(cleaned)
    );
    setMatch(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Find Your Booking
            </h3>
            <p className="text-xs text-slate-500">
              Search by Booking Reference (e.g. SAB-2026-8941) or Email
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Enter SAB-2026-XXXX or email address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Quick Demo Reference Suggestions */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Quick try:</span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('SAB-2026-8941');
                const found = reservations.find(r => r.referenceCode === 'SAB-2026-8941');
                setMatch(found || null);
                setSearched(true);
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-blue-50 text-blue-600 font-mono rounded"
            >
              SAB-2026-8941
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('SAB-2026-9042');
                const found = reservations.find(r => r.referenceCode === 'SAB-2026-9042');
                setMatch(found || null);
                setSearched(true);
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-blue-50 text-blue-600 font-mono rounded"
            >
              SAB-2026-9042
            </button>
          </div>

          {searched && (
            <div>
              {match ? (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-blue-600">{match.referenceCode}</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">{match.packageName}</h4>
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-semibold uppercase rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {match.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-slate-400">Passenger:</span>
                      <div className="font-semibold text-slate-800">{match.clientName}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Departure:</span>
                      <div className="font-semibold text-slate-800">{match.departureDate}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Tariff Paid:</span>
                      <div className="font-semibold text-blue-700 tabular-nums">₦{match.totalAmountNgn.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Email:</span>
                      <div className="text-slate-700 truncate">{match.clientEmail}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectReservation(match);
                      onClose();
                    }}
                    className="w-full mt-2 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Open in Passenger Itinerary Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No booking found matching "{searchTerm}". Please check your reference code or email address.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
