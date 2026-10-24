import React, { useState } from 'react';
import { Sparkles, Check, Tag, Gift } from 'lucide-react';
import { UserAccount } from '../types';

interface DealsVouchersProps {
  currentUser: UserAccount | null;
  onOpenAuth: () => void;
  onClaimCoupon: (discountName: string) => void;
}

export const DealsVouchers: React.FC<DealsVouchersProps> = ({
  currentUser,
  onOpenAuth,
  onClaimCoupon
}) => {
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const handleClaim = (key: string, name: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setClaimed(prev => ({ ...prev, [key]: true }));
    onClaimCoupon(name);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          New user exclusive offers
        </h2>
        <span className="text-xs text-blue-600 font-medium hover:underline cursor-pointer">
          View all deals & promotions
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Ticket 1: Main Welcome Banner Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1 rounded-md bg-rose-500 text-white text-[10px] font-bold">
                PROMO
              </span>
              <span className="text-xs font-bold text-slate-900">
                Welcome Traveler Pack
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              New registered users unlock instant discounts across all visa filings & tour packages!
            </p>
          </div>
          <button
            onClick={() => currentUser ? handleClaim('welcome', '₦30,000 Welcome Voucher') : onOpenAuth()}
            className="mt-4 w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors text-center"
          >
            {currentUser ? (claimed['welcome'] ? 'Claimed ✓' : 'Claim Voucher Pack') : 'Sign in & claim all'}
          </button>
        </div>

        {/* Ticket 2: 10% Off Visa Processing */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 flex flex-col justify-between shadow-xs transition-colors relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-blue-600">10% off</div>
            <div className="text-xs font-bold text-slate-800">Visa Processing Assistance</div>
            <div className="text-[11px] text-slate-500">Valid on UK, Schengen, Dubai & China</div>
          </div>
          <button
            onClick={() => handleClaim('visa10', '10% Visa Discount')}
            className={`mt-4 w-full py-1.5 text-xs font-bold rounded-lg transition-colors border ${
              claimed['visa10']
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border-blue-200'
            }`}
          >
            {claimed['visa10'] ? 'Applied ✓' : 'Claim'}
          </button>
        </div>

        {/* Ticket 3: ₦50,000 Off Umrah Platinum */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 flex flex-col justify-between shadow-xs transition-colors relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-amber-600">₦50,000 off</div>
            <div className="text-xs font-bold text-slate-800">Umrah & Hajj Packages</div>
            <div className="text-[11px] text-slate-500">Clock Tower Makkah & Madinah</div>
          </div>
          <button
            onClick={() => handleClaim('umrah50', '₦50,000 Umrah Rebate')}
            className={`mt-4 w-full py-1.5 text-xs font-bold rounded-lg transition-colors border ${
              claimed['umrah50']
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border-blue-200'
            }`}
          >
            {claimed['umrah50'] ? 'Applied ✓' : 'Claim'}
          </button>
        </div>

        {/* Ticket 4: 10% Off Private Tours & Nile Cruise */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 flex flex-col justify-between shadow-xs transition-colors relative overflow-hidden">
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-blue-600">10% off</div>
            <div className="text-xs font-bold text-slate-800">Cairo & Nile Tours</div>
            <div className="text-[11px] text-slate-500">VIP Pyramids & River Cruise</div>
          </div>
          <button
            onClick={() => handleClaim('cairo10', '10% Tour Discount')}
            className={`mt-4 w-full py-1.5 text-xs font-bold rounded-lg transition-colors border ${
              claimed['cairo10']
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border-blue-200'
            }`}
          >
            {claimed['cairo10'] ? 'Applied ✓' : 'Claim'}
          </button>
        </div>

      </div>
    </section>
  );
};
