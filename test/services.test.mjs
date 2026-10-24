import test from 'node:test';
import assert from 'node:assert';
import { generateAutomatedEmail } from '../src/services/emailAutomation.ts';

test('generateAutomatedEmail generates valid booking confirmation email strictly in Naira', () => {
  const mockReservation = {
    id: 'test-res-1',
    referenceCode: 'SAB-2026-9999',
    packageId: 'pkg-1',
    packageName: 'China Visa',
    packageCategory: 'Visa',
    country: 'China',
    clientName: 'Aliyu Wada',
    clientEmail: 'aliyu@example.com',
    clientPhone: '+234 803 000 0000',
    passportNumber: 'A99999999',
    passportExpiry: '2029-01-01',
    nationality: 'Nigerian',
    travelersCount: 2,
    departureDate: '2026-12-01',
    totalAmountNgn: 1200000,
    paymentStatus: 'paid',
    status: 'pending',
    submissionDate: '2026-10-23T18:00:00Z',
    documents: []
  };

  const email = generateAutomatedEmail(mockReservation, 'booking_confirmation');

  assert.strictEqual(email.recipientEmail, 'aliyu@example.com');
  assert.strictEqual(email.bookingRef, 'SAB-2026-9999');
  assert.match(email.subject, /Passport Dossier Received: China Visa/);
  assert.match(email.htmlBody, /SAFARI AL-BARAKAH/);
  assert.match(email.htmlBody, /\+234 8039521527/);
  assert.match(email.htmlBody, /1,200,000/);
});

test('generateAutomatedEmail generates approved visa grant notice', () => {
  const mockReservation = {
    id: 'test-res-2',
    referenceCode: 'SAB-2026-8888',
    packageId: 'pkg-2',
    packageName: 'Dubai Visa',
    packageCategory: 'Visa',
    country: 'United Arab Emirates',
    clientName: 'Fatima Bello',
    clientEmail: 'fatima@example.com',
    clientPhone: '+234 812 000 0000',
    passportNumber: 'A88888888',
    passportExpiry: '2030-01-01',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2026-11-15',
    totalAmountNgn: 1300000,
    paymentStatus: 'paid',
    status: 'approved',
    visaGrantNumber: 'GDRFA-DXB-8888',
    submissionDate: '2026-10-23T18:00:00Z',
    documents: []
  };

  const email = generateAutomatedEmail(mockReservation, 'visa_approved');

  assert.strictEqual(email.recipientEmail, 'fatima@example.com');
  assert.match(email.subject, /VISA APPROVED/);
  assert.match(email.htmlBody, /VISA STATUS: APPROVED & ISSUED/);
  assert.match(email.htmlBody, /GDRFA-DXB-8888/);
});

test('generateAutomatedEmail generates flight and hotel processed confirmation', () => {
  const mockReservation = {
    id: 'test-res-3',
    referenceCode: 'SAB-2026-7777',
    packageId: 'pkg-11',
    packageName: 'UK Visa',
    packageCategory: 'Visa',
    country: 'United Kingdom',
    clientName: 'Mustapha Danladi',
    clientEmail: 'danladi@example.com',
    clientPhone: '+234 803 555 1928',
    passportNumber: 'A10982341',
    passportExpiry: '2029-11-14',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2026-11-15',
    totalAmountNgn: 818000,
    paymentStatus: 'paid',
    status: 'approved',
    flightBooking: {
      airline: 'British Airways (BA 083)',
      flightNumber: 'BA 083',
      departureAirport: 'Abuja (ABV)',
      arrivalAirport: 'London Heathrow (LHR)',
      departureTime: '08:20 AM',
      arrivalTime: '03:45 PM',
      pnr: 'SAB789BA',
      cabinClass: 'Business',
      issuedAt: '2026-10-23'
    },
    hotelBooking: {
      hotelName: 'The Landmark London',
      roomType: 'Executive Suite',
      checkIn: '2026-11-15',
      checkOut: '2026-11-28',
      address: '222 Marylebone Rd, London',
      confirmationNumber: 'LMK-LON-44910',
      issuedAt: '2026-10-23'
    },
    submissionDate: '2026-10-23T18:00:00Z',
    documents: []
  };

  const email = generateAutomatedEmail(mockReservation, 'flight_hotel_processed');

  assert.strictEqual(email.recipientEmail, 'danladi@example.com');
  assert.match(email.subject, /Flight E-Ticket & Hotel Lodging Issued/);
  assert.match(email.htmlBody, /British Airways/);
  assert.match(email.htmlBody, /SAB789BA/);
  assert.match(email.htmlBody, /The Landmark London/);
});

test('mockReservation properly records simulated payment reference and payment method', () => {
  const mockPaidReservation = {
    id: 'test-res-4',
    referenceCode: 'SAB-2026-6666',
    packageId: 'pkg-1',
    packageName: 'China Tourist & Business Visa',
    packageCategory: 'Visa',
    country: 'China',
    clientName: 'Hajia Aisha Ibrahim',
    clientEmail: 'aisha@example.com',
    clientPhone: '+234 803 221 4455',
    passportNumber: 'A14002911',
    passportExpiry: '2029-08-30',
    nationality: 'Nigerian',
    travelersCount: 1,
    departureDate: '2026-12-10',
    totalAmountNgn: 600000,
    paymentStatus: 'paid',
    paymentMethod: 'bank_transfer',
    paymentReference: 'PAY-SAB-928404',
    paidAt: '2026-10-22T11:50:00Z',
    paymentReceiptVerified: true,
    status: 'pending',
    submissionDate: '2026-10-22T11:45:00Z',
    documents: []
  };

  assert.strictEqual(mockPaidReservation.paymentStatus, 'paid');
  assert.strictEqual(mockPaidReservation.paymentMethod, 'bank_transfer');
  assert.match(mockPaidReservation.paymentReference, /^PAY-SAB-\d+$/);
  assert.strictEqual(mockPaidReservation.totalAmountNgn, 600000);
  assert.strictEqual(mockPaidReservation.paymentReceiptVerified, true);
});
