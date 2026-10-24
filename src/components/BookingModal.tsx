import React, { useState, useEffect } from 'react';
import { 
  X, Check, ShieldCheck, Mail, ArrowRight, ArrowLeft, 
  Calendar, User, FileUp, Sparkles, AlertCircle, FileCheck,
  CreditCard, Building2, Lock, Receipt, CheckCircle2, Loader2
} from 'lucide-react';
import { BookingReservation, TravelPackage, UserAccount } from '../types';
import { storageService } from '../services/storageService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: TravelPackage | null;
  packages: TravelPackage[];
  currentUser: UserAccount | null;
  onBookingComplete: (newReservation: BookingReservation) => void;
  onNavigateToClientPortal: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  packages,
  currentUser,
  onBookingComplete,
  onNavigateToClientPortal
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [pkgId, setPkgId] = useState<string>('');
  
  // Passenger Form fields
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('+234 ');
  const [passportNumber, setPassportNumber] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [nationality, setNationality] = useState('Nigerian');
  const [travelersCount, setTravelersCount] = useState<number>(1);
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-12-05');
  const [specialNotes, setSpecialNotes] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Payment simulation state
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'debit_card'>('bank_transfer');
  const [selectedBank, setSelectedBank] = useState<'jaiz' | 'zenith'>('jaiz');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('5399 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('382');

  // Result state
  const [createdReservation, setCreatedReservation] = useState<BookingReservation | null>(null);

  useEffect(() => {
    if (currentUser) {
      setClientName(currentUser.name);
      setClientEmail(currentUser.email);
      setClientPhone(currentUser.phone || '+234 ');
      if (currentUser.passportNumber) setPassportNumber(currentUser.passportNumber);
      if (currentUser.nationality) setNationality(currentUser.nationality);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedPackage) {
      setPkgId(selectedPackage.id);
    } else if (packages.length > 0 && !pkgId) {
      setPkgId(packages[0].id);
    }
  }, [selectedPackage, packages, pkgId]);

  if (!isOpen) return null;

  const currentPkg = packages.find(p => p.id === pkgId) || packages[0];
  const totalAmountNgn = (currentPkg?.priceNgn || 0) * travelersCount;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !departureDate) {
      alert('Please fill in required passenger details.');
      return;
    }
    setStep(2);
  };

  const handleExecutePaymentAndSubmit = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const generatedRefCode = `PAY-SAB-${Math.floor(100000 + Math.random() * 900000)}`;

      const newRes = storageService.createReservation({
        packageId: currentPkg.id,
        packageName: currentPkg.title,
        packageCategory: currentPkg.category,
        country: currentPkg.country,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        passportNumber: passportNumber.trim() || 'A10982341',
        passportExpiry: passportExpiry || '2030-01-01',
        nationality: nationality.trim() || 'Nigerian',
        travelersCount: Number(travelersCount),
        departureDate,
        returnDate: returnDate || undefined,
        totalAmountNgn,
        paymentStatus: 'paid',
        paymentMethod,
        paymentReference: generatedRefCode,
        paidAt: new Date().toISOString(),
        paymentReceiptVerified: true,
        notes: specialNotes.trim() || `Submitted passport dossier for ${currentPkg.title} (${currentPkg.country})`,
      });

      setIsProcessingPayment(false);
      setCreatedReservation(newRes);
      onBookingComplete(newRes);
      setStep(3);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setCreatedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs text-slate-800 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-5 sm:px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Safari Al-Barakah Travel & Tours</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {step === 1 && 'Step 1: Passport & Travel Submission'}
              {step === 2 && 'Step 2: Payment Settlement (Simulated)'}
              {step === 3 && 'Application & Payment Confirmed'}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper bar */}
        {step !== 3 && (
          <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-6 py-2.5 flex items-center justify-between text-xs shrink-0">
            <div className={`flex items-center gap-2 font-bold ${step === 1 ? 'text-blue-600' : 'text-emerald-700'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span>Passport Data</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className={`flex items-center gap-2 font-bold ${step === 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                2
              </div>
              <span>Simulated Payment (₦)</span>
            </div>
            <div className="h-0.5 w-12 bg-slate-200" />
            <div className="flex items-center gap-2 font-bold text-slate-400">
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
                3
              </div>
              <span>Receipt</span>
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* STEP 1: PASSPORT & TRAVEL DETAILS */}
          {step === 1 && (
            <form id="step1-form" onSubmit={handleStep1Submit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Destination / Visa Package *
                </label>
                <select
                  value={pkgId}
                  onChange={(e) => setPkgId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:border-blue-600 focus:outline-none"
                >
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.country} — {pkg.title} (₦{pkg.priceNgn.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Passenger Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Passenger Full Name (as in Passport) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alhaji Mustapha Danladi"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 555 1928"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    required
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Passport Data Section */}
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                    Passport Credentials
                  </h4>
                  <span className="text-[11px] text-blue-600">Must be valid 6+ months</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Passport Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. A10982341"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 font-mono uppercase focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Passport Expiry Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={passportExpiry}
                      onChange={(e) => setPassportExpiry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Upload document */}
                <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-slate-600 truncate">
                      {uploadedFileName ? `Attached: ${uploadedFileName}` : 'Attach Passport Biodata Scan (Optional)'}
                    </span>
                  </div>
                  <label className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-lg cursor-pointer shrink-0">
                    <span>Browse</span>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Travel Window */}
              <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Departure Date *</label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Return Date</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Travelers</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs font-bold text-blue-900">
                <span>Total Amount:</span>
                <span className="text-base text-blue-700 tabular-nums">₦{totalAmountNgn.toLocaleString()}</span>
              </div>
            </form>
          )}

          {/* STEP 2: SIMULATED PAYMENT */}
          {step === 2 && currentPkg && (
            <div className="space-y-4 text-xs">
              {/* Payment Summary Header */}
              <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                    Total Published Tariff
                  </span>
                  <div className="text-2xl font-black text-amber-400 tabular-nums">
                    ₦{totalAmountNgn.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-300">
                    {currentPkg.title} · {travelersCount} Traveler(s)
                  </span>
                </div>
                <div className="text-right text-[11px] text-emerald-400 font-bold bg-white/10 px-2.5 py-1 rounded-lg">
                  ✓ 100% Guaranteed Filing
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">
                  Select Settlement Method (Simulated):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'bank_transfer' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-slate-900">Direct Bank Transfer</div>
                      <div className="text-[10px] text-slate-500">Jaiz / Zenith Bank (Instant ref)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('debit_card')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'debit_card'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 shrink-0 mt-0.5 ${paymentMethod === 'debit_card' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-bold text-slate-900">Debit Card (Simulated)</div>
                      <div className="text-[10px] text-slate-500">Mastercard / Visa / Verve</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Bank Transfer Details */}
              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800">Safari Al-Barakah Bank Details:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedBank('jaiz')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${selectedBank === 'jaiz' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                      >
                        Jaiz Bank
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedBank('zenith')}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer ${selectedBank === 'zenith' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                      >
                        Zenith Bank
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Bank Name</span>
                      <strong className="text-slate-900">{selectedBank === 'jaiz' ? 'Jaiz Bank Plc' : 'Zenith Bank Plc'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Account Number</span>
                      <strong className="text-blue-600 font-mono text-sm">{selectedBank === 'jaiz' ? '0019283746' : '1014829103'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Account Name</span>
                      <strong className="text-slate-900">Safari Al-Barakah Travel Ltd</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Settlement Currency</span>
                      <strong className="text-emerald-700 font-bold">Nigerian Naira (₦ NGN)</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    💡 Click below to simulate instant transfer confirmation. An official payment reference will be generated and recorded to your booking dossier.
                  </p>
                </div>
              )}

              {/* Debit Card Simulator */}
              {paymentMethod === 'debit_card' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Card Information (Test Mode)</span>
                    <span className="text-emerald-600 flex items-center gap-1 text-[11px]">
                      <Lock className="w-3 h-3" /> Secure 256-bit
                    </span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs focus:border-blue-600 focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs focus:border-blue-600 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono text-xs focus:border-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: SUBMISSION & PAYMENT RECEIPT */}
          {step === 3 && createdReservation && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Payment Recorded & Dossier Lodged
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Dossier Ref: <span className="text-blue-600 font-mono">{createdReservation.referenceCode}</span>
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Assalamu Alaikum, {createdReservation.clientName}. Your payment of <strong>₦{createdReservation.totalAmountNgn.toLocaleString()}</strong> has been recorded and your dossier is now queued for consular processing.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-blue-600" />
                    <span>Payment Receipt</span>
                  </span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                    PAID & SETTLED
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>Payment Ref: <strong className="font-mono text-slate-900">{createdReservation.paymentReference}</strong></div>
                  <div>Method: <strong className="capitalize text-slate-900">{createdReservation.paymentMethod?.replace('_', ' ')}</strong></div>
                  <div>Package: <strong className="text-slate-900">{createdReservation.packageName}</strong></div>
                  <div>Amount: <strong className="text-blue-600">₦{createdReservation.totalAmountNgn.toLocaleString()}</strong></div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                form="step1-form"
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleExecutePaymentAndSubmit}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Recording Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Record ₦{totalAmountNgn.toLocaleString()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </>
          )}

          {step === 3 && (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Done
              </button>
              <button
                type="button"
                onClick={onNavigateToClientPortal}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Passenger Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
