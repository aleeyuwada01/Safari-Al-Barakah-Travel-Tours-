import { 
  AutomatedEmail, 
  BookingReservation, 
  ClientItinerary, 
  ContactInquiry, 
  FlightBookingDetails,
  HotelBookingDetails,
  ReservationStatus,
  TravelPackage,
  UserAccount 
} from '../types';
import { generateAutomatedEmail } from './emailAutomation';

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user-client-1',
    email: 'client@safarialbarakah.com',
    name: 'Alhaji Mustapha Danladi',
    phone: '+234 803 555 1928',
    role: 'client',
    passportNumber: 'A10982341',
    nationality: 'Nigerian',
    createdAt: '2026-01-10T12:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'user-admin-1',
    email: 'admin@safarialbarakah.com',
    name: 'Capt. Mansur Al-Hassan',
    phone: '+234 803 952 1527',
    role: 'admin',
    nationality: 'Nigerian',
    createdAt: '2025-06-01T08:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-1',
    code: 'PKG-CHN-01',
    numberTag: 1,
    title: 'China Tourist & Business Visa',
    country: 'China',
    city: 'Beijing & Guangzhou',
    category: 'Visa',
    priceNgn: 600000,
    rating: 4.9,
    reviewsCount: 382,
    badge: 'Popular for Trade',
    processingTime: '7 - 10 Working Days',
    validity: '3 Months / 6 Months Single or Double Entry',
    description: 'Complete consular submission for Canton Fair, business trade summits, and tourism. Comprehensive dossier preparation with official invitation verification.',
    requirements: [
      'Original International Passport (minimum 6 months validity)',
      'Two recent 33x48mm white background passport photographs',
      'Bank statement (6 months) with bank reference letter',
      'Invitation letter from China inviter or confirmed itinerary',
      'Introduction letter from employer or business registration (CAC)'
    ],
    inclusions: [
      'Official Consular Processing Fee',
      'COVA Online Application Form Filing',
      'Visa Appointment Scheduling at Visa Center',
      'Document Audit & Translation Review',
      'Dedicated Consular Officer Liaison'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-2',
    code: 'PKG-DXB-02',
    numberTag: 2,
    title: 'Dubai & UAE Electronic Tourist Visa',
    country: 'United Arab Emirates',
    city: 'Dubai & Abu Dhabi',
    category: 'Visa',
    priceNgn: 1300000,
    rating: 4.9,
    reviewsCount: 890,
    badge: 'Instant e-Visa',
    processingTime: '3 - 5 Working Days',
    validity: '30 Days / 60 Days Single Entry',
    description: 'Fast-track electronic tourist visa processing for Dubai & UAE with mandatory medical travel insurance and GDRFA immigration clearance.',
    requirements: [
      'Clear color passport bio-data page scan',
      'White background passport digital photograph',
      'Confirmed return flight reservation',
      'Hotel accommodation voucher in UAE'
    ],
    inclusions: [
      'Official UAE GDRFA Immigration Fee',
      'Emergency Medical Travel Insurance',
      'Express Electronic Visa Issuance via Email',
      'Dubai Airport Arrival Guidance Notes'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-3',
    code: 'PKG-EGY-03',
    numberTag: 3,
    title: 'Egypt on Visa (Express Arrival Permit)',
    country: 'Egypt',
    city: 'Cairo',
    category: 'Visa',
    priceNgn: 200000,
    rating: 4.8,
    reviewsCount: 412,
    badge: 'Fastest Turnaround',
    processingTime: '24 - 48 Hours',
    validity: '30 Days Single Entry',
    description: 'Direct Egyptian entry clearance and on-arrival facilitation with Cairo security pre-approval clearance. Ideal for fast business or transit.',
    requirements: [
      'Valid International Passport copy',
      'Hotel booking confirmation in Cairo or Sharm El Sheikh',
      'Flight itinerary'
    ],
    inclusions: [
      'Egyptian Immigration Pre-Approval Clearance',
      'Arrival VIP Transit Support at Cairo International Airport',
      'Official Receipt & Reference Dossier'
    ],
    featured: false,
    available: true,
  },
  {
    id: 'pkg-4',
    code: 'PKG-EGY-04',
    numberTag: 4,
    title: 'Egypt Embassy Sticker Visa',
    country: 'Egypt',
    city: 'Cairo & Alexandria',
    category: 'Visa',
    priceNgn: 500000,
    rating: 4.7,
    reviewsCount: 245,
    processingTime: '5 - 7 Working Days',
    validity: '90 Days with 30 Days Stay',
    description: 'Standard embassy-stamped entry visa for leisure, trade, or cultural exploration across historical Cairo, Alexandria, and Luxor.',
    requirements: [
      'Original International Passport',
      'Two passport photographs',
      '6-month stamped bank statement',
      'Introductory letter & business records'
    ],
    inclusions: [
      'Embassy Submission & Stamping Liaison',
      'Complete Visa Application Dossier',
      'Verified Flight & Hotel Itinerary Documentation'
    ],
    featured: false,
    available: true,
  },
  {
    id: 'pkg-5',
    code: 'PKG-EGY-05',
    numberTag: 5,
    title: 'Egypt Multiple Entry Visa',
    country: 'Egypt',
    city: 'Cairo',
    category: 'Visa',
    priceNgn: 700000,
    rating: 4.85,
    reviewsCount: 198,
    badge: 'Frequent Flyers',
    processingTime: '5 - 7 Working Days',
    validity: '6 Months Multiple Entry',
    description: 'Multi-journey consular visa for frequent entrepreneurs, consultants, and travelers with frequent engagements in Egypt and North Africa.',
    requirements: [
      'Original International Passport',
      'Two passport photographs',
      'Bank statement showing consistent operational balance',
      'CAC Certificate or Corporate Reference Letter'
    ],
    inclusions: [
      'Multi-Entry Consular Fee Coverage',
      'Security Background Protocol Pre-Clearance',
      'Expedited Embassy Submission'
    ],
    featured: false,
    available: true,
  },
  {
    id: 'pkg-6',
    code: 'PKG-SCH-06',
    numberTag: 6,
    title: 'France, Schengen, Belgium & Italy Visa',
    country: 'France / Schengen',
    city: 'Paris, Brussels & Rome',
    category: 'Visa',
    priceNgn: 700000,
    rating: 4.95,
    reviewsCount: 1240,
    badge: 'European Gateway',
    processingTime: '15 - 20 Working Days',
    validity: '90 Days Schengen Territory',
    description: 'Complete Schengen Visa file preparation and biometric appointment booking for France, Belgium, and Italy. High-approval documentation protocols.',
    requirements: [
      'Valid International Passport (at least 2 blank pages, 6 months validity)',
      '3-6 Months certified bank statement with sufficient funds',
      'Employment/Business proof (CAC, tax receipts, work leave letter)',
      'Schengen-compliant travel health insurance (€30,000 minimum)',
      'Round-trip flight booking & verified hotel reservation'
    ],
    inclusions: [
      'VFS Global / TLScontact Appointment Slot Booking',
      'Schengen Application Form Accurate Completion',
      '€30,000 Approved Travel Insurance Certificate',
      'Certified Day-by-Day European Travel Itinerary',
      'Cover Letter Customized by Consular Specialist'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-7',
    code: 'PKG-IND-07',
    numberTag: 7,
    title: 'India Medical & Business Processing Fee',
    country: 'India',
    city: 'New Delhi & Mumbai',
    category: 'Visa',
    priceNgn: 600000,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Medical & Business',
    processingTime: '5 - 7 Working Days',
    validity: 'Up to 1 Year Multiple Entry e-Visa',
    description: 'Expert processing for Indian e-Tourist, e-Business, and e-Medical visas. Rapid documentation review and direct High Commission coordination.',
    requirements: [
      'Clear passport bio-data scan',
      'Recent square passport photograph (white background)',
      'Hospital invitation or Indian business letter (for medical/business)'
    ],
    inclusions: [
      'Official Indian e-Visa Portal Submission',
      'Medical Referral Documentation Coordination',
      'Direct Visa Grant PDF Delivery via WhatsApp & Email'
    ],
    featured: false,
    available: true,
  },
  {
    id: 'pkg-8',
    code: 'PKG-MOR-08',
    numberTag: 8,
    title: 'Morocco Kingdom Visa',
    country: 'Morocco',
    city: 'Casablanca & Marrakech',
    category: 'Visa',
    priceNgn: 700000,
    rating: 4.75,
    reviewsCount: 220,
    processingTime: '10 - 15 Working Days',
    validity: '30 Days Single Entry',
    description: 'Embassy sticker processing for tourism, conferences, and heritage tours in Casablanca, Rabat, Marrakech, and Fes.',
    requirements: [
      'Original International Passport',
      '3 passport-size photos',
      '3-month bank statement',
      'Confirmed hotel reservation in Morocco',
      'Round-trip airline reservation'
    ],
    inclusions: [
      'Embassy File Lodgement & Consular Liaison',
      'Hotel & Flight Voucher Verification',
      'Travel Health Insurance'
    ],
    featured: false,
    available: true,
  },
  {
    id: 'pkg-9',
    code: 'PKG-QAT-09',
    numberTag: 9,
    title: 'Qatar Electronic Tourist Visa (Hayya)',
    country: 'Qatar',
    city: 'Doha',
    category: 'Visa',
    priceNgn: 1100000,
    rating: 4.9,
    reviewsCount: 512,
    badge: 'Express Clearance',
    processingTime: '3 - 5 Working Days',
    validity: '30 Days Single Entry (Extendable)',
    description: 'Official Hayya portal electronic entry clearance for Doha luxury shopping, cultural museums, and transit stopovers.',
    requirements: [
      'Passport bio-data copy (6 months validity)',
      'Personal digital photograph',
      'Confirmed hotel booking via Discover Qatar or accredited lodging'
    ],
    inclusions: [
      'Official Qatar Hayya Entry Permit Lodgement',
      'Discover Qatar Mandatory Hotel Integration',
      'Entry Permit PDF with QR Immigration Clearance'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-10',
    code: 'PKG-TUR-10',
    numberTag: 10,
    title: 'Turkey Sticker & e-Visa',
    country: 'Turkey',
    city: 'Istanbul & Antalya',
    category: 'Visa',
    priceNgn: 700000,
    rating: 4.9,
    reviewsCount: 740,
    processingTime: '10 - 14 Working Days',
    validity: 'Single Entry / 30 Days Stay',
    description: 'Embassy sticker visa and e-Visa filing for Istanbul, Ankara, and Cappadocia with Gateway Globe document verification.',
    requirements: [
      'Original Passport valid for at least 6 months',
      '2 Biometric photos (5x5 cm)',
      '6-month stamped bank statement & work documents',
      'Hotel reservation & flight itinerary'
    ],
    inclusions: [
      'Gateway Globe Turkey Visa Application Lodgement',
      'Biometric Appointment Booking',
      'Health Insurance Coverage Endorsement'
    ],
    featured: false,
    available: true,
  },
  {
    id: 'pkg-11',
    code: 'PKG-UK-11',
    numberTag: 11,
    title: 'UK Standard Visitor & Business Visa',
    country: 'United Kingdom',
    city: 'London & Manchester',
    category: 'Visa',
    priceNgn: 818000,
    rating: 4.95,
    reviewsCount: 1650,
    badge: 'Best Seller',
    processingTime: '15 - 20 Working Days',
    validity: '6 Months Standard Visitor Visa',
    description: 'UK Visas and Immigration (UKVI) visitor visa submission with TLScontact appointment, financial review, and sponsorship documentation.',
    requirements: [
      'Original valid International Passport',
      '6 months detailed bank statements with source of funds',
      'Employment/Business credentials and salary evidence',
      'Comprehensive UK stay itinerary and accommodation proof',
      'Letter of invitation or tourist declaration'
    ],
    inclusions: [
      'Complete UKVI Online Form Completion',
      'Document Scanning & Digital Evidence Upload',
      'TLScontact Premium Biometric Appointment Slot',
      'Detailed Legal Cover Letter by Visa Consultant',
      'Passport Dispatch Tracking Updates'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-12',
    code: 'PKG-USA-12',
    numberTag: 12,
    title: 'USA B1/B2 Visitor Processing Fee',
    country: 'United States',
    city: 'New York & Washington',
    category: 'Visa',
    priceNgn: 700000,
    rating: 4.85,
    reviewsCount: 920,
    badge: 'High Demand',
    processingTime: 'Appointment Dependent',
    validity: 'B1/B2 Visitor Visa (2 Years or 5 Years)',
    description: 'Expert DS-160 application drafting, CGI Federal/AIS portal scheduling, consular interview coaching, and expedited appointment tracking.',
    requirements: [
      'Passport bio-data details',
      '5x5 cm digital US visa specification photo',
      'Employment history and educational background details',
      'Travel dates and US contact address'
    ],
    inclusions: [
      'Comprehensive DS-160 Form Review & Submission',
      'US Visa Appointment Profile Creation & Monitoring',
      'Embassy Interview Coaching Session & Q&A Prep',
      'Document Checklist & Ties-to-Home Guidance'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-13',
    code: 'PKG-TOUR-13',
    numberTag: 13,
    title: 'Cairo & Nile Pharaohs Luxury Holiday (7 Days)',
    country: 'Egypt',
    city: 'Cairo, Giza & Nile',
    category: 'Tour',
    priceNgn: 1450000,
    rating: 5.0,
    reviewsCount: 420,
    badge: 'Luxury 5-Star',
    processingTime: 'Instant Confirmation',
    validity: '7 Days / 6 Nights All-Inclusive',
    description: 'VIP 5-Star guided holiday covering Great Pyramids of Giza, Khan el-Khalili Bazaar, Grand Egyptian Museum, and Nile River Dinner Cruise.',
    requirements: [
      'Valid Egyptian Visa or Visa on Arrival eligibility',
      'Passport validity 6 months'
    ],
    inclusions: [
      '5-Star Luxury Cairo Hotel (Steigenberger Pyramids / Kempinski)',
      'Daily Gourmet Breakfast and Nile Sunset Dinner Cruise',
      'Private Chauffeur Airport Pickups & Transfers',
      'Certified English/Arabic Egyptologist Tour Guide',
      'VIP Entry Passes to Pyramids & Museums'
    ],
    featured: true,
    available: true,
  },
  {
    id: 'pkg-14',
    code: 'PKG-UMR-14',
    numberTag: 14,
    title: 'Umrah Platinum Package (Makkah & Madinah 10 Days)',
    country: 'Saudi Arabia',
    city: 'Makkah & Madinah',
    category: 'Umrah & Hajj',
    priceNgn: 2650000,
    rating: 5.0,
    reviewsCount: 780,
    badge: 'Spiritual VIP',
    processingTime: '5 Working Days',
    validity: '10 Days Spiritual Journey',
    description: 'Prestige spiritual pilgrimage package with 5-star clock tower accommodation in Makkah and walking-distance luxury hotel facing Al-Masjid an-Nabawi.',
    requirements: [
      'International Passport',
      'Recent passport photograph',
      'Meningitis / Yellow Fever Vaccination card'
    ],
    inclusions: [
      'Electronic Saudi Umrah Visa Authorization',
      '5 Nights in Makkah (Clock Tower Hotel with Haram View)',
      '5 Nights in Madinah (Near Prophet\'s Mosque)',
      'VIP Haramain High Speed Train Transfer (Makkah ⇄ Madinah)',
      'Full Ziyarah Historic Tours with Islamic Scholar Guide'
    ],
    featured: true,
    available: true,
  }
];

export const INITIAL_RESERVATIONS: BookingReservation[] = [
  {
    id: 'res-101',
    referenceCode: 'SAB-2026-8941',
    packageId: 'pkg-11',
    packageName: 'UK Standard Visitor & Business Visa',
    packageCategory: 'Visa',
    country: 'United Kingdom',
    clientName: 'Alhaji Mustapha Danladi',
    clientEmail: 'client@safarialbarakah.com',
    clientPhone: '+234 803 555 1928',
    passportNumber: 'A10982341',
    passportExpiry: '2029-11-14',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2026-11-15',
    returnDate: '2026-11-28',
    totalAmountNgn: 818000,
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    paymentReference: 'PAY-SAB-894101',
    paidAt: '2026-10-04T10:35:00Z',
    paymentReceiptVerified: true,
    status: 'approved',
    submissionDate: '2026-10-04T10:30:00Z',
    notes: 'Applicant traveling for bilateral agricultural technology trade summit in London.',
    visaGrantNumber: 'UKVI-2026-LON-8941',
    visaIssuedDate: '2026-10-18',
    flightBooking: {
      airline: 'British Airways (BA 083)',
      flightNumber: 'BA 083',
      departureAirport: 'Nnamdi Azikiwe Intl Airport, Abuja (ABV)',
      arrivalAirport: 'London Heathrow Airport Terminal 5 (LHR)',
      departureTime: '08:20 AM',
      arrivalTime: '03:45 PM GMT',
      pnr: 'SAB789BA',
      cabinClass: 'Business',
      issuedAt: '2026-10-19T09:00:00Z'
    },
    hotelBooking: {
      hotelName: 'The Landmark London (5-Star)',
      roomType: 'Executive Marylebone Suite',
      checkIn: '2026-11-15',
      checkOut: '2026-11-28',
      address: '222 Marylebone Rd, London NW1 6JQ',
      confirmationNumber: 'LMK-LON-44910',
      issuedAt: '2026-10-19T09:30:00Z'
    },
    documents: [
      { id: 'doc-1', name: 'Danladi_Passport_Biodata.pdf', type: 'application/pdf', uploadedAt: '2026-10-04', status: 'verified', size: '1.4 MB' },
      { id: 'doc-2', name: 'FirstBank_6M_Statement.pdf', type: 'application/pdf', uploadedAt: '2026-10-04', status: 'verified', size: '3.8 MB' },
      { id: 'doc-3', name: 'UKVI_Approval_Letter.pdf', type: 'application/pdf', uploadedAt: '2026-10-18', status: 'verified', size: '890 KB' }
    ],
    itineraryId: 'itin-201'
  },
  {
    id: 'res-102',
    referenceCode: 'SAB-2026-9042',
    packageId: 'pkg-6',
    packageName: 'France, Schengen, Belgium & Italy Visa',
    packageCategory: 'Visa',
    country: 'France / Schengen',
    clientName: 'Dr. Fatima Bello',
    clientEmail: 'dr.fatima.bello@abu.edu.ng',
    clientPhone: '+234 812 443 8910',
    passportNumber: 'A12894562',
    passportExpiry: '2030-05-22',
    nationality: 'Nigerian',
    travelersCount: 2,
    departureDate: '2026-12-05',
    returnDate: '2026-12-18',
    totalAmountNgn: 1400000,
    paymentStatus: 'paid',
    paymentMethod: 'debit_card',
    paymentReference: 'PAY-SAB-904202',
    paidAt: '2026-10-12T14:20:00Z',
    paymentReceiptVerified: true,
    status: 'embassy_processing',
    submissionDate: '2026-10-12T14:15:00Z',
    notes: 'Attending Medical Congress in Paris, followed by leisure in Rome with spouse.',
    documents: [
      { id: 'doc-4', name: 'Passport_Couples_Scan.pdf', type: 'application/pdf', uploadedAt: '2026-10-12', status: 'verified', size: '2.1 MB' },
      { id: 'doc-5', name: 'VFS_Biometrics_Confirmation.pdf', type: 'application/pdf', uploadedAt: '2026-10-14', status: 'verified', size: '640 KB' }
    ],
    itineraryId: 'itin-202'
  },
  {
    id: 'res-103',
    referenceCode: 'SAB-2026-9115',
    packageId: 'pkg-2',
    packageName: 'Dubai & UAE Electronic Tourist Visa',
    packageCategory: 'Visa',
    country: 'United Arab Emirates',
    clientName: 'Engr. Tunde Adeleke',
    clientEmail: 'tunde.adeleke@lagoscon.com',
    clientPhone: '+234 802 334 7781',
    passportNumber: 'A11776529',
    passportExpiry: '2028-09-10',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2026-11-20',
    returnDate: '2026-11-27',
    totalAmountNgn: 1300000,
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    paymentReference: 'PAY-SAB-911503',
    paidAt: '2026-10-21T09:10:00Z',
    paymentReceiptVerified: true,
    status: 'document_verification',
    submissionDate: '2026-10-21T09:00:00Z',
    notes: 'GITEX Dubai global tech conference attendance.',
    documents: [
      { id: 'doc-6', name: 'Passport_Adeleke.jpg', type: 'image/jpeg', uploadedAt: '2026-10-21', status: 'verified', size: '820 KB' }
    ]
  },
  {
    id: 'res-104',
    referenceCode: 'SAB-2026-9284',
    packageId: 'pkg-1',
    packageName: 'China Tourist & Business Visa',
    packageCategory: 'Visa',
    country: 'China',
    clientName: 'Hajia Aisha Ibrahim',
    clientEmail: 'aisha.ibrahim@kanotrade.org',
    clientPhone: '+234 803 221 4455',
    passportNumber: 'A14002911',
    passportExpiry: '2029-08-30',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2026-12-10',
    returnDate: '2026-12-24',
    totalAmountNgn: 600000,
    paymentStatus: 'paid',
    paymentMethod: 'debit_card',
    paymentReference: 'PAY-SAB-928404',
    paidAt: '2026-10-22T11:50:00Z',
    paymentReceiptVerified: true,
    status: 'pending',
    submissionDate: '2026-10-22T11:45:00Z',
    notes: 'Sourcing industrial textile machinery in Guangzhou and trade meetings in Yiwu.',
    documents: [
      { id: 'doc-7', name: 'Passport_Aisha_Bio.pdf', type: 'application/pdf', uploadedAt: '2026-10-22', status: 'pending', size: '1.1 MB' }
    ]
  },
  {
    id: 'res-105',
    referenceCode: 'SAB-2026-9350',
    packageId: 'pkg-4',
    packageName: 'Egypt Embassy Sticker Visa',
    packageCategory: 'Visa',
    country: 'Egypt',
    clientName: 'Babatunde Adele',
    clientEmail: 'b.adele@heritage.ng',
    clientPhone: '+234 818 900 1234',
    passportNumber: 'A15998124',
    passportExpiry: '2031-03-15',
    nationality: 'Nigerian',
    travelersCount: 2,
    departureDate: '2026-12-01',
    returnDate: '2026-12-10',
    totalAmountNgn: 1000000,
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    paymentReference: 'PAY-SAB-935005',
    paidAt: '2026-10-19T16:05:00Z',
    paymentReceiptVerified: true,
    status: 'embassy_processing',
    submissionDate: '2026-10-19T16:00:00Z',
    notes: 'Cultural tour across Cairo and Nile cruise with family.',
    documents: [
      { id: 'doc-8', name: 'Adele_Passport_Scan.pdf', type: 'application/pdf', uploadedAt: '2026-10-19', status: 'verified', size: '1.8 MB' }
    ]
  },
  {
    id: 'res-106',
    referenceCode: 'SAB-2026-9412',
    packageId: 'pkg-12',
    packageName: 'USA B1/B2 Visitor Processing Fee',
    packageCategory: 'Visa',
    country: 'United States',
    clientName: 'Chief Emeka Okonkwo',
    clientEmail: 'emeka.okonkwo@capitalventures.com',
    clientPhone: '+234 802 888 7766',
    passportNumber: 'A13554109',
    passportExpiry: '2030-01-10',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2027-01-15',
    returnDate: '2027-01-30',
    totalAmountNgn: 700000,
    paymentStatus: 'paid',
    paymentMethod: 'debit_card',
    paymentReference: 'PAY-SAB-941206',
    paidAt: '2026-10-23T14:25:00Z',
    paymentReceiptVerified: true,
    status: 'pending',
    submissionDate: '2026-10-23T14:20:00Z',
    notes: 'Attending annual venture summit in New York and family holiday.',
    documents: [
      { id: 'doc-9', name: 'Chief_Okonkwo_Passport.pdf', type: 'application/pdf', uploadedAt: '2026-10-23', status: 'pending', size: '2.4 MB' }
    ]
  }
];

export const INITIAL_ITINERARIES: ClientItinerary[] = [
  {
    id: 'itin-201',
    reservationId: 'res-101',
    bookingRef: 'SAB-2026-8941',
    clientName: 'Alhaji Mustapha Danladi',
    destination: 'London, United Kingdom',
    title: 'London VIP Executive Trade & Cultural Tour',
    startDate: '2026-11-15',
    endDate: '2026-11-22',
    status: 'active',
    days: [
      {
        dayNumber: 1,
        date: '2026-11-15',
        title: 'Arrival in London & Luxury Chauffeur Transfer',
        location: 'London Heathrow ➔ Marylebone',
        description: 'Touchdown at London Heathrow Terminal 5. Meet your private Mercedes S-Class chauffeur at arrivals and transfer to The Landmark London.',
        activities: [
          {
            id: 'act-1-1',
            time: '15:45',
            title: 'Heathrow Touchdown & Fast-Track Border Clearance',
            location: 'Heathrow Terminal 5',
            description: 'Proceed through e-Gates with approved biometric UK Visa. Chauffeur waiting with greeting signage.',
            type: 'flight'
          },
          {
            id: 'act-1-2',
            time: '17:00',
            title: 'VIP Hotel Check-in & Refreshment',
            location: 'The Landmark London',
            description: 'Check into the Executive Marylebone Suite. Welcome tea and refreshments in room.',
            type: 'hotel'
          }
        ]
      },
      {
        dayNumber: 2,
        date: '2026-11-16',
        title: 'Agricultural Trade Forum & West End Architecture',
        location: 'ExCeL London & Westminster',
        description: 'Morning participation in bilateral trade summit followed by afternoon scenic Thames River cruise.',
        activities: [
          {
            id: 'act-2-1',
            time: '09:00',
            title: 'Keynote Session: UK-West Africa Agribusiness',
            location: 'ExCeL London Convention Centre',
            description: 'High-level business networking and bilateral partnership roundtable.',
            type: 'tour'
          },
          {
            id: 'act-2-2',
            time: '13:00',
            title: 'Central London Prayer & Lunch',
            location: 'London Central Mosque (Regent\'s Park)',
            description: 'Midday prayer followed by lunch in St John\'s Wood.',
            type: 'prayer'
          }
        ]
      }
    ],
    emergencyContact: '+234 8039521527 / +44 20 7946 0192',
    agencyOfficer: 'Capt. Mansur Al-Hassan (Senior Travel Director)',
    notes: 'Please remember to retain flight boarding passes and keep your hotel key card handy for complimentary access to the Executive Lounge.'
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Kabiru Sanusi',
    email: 'k.sanusi@energygroup.com',
    phone: '+234 803 112 9988',
    destination: 'United Kingdom',
    message: 'We require expedited group visas for 4 executives traveling to London for an investment roadshow next month.',
    createdAt: '2026-10-22T08:15:00Z',
    status: 'new'
  }
];

const STORAGE_KEYS = {
  CURRENT_USER: 'sab_auth_current_user_v3',
  USERS: 'sab_auth_users_v3',
  PACKAGES: 'sab_packages_v3',
  RESERVATIONS: 'sab_reservations_v3',
  ITINERARIES: 'sab_itineraries_v3',
  EMAILS: 'sab_emails_v3',
  INQUIRIES: 'sab_inquiries_v3',
};

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return defaultValue;
      return JSON.parse(stored) as T;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to store key: ${key}`, e);
    }
  }

  // --- Auth & Users ---
  getCurrentUser(): UserAccount | null {
    return this.get<UserAccount | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  setCurrentUser(user: UserAccount | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      this.set(STORAGE_KEYS.CURRENT_USER, user);
    }
  }

  getUsers(): UserAccount[] {
    const users = this.get<UserAccount[]>(STORAGE_KEYS.USERS, []);
    if (!users || users.length === 0) {
      this.set(STORAGE_KEYS.USERS, DEMO_USERS);
      return DEMO_USERS;
    }
    return users;
  }

  login(email: string): UserAccount | null {
    const users = this.getUsers();
    const normalized = email.toLowerCase().trim();
    let found = users.find(u => u.email.toLowerCase() === normalized);
    
    // Auto-match demo accounts if typed without exact match
    if (!found) {
      if (normalized.includes('admin')) {
        found = DEMO_USERS[1];
      } else if (normalized.includes('client') || normalized.includes('danladi')) {
        found = DEMO_USERS[0];
      }
    }

    if (found) {
      this.setCurrentUser(found);
      return found;
    }

    // Or auto-register client on login
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      email: normalized,
      name: normalized.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      phone: '+234 800 000 0000',
      role: 'client',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.set(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  register(name: string, email: string, phone: string, role: 'client' | 'admin' = 'client'): UserAccount {
    const users = this.getUsers();
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      role,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    this.set(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  logout(): void {
    this.setCurrentUser(null);
  }

  // --- Packages ---
  getPackages(): TravelPackage[] {
    const list = this.get<TravelPackage[]>(STORAGE_KEYS.PACKAGES, []);
    if (!list || list.length === 0) {
      this.set(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
      return INITIAL_PACKAGES;
    }
    return list;
  }

  savePackage(pkg: TravelPackage): void {
    const packages = this.getPackages();
    const index = packages.findIndex(p => p.id === pkg.id);
    if (index >= 0) {
      packages[index] = pkg;
    } else {
      packages.unshift(pkg);
    }
    this.set(STORAGE_KEYS.PACKAGES, packages);
  }

  deletePackage(packageId: string): void {
    const packages = this.getPackages().filter(p => p.id !== packageId);
    this.set(STORAGE_KEYS.PACKAGES, packages);
  }

  // --- Reservations / Client Passport Dossiers ---
  getReservations(): BookingReservation[] {
    const list = this.get<BookingReservation[]>(STORAGE_KEYS.RESERVATIONS, []);
    if (!list || list.length === 0) {
      this.set(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      return INITIAL_RESERVATIONS;
    }
    return list;
  }

  createReservation(reservationData: Omit<BookingReservation, 'id' | 'referenceCode' | 'submissionDate' | 'status' | 'documents'>): BookingReservation {
    const reservations = this.getReservations();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `SAB-2026-${randomCode}`;
    const newReservation: BookingReservation = {
      ...reservationData,
      id: `res-${Date.now()}`,
      referenceCode,
      submissionDate: new Date().toISOString(),
      status: 'pending',
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          name: `${reservationData.clientName.replace(/\s+/g, '_')}_Passport_Biodata.pdf`,
          type: 'application/pdf',
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'pending',
          size: '1.2 MB'
        }
      ]
    };

    reservations.unshift(newReservation);
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);

    // Auto-generate confirmation email!
    const autoEmail = generateAutomatedEmail(newReservation, 'booking_confirmation');
    this.saveEmail(autoEmail);

    return newReservation;
  }

  updateReservationStatus(reservationId: string, status: ReservationStatus, officerNote?: string): BookingReservation | null {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) return null;

    reservations[index].status = status;
    const updated = reservations[index];
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);

    if (status === 'document_verification') {
      const email = generateAutomatedEmail(updated, 'document_verification', officerNote);
      this.saveEmail(email);
    } else if (status === 'embassy_processing') {
      const email = generateAutomatedEmail(updated, 'embassy_processing', officerNote);
      this.saveEmail(email);
    } else if (status === 'approved') {
      const email = generateAutomatedEmail(updated, 'visa_approved', officerNote);
      this.saveEmail(email);
    }

    return updated;
  }

  // --- Safari Admin Backend Processing: Flights, Hotels, Visas ---
  issueFlightBooking(reservationId: string, flightDetails: FlightBookingDetails, sendEmail = true): BookingReservation | null {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) return null;

    reservations[index].flightBooking = flightDetails;
    const updated = reservations[index];
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);

    if (sendEmail) {
      const email = generateAutomatedEmail(updated, 'flight_hotel_processed');
      this.saveEmail(email);
    }

    return updated;
  }

  issueHotelBooking(reservationId: string, hotelDetails: HotelBookingDetails, sendEmail = true): BookingReservation | null {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) return null;

    reservations[index].hotelBooking = hotelDetails;
    const updated = reservations[index];
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);

    if (sendEmail) {
      const email = generateAutomatedEmail(updated, 'flight_hotel_processed');
      this.saveEmail(email);
    }

    return updated;
  }

  updateVisaGrant(reservationId: string, visaGrantNumber: string, visaIssuedDate: string, status: ReservationStatus = 'approved', officerNote?: string): BookingReservation | null {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) return null;

    reservations[index].visaGrantNumber = visaGrantNumber;
    reservations[index].visaIssuedDate = visaIssuedDate;
    reservations[index].status = status;
    const updated = reservations[index];
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);

    const email = generateAutomatedEmail(updated, 'visa_approved', officerNote);
    this.saveEmail(email);

    return updated;
  }

  // --- Payment Tracking & Verification ---
  recordPayment(
    reservationId: string, 
    method: 'bank_transfer' | 'debit_card' | 'office_cash', 
    paymentReference: string,
    verified: boolean = true
  ): BookingReservation | null {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) return null;

    reservations[index].paymentStatus = 'paid';
    reservations[index].paymentMethod = method;
    reservations[index].paymentReference = paymentReference;
    reservations[index].paidAt = new Date().toISOString();
    reservations[index].paymentReceiptVerified = verified;

    const updated = reservations[index];
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);
    return updated;
  }

  verifyPaymentReceipt(reservationId: string, verified: boolean): BookingReservation | null {
    const reservations = this.getReservations();
    const index = reservations.findIndex(r => r.id === reservationId);
    if (index === -1) return null;

    reservations[index].paymentReceiptVerified = verified;
    reservations[index].paymentStatus = verified ? 'paid' : reservations[index].paymentStatus;
    const updated = reservations[index];
    this.set(STORAGE_KEYS.RESERVATIONS, reservations);
    return updated;
  }

  // --- Itineraries ---
  getItineraries(): ClientItinerary[] {
    const list = this.get<ClientItinerary[]>(STORAGE_KEYS.ITINERARIES, []);
    if (!list || list.length === 0) {
      this.set(STORAGE_KEYS.ITINERARIES, INITIAL_ITINERARIES);
      return INITIAL_ITINERARIES;
    }
    return list;
  }

  saveItinerary(itinerary: ClientItinerary): void {
    const itineraries = this.getItineraries();
    const index = itineraries.findIndex(it => it.id === itinerary.id);
    if (index >= 0) {
      itineraries[index] = itinerary;
    } else {
      itineraries.unshift(itinerary);
    }
    this.set(STORAGE_KEYS.ITINERARIES, itineraries);

    if (itinerary.reservationId) {
      const reservations = this.getReservations();
      const resIndex = reservations.findIndex(r => r.id === itinerary.reservationId);
      if (resIndex >= 0) {
        reservations[resIndex].itineraryId = itinerary.id;
        this.set(STORAGE_KEYS.RESERVATIONS, reservations);
        
        const email = generateAutomatedEmail(reservations[resIndex], 'itinerary_ready');
        this.saveEmail(email);
      }
    }
  }

  // --- Emails ---
  getEmails(): AutomatedEmail[] {
    const list = this.get<AutomatedEmail[]>(STORAGE_KEYS.EMAILS, []);
    if (!list || list.length === 0) {
      const initialEmails: AutomatedEmail[] = [
        generateAutomatedEmail(INITIAL_RESERVATIONS[0], 'visa_approved'),
        generateAutomatedEmail(INITIAL_RESERVATIONS[0], 'flight_hotel_processed'),
        generateAutomatedEmail(INITIAL_RESERVATIONS[1], 'embassy_processing'),
        generateAutomatedEmail(INITIAL_RESERVATIONS[2], 'document_verification'),
        generateAutomatedEmail(INITIAL_RESERVATIONS[3], 'booking_confirmation')
      ];
      this.set(STORAGE_KEYS.EMAILS, initialEmails);
      return initialEmails;
    }
    return list;
  }

  saveEmail(email: AutomatedEmail): void {
    const emails = this.getEmails();
    emails.unshift(email);
    this.set(STORAGE_KEYS.EMAILS, emails);
  }

  // --- Inquiries ---
  getInquiries(): ContactInquiry[] {
    const list = this.get<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    if (!list || list.length === 0) {
      this.set(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
      return INITIAL_INQUIRIES;
    }
    return list;
  }

  addInquiry(inquiryData: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
    const inquiries = this.getInquiries();
    const newInq: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    inquiries.unshift(newInq);
    this.set(STORAGE_KEYS.INQUIRIES, inquiries);
    return newInq;
  }

  updateInquiryStatus(id: string, status: ContactInquiry['status']): void {
    const inquiries = this.getInquiries();
    const target = inquiries.find(i => i.id === id);
    if (target) {
      target.status = status;
      this.set(STORAGE_KEYS.INQUIRIES, inquiries);
    }
  }

  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.PACKAGES);
    localStorage.removeItem(STORAGE_KEYS.RESERVATIONS);
    localStorage.removeItem(STORAGE_KEYS.ITINERARIES);
    localStorage.removeItem(STORAGE_KEYS.EMAILS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.USERS);
  }
}

export const storageService = new StorageService();
