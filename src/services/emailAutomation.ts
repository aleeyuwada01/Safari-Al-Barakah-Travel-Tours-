import { AutomatedEmail, BookingReservation, EmailTemplateType } from '../types';

export const AGENCY_DETAILS = {
  name: 'SAFARI AL-BARAKAH TRAVEL & TOURS',
  tagline: 'Journeys That Inspire, Memories That Last',
  nigeriaPhone: '+234 8039521527',
  egyptPhone: '+20 1558064537',
  email: 'Safarialbarakah@gmail.com',
  website: 'www.safarialbarakah.com',
  headquarters: 'Abuja, Nigeria & Cairo, Egypt',
};

export function generateAutomatedEmail(
  reservation: BookingReservation,
  templateType: EmailTemplateType,
  customNote?: string
): AutomatedEmail {
  const timestamp = new Date().toISOString();
  const dateFormatted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  let subject = '';
  let headline = '';
  let statusBannerColor = '#2680eb';
  let messageContent = '';
  let actionText = 'View Application Dossier';

  switch (templateType) {
    case 'booking_confirmation':
      subject = `Passport Dossier Received: ${reservation.packageName} [Ref: ${reservation.referenceCode}]`;
      headline = 'Your Passport & Travel Application Has Been Received';
      statusBannerColor = '#0F172A';
      messageContent = `
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Assalamu Alaikum / Dear <strong>${reservation.clientName}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Thank you for choosing <strong>Safari Al-Barakah Travel & Tours</strong>. We confirm that your passport dossier and travel application for <strong>${reservation.packageName}</strong> (${reservation.country || 'International'}) has been successfully logged under Reference Number <span style="font-family: monospace; font-weight: bold; color: #0F172A; background: #FEF3C7; padding: 2px 6px; border-radius: 4px;">${reservation.referenceCode}</span>.
        </p>
        <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 18px; margin: 20px 0;">
          <h4 style="margin: 0 0 12px 0; color: #0F172A; font-size: 16px;">Submitted Dossier Summary</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #475569;">
            <tr><td style="padding: 6px 0; font-weight: 600;">Destination Country:</td><td style="padding: 6px 0; text-align: right; color: #0F172A; font-weight: bold;">${reservation.country || 'Designated Destination'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Package / Tariff:</td><td style="padding: 6px 0; text-align: right; color: #0F172A; font-weight: bold;">${reservation.packageName}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Passport Number:</td><td style="padding: 6px 0; text-align: right; font-family: monospace;">${reservation.passportNumber || 'Submitted'}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Travelers:</td><td style="padding: 6px 0; text-align: right;">${reservation.travelersCount} Person(s)</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Target Departure:</td><td style="padding: 6px 0; text-align: right;">${reservation.departureDate}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Published Fee:</td><td style="padding: 6px 0; text-align: right; font-weight: bold; color: #1e3a8a;">₦${reservation.totalAmountNgn.toLocaleString()}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: 600;">Current Stage:</td><td style="padding: 6px 0; text-align: right; color: #0284c7; font-weight: bold;">UNDER AUDIT & VERIFICATION</td></tr>
          </table>
        </div>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          <strong>What Happens Next:</strong> Our Safari Al-Barakah consular desk will verify your passport bio-data against embassy entry requirements. Once verified, we submit your file to the consulate and our flight desk will begin reserving your flight and hotel arrangements.
        </p>
      `;
      break;

    case 'document_verification':
      subject = `Passport Verification Complete: [Ref: ${reservation.referenceCode}] - Safari Al-Barakah`;
      headline = 'Passport Bio-Data & Documents Verified';
      statusBannerColor = '#2563EB';
      messageContent = `
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Dear <strong>${reservation.clientName}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Our compliance department has completed the audit of your passport documents for <strong>${reservation.packageName}</strong>. Your international passport validity (Expiry: ${reservation.passportExpiry || 'Verified'}) meets the required consular threshold for submission.
        </p>
        <div style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; color: #1E40AF; font-size: 14px; line-height: 1.6;">
            ✓ Passport bio-data verified & registered.<br/>
            ✓ Consular application form compiled & audited.<br/>
            ✓ Travel insurance certificate generated.<br/>
            ✓ Destination file transferred to embassy processing queue.
          </p>
        </div>
        ${customNote ? `<p style="background: #FFFBEB; padding: 12px; border-radius: 6px; font-size: 14px; color: #92400E;"><strong>Officer Note:</strong> ${customNote}</p>` : ''}
      `;
      break;

    case 'embassy_processing':
      subject = `Consular Lodgement Confirmed: [${reservation.referenceCode}] - ${reservation.country}`;
      headline = 'Application Lodged With The Embassy';
      statusBannerColor = '#7C3AED';
      messageContent = `
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Dear <strong>${reservation.clientName}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Your application file for <strong>${reservation.packageName}</strong> has been officially lodged with the consular authorities. Embassy tracking is currently active.
        </p>
        <div style="background-color: #F5F3FF; border: 1px solid #DDD6FE; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #5B21B6; font-size: 15px;">Consular Milestones</h4>
          <p style="margin: 0; color: #6D28D9; font-size: 14px; line-height: 1.6;">
            • Embassy Dossier Number: SAB-EMB-${reservation.referenceCode.replace('SAB-', '')}<br/>
            • Destination Country: ${reservation.country}<br/>
            • Estimated Decision Window: Standard embassy processing window.<br/>
            • Safari Al-Barakah officer is actively monitoring your case file.
          </p>
        </div>
        ${customNote ? `<p style="background: #FFFBEB; padding: 12px; border-radius: 6px; font-size: 14px; color: #92400E;"><strong>Consular Note:</strong> ${customNote}</p>` : ''}
      `;
      break;

    case 'visa_approved':
      subject = `🎉 VISA APPROVED & ISSUED: ${reservation.packageName} [Ref: ${reservation.referenceCode}]`;
      headline = 'Alhamdulillah! Your Visa Has Been Approved!';
      statusBannerColor = '#059669';
      actionText = 'Download Visa Authorization';
      messageContent = `
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Dear <strong>${reservation.clientName}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          We are delighted to congratulate you! Your visa authorization for <strong>${reservation.packageName}</strong> (${reservation.country}) has been officially granted and stamped by the immigration authorities.
        </p>
        <div style="background-color: #ECFDF5; border: 2px dashed #059669; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <div style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #047857; font-weight: bold;">Official Authorization Notice</div>
          <div style="font-size: 22px; font-weight: 800; color: #064E3B; margin: 6px 0;">VISA STATUS: APPROVED & ISSUED</div>
          <div style="font-size: 14px; color: #065F46;">
            Applicant: ${reservation.clientName} | Passport: ${reservation.passportNumber || 'Registered'}<br/>
            ${reservation.visaGrantNumber ? `<strong>Grant Number: ${reservation.visaGrantNumber}</strong>` : ''}
          </div>
        </div>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Your official visa document and travel dossier are accessible in your Safari Al-Barakah client portal. Our ticketing desk is now finalizing your confirmed flight e-tickets and hotel lodging.
        </p>
      `;
      break;

    case 'flight_hotel_processed':
      subject = `✈️ Flight E-Ticket & Hotel Lodging Issued: [Ref: ${reservation.referenceCode}]`;
      headline = 'Your Confirmed Flight E-Ticket & Hotel Voucher Are Ready';
      statusBannerColor = '#2563EB';
      actionText = 'View E-Ticket & Hotel Voucher';
      messageContent = `
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Dear <strong>${reservation.clientName}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Safari Al-Barakah Travel & Tours flight and lodging desk has processed your confirmed travel bookings for <strong>${reservation.packageName}</strong>.
        </p>
        ${reservation.flightBooking ? `
        <div style="background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h4 style="margin: 0 0 8px 0; color: #1E40AF; font-size: 15px;">✈️ Confirmed Flight Itinerary</h4>
          <p style="margin: 0; color: #1E3A8A; font-size: 14px; line-height: 1.6;">
            • Carrier: <strong>${reservation.flightBooking.airline} (${reservation.flightBooking.flightNumber})</strong><br/>
            • Route: <strong>${reservation.flightBooking.departureAirport} ➔ ${reservation.flightBooking.arrivalAirport}</strong><br/>
            • Departure: <strong>${reservation.flightBooking.departureTime}</strong> | Arrival: <strong>${reservation.flightBooking.arrivalTime}</strong><br/>
            • PNR / Booking Code: <strong style="font-family: monospace; background: #DBEAFE; padding: 2px 6px; border-radius: 4px;">${reservation.flightBooking.pnr}</strong><br/>
            • Cabin Class: ${reservation.flightBooking.cabinClass}
          </p>
        </div>` : ''}
        ${reservation.hotelBooking ? `
        <div style="background-color: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <h4 style="margin: 0 0 8px 0; color: #92400E; font-size: 15px;">🏨 Confirmed Hotel Lodging</h4>
          <p style="margin: 0; color: #78350F; font-size: 14px; line-height: 1.6;">
            • Property: <strong>${reservation.hotelBooking.hotelName}</strong><br/>
            • Room Type: <strong>${reservation.hotelBooking.roomType}</strong><br/>
            • Check-in: ${reservation.hotelBooking.checkIn} | Check-out: ${reservation.hotelBooking.checkOut}<br/>
            • Voucher Confirmation #: <strong style="font-family: monospace;">${reservation.hotelBooking.confirmationNumber}</strong><br/>
            • Address: ${reservation.hotelBooking.address}
          </p>
        </div>` : ''}
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Please present this e-ticket reference and your international passport at the airport check-in counter at least 3.5 hours prior to international departure.
        </p>
      `;
      break;

    case 'itinerary_ready':
      subject = `Your Complete Travel Itinerary Is Ready: ${reservation.packageName}`;
      headline = 'Your Day-by-Day Journey Itinerary';
      statusBannerColor = '#B45309';
      actionText = 'View Day-by-Day Itinerary';
      messageContent = `
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Dear <strong>${reservation.clientName}</strong>,
        </p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
          Your customized travel itinerary, flight arrangements, hotel check-ins, and airport pickup transfers for <strong>${reservation.packageName}</strong> have been published to your Safari Al-Barakah portal.
        </p>
        <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; color: #92400E; font-size: 14px; line-height: 1.6;">
            <strong>Target Departure Date:</strong> ${reservation.departureDate}<br/>
            <strong>24/7 Travel Assistance Line:</strong> ${AGENCY_DETAILS.nigeriaPhone} (NG) / ${AGENCY_DETAILS.egyptPhone} (EG)<br/>
            <strong>Airport Protocol:</strong> Check in at international airport 3.5 hours prior to departure.
          </p>
        </div>
      `;
      break;
  }

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0F172A; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0B132B; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #091322 0%, #152238 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #2680eb;">
              <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #38bdf8; margin-bottom: 4px; font-weight: 600;">
                ★ Official Notice ★
              </div>
              <h1 style="color: #FFFFFF; font-size: 22px; margin: 0 0 6px 0; font-family: Georgia, serif; letter-spacing: 1px;">
                SAFARI AL-BARAKAH
              </h1>
              <div style="color: #CBD5E1; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px;">
                TRAVEL & TOURS
              </div>
              <div style="color: #94A3B8; font-size: 11px; font-style: italic; margin-top: 6px;">
                "Journeys that inspire, memories that last"
              </div>
            </td>
          </tr>

          <!-- Notification Title Bar -->
          <tr>
            <td style="background-color: ${statusBannerColor}; padding: 14px 24px; text-align: center;">
              <h2 style="color: #FFFFFF; font-size: 16px; margin: 0; font-weight: 600; letter-spacing: 0.5px;">
                ${headline}
              </h2>
            </td>
          </tr>

          <!-- Email Content Body -->
          <tr>
            <td style="padding: 30px 28px;">
              ${messageContent}

              <!-- Call to action button -->
              <div style="text-align: center; margin: 30px 0 15px 0;">
                <div style="display: inline-block; background: #0F172A; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 14px; border: 1px solid #2680eb;">
                  ${actionText}
                </div>
              </div>

              <!-- Contact & Support Box -->
              <div style="border-top: 1px solid #E2E8F0; margin-top: 28px; padding-top: 20px;">
                <h5 style="margin: 0 0 8px 0; color: #0F172A; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Direct Agency Contact</h5>
                <p style="margin: 0; color: #64748B; font-size: 13px; line-height: 1.6;">
                  🇳🇬 Nigeria Office: <a href="tel:${AGENCY_DETAILS.nigeriaPhone}" style="color: #0F172A; text-decoration: none; font-weight: 600;">${AGENCY_DETAILS.nigeriaPhone}</a><br/>
                  🇪🇬 Egypt Office: <a href="tel:${AGENCY_DETAILS.egyptPhone}" style="color: #0F172A; text-decoration: none; font-weight: 600;">${AGENCY_DETAILS.egyptPhone}</a><br/>
                  ✉️ Email: <a href="mailto:${AGENCY_DETAILS.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${AGENCY_DETAILS.email}</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 24px; text-align: center;">
              <p style="color: #94A3B8; font-size: 11px; margin: 0 0 6px 0;">
                Application Reference: ${reservation.referenceCode} · Issued on ${dateFormatted}
              </p>
              <p style="color: #64748B; font-size: 11px; margin: 0;">
                Reliable & Trusted · Consular Visa Processing · Flight & Hotel Backend Management
              </p>
              <p style="color: #94A3B8; font-size: 10px; margin: 8px 0 0 0;">
                © ${new Date().getFullYear()} Safari Al-Barakah Travel & Tours. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return {
    id: `email-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reservationId: reservation.id,
    bookingRef: reservation.referenceCode,
    recipientEmail: reservation.clientEmail,
    recipientName: reservation.clientName,
    templateType,
    subject,
    htmlBody,
    sentAt: timestamp,
    status: 'delivered',
  };
}
