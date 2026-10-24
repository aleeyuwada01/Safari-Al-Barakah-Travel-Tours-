export type PackageCategory = 
  | 'Visa' 
  | 'Tour' 
  | 'Umrah & Hajj';

export type ReservationStatus = 
  | 'pending' 
  | 'document_verification' 
  | 'embassy_processing' 
  | 'approved' 
  | 'completed' 
  | 'rejected';

export type PaymentStatus = 'paid' | 'partial' | 'pending';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'client' | 'admin';
  avatar?: string;
  createdAt: string;
  passportNumber?: string;
  nationality?: string;
}

export interface TravelPackage {
  id: string;
  code: string;
  numberTag?: number;
  title: string;
  country: string;
  city?: string;
  category: PackageCategory;
  priceNgn: number;
  rating: number;
  reviewsCount: number;
  processingTime: string;
  validity: string;
  description: string;
  requirements: string[];
  inclusions: string[];
  badge?: string;
  featured?: boolean;
  available: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: 'verified' | 'pending' | 'rejected';
  size?: string;
}

export interface FlightBookingDetails {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  pnr: string;
  cabinClass: string;
  issuedAt: string;
}

export interface HotelBookingDetails {
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  address: string;
  confirmationNumber: string;
  issuedAt: string;
}

export interface BookingReservation {
  id: string;
  referenceCode: string;
  packageId: string;
  packageName: string;
  packageCategory: PackageCategory;
  country: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  passportNumber: string;
  passportExpiry: string;
  dateOfBirth?: string;
  nationality: string;
  travelersCount: number;
  departureDate: string;
  returnDate?: string;
  totalAmountNgn: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: 'bank_transfer' | 'debit_card' | 'office_cash';
  paymentReference?: string;
  paidAt?: string;
  paymentReceiptVerified?: boolean;
  status: ReservationStatus;
  submissionDate: string;
  notes?: string;
  documents: DocumentItem[];
  // Processed by Safari Admins:
  flightBooking?: FlightBookingDetails;
  hotelBooking?: HotelBookingDetails;
  visaGrantNumber?: string;
  visaIssuedDate?: string;
  itineraryId?: string;
}

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  type: 'flight' | 'transfer' | 'hotel' | 'tour' | 'meal' | 'leisure' | 'prayer';
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  title: string;
  location: string;
  description: string;
  activities: ItineraryActivity[];
}

export interface ClientItinerary {
  id: string;
  reservationId: string;
  bookingRef: string;
  clientName: string;
  destination: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed';
  days: ItineraryDay[];
  emergencyContact: string;
  agencyOfficer: string;
  notes: string;
}

export type EmailTemplateType = 
  | 'booking_confirmation'
  | 'document_verification'
  | 'embassy_processing'
  | 'visa_approved'
  | 'flight_hotel_processed'
  | 'itinerary_ready';

export interface AutomatedEmail {
  id: string;
  reservationId: string;
  bookingRef: string;
  recipientEmail: string;
  recipientName: string;
  templateType: EmailTemplateType;
  subject: string;
  htmlBody: string;
  sentAt: string;
  status: 'sent' | 'delivered';
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}
