/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  AutomatedEmail, 
  BookingReservation, 
  ClientItinerary, 
  ContactInquiry, 
  TravelPackage, 
  UserAccount 
} from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { PackagesPage } from './components/PackagesPage';
import { ClientDashboard } from './components/ClientDashboard';
import { AdminPortal } from './components/AdminPortal';
import { BookingModal } from './components/BookingModal';
import { PackageDetailModal } from './components/PackageDetailModal';
import { AuthModal } from './components/AuthModal';
import { FindBookingModal } from './components/FindBookingModal';
import { TripPlannerModal } from './components/TripPlannerModal';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'packages' | 'client' | 'admin'>('landing');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);

  // Application Data States
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [reservations, setReservations] = useState<BookingReservation[]>([]);
  const [itineraries, setItineraries] = useState<ClientItinerary[]>([]);
  const [emails, setEmails] = useState<AutomatedEmail[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TravelPackage | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPackageForDetails, setSelectedPackageForDetails] = useState<TravelPackage | null>(null);

  const [isFindBookingModalOpen, setIsFindBookingModalOpen] = useState(false);
  const [isTripPlannerModalOpen, setIsTripPlannerModalOpen] = useState(false);

  const [previewEmail, setPreviewEmail] = useState<AutomatedEmail | null>(null);
  const [isEmailPreviewModalOpen, setIsEmailPreviewModalOpen] = useState(false);

  const refreshData = () => {
    setPackages(storageService.getPackages());
    setReservations(storageService.getReservations());
    setItineraries(storageService.getItineraries());
    setEmails(storageService.getEmails());
    setInquiries(storageService.getInquiries());
    setCurrentUser(storageService.getCurrentUser());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleOpenBooking = (pkgOrDestination?: TravelPackage | string) => {
    if (typeof pkgOrDestination === 'object' && pkgOrDestination !== null) {
      setSelectedPackageForBooking(pkgOrDestination);
    } else if (typeof pkgOrDestination === 'string') {
      const match = packages.find(p => p.country.toLowerCase().includes(pkgOrDestination.toLowerCase()) || p.title.toLowerCase().includes(pkgOrDestination.toLowerCase()));
      setSelectedPackageForBooking(match || packages[0]);
    } else if (packages.length > 0) {
      setSelectedPackageForBooking(packages[0]);
    }
    setIsBookingModalOpen(true);
  };

  const handleOpenDetails = (pkg: TravelPackage) => {
    setSelectedPackageForDetails(pkg);
    setIsDetailModalOpen(true);
  };

  const handleOpenEmailPreview = (email: AutomatedEmail) => {
    setPreviewEmail(email);
    setIsEmailPreviewModalOpen(true);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('client');
    }
    refreshData();
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800 flex flex-col font-sans">
      
      {/* Top Bar Navigation in Trip.com style */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenFindBooking={() => setIsFindBookingModalOpen(true)}
        onOpenBookingModal={() => handleOpenBooking()}
        onSearchGlobal={(query) => {
          const matched = packages.find(p => 
            p.title.toLowerCase().includes(query.toLowerCase()) || 
            p.country.toLowerCase().includes(query.toLowerCase())
          );
          if (matched) {
            handleOpenDetails(matched);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            packages={packages}
            currentUser={currentUser}
            onBookPackage={(pkg) => handleOpenBooking(pkg)}
            onViewPackageDetails={handleOpenDetails}
            onOpenBookingModal={(dest) => handleOpenBooking(dest)}
            onOpenFindBooking={() => setIsFindBookingModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNavigateToPackages={() => {
              setCurrentView('packages');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'packages' && (
          <PackagesPage
            packages={packages}
            onBookPackage={(pkg) => handleOpenBooking(pkg)}
            onViewPackageDetails={handleOpenDetails}
            onBackToHome={() => {
              setCurrentView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'client' && (
          <ClientDashboard
            reservations={reservations}
            itineraries={itineraries}
            emails={emails}
            currentUser={currentUser}
            onOpenEmailPreview={handleOpenEmailPreview}
            onOpenBookingModal={() => handleOpenBooking()}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortal
            reservations={reservations}
            packages={packages}
            itineraries={itineraries}
            emails={emails}
            inquiries={inquiries}
            onRefreshData={refreshData}
            onOpenEmailPreview={handleOpenEmailPreview}
          />
        )}
      </main>

      {/* Corporate Trip.com Style Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTripPlanner={() => setIsTripPlannerModalOpen(true)}
        onOpenFindBooking={() => setIsFindBookingModalOpen(true)}
      />

      {/* Auth Modal with Demo Credentials */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Passport Dossier & Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={selectedPackageForBooking}
        packages={packages}
        currentUser={currentUser}
        onBookingComplete={() => refreshData()}
        onNavigateToClientPortal={() => {
          setIsBookingModalOpen(false);
          setCurrentView('client');
        }}
      />

      {/* Package Detail Modal */}
      <PackageDetailModal
        pkg={selectedPackageForDetails}
        onClose={() => setIsDetailModalOpen(false)}
        onBook={(pkg) => {
          setIsDetailModalOpen(false);
          handleOpenBooking(pkg);
        }}
      />

      {/* Find Booking Real-Time Reference Search Modal */}
      <FindBookingModal
        isOpen={isFindBookingModalOpen}
        onClose={() => setIsFindBookingModalOpen(false)}
        reservations={reservations}
        onSelectReservation={(res) => {
          setCurrentView('client');
        }}
      />

      {/* Trip.Planner Modal */}
      <TripPlannerModal
        isOpen={isTripPlannerModalOpen}
        onClose={() => setIsTripPlannerModalOpen(false)}
        packages={packages}
        onBookSuggestedPackage={(pkg) => handleOpenBooking(pkg)}
      />

      {/* Automated Email Preview Modal */}
      <EmailPreviewModal
        email={previewEmail}
        onClose={() => {
          setIsEmailPreviewModalOpen(false);
          setPreviewEmail(null);
        }}
        onResend={(email) => {
          storageService.saveEmail({
            ...email,
            id: `email-${Date.now()}`,
            sentAt: new Date().toISOString()
          });
          refreshData();
        }}
      />

    </div>
  );
}
