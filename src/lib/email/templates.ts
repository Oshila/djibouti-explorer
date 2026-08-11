// Customer Email Template
export function getCustomerEmailHTML(data: {
  name: string;
  reference: string;
  tourName: string;
  date: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  price: number;
  currency: string;
  email: string;
  phone: string;
  specialRequests: string;
}) {
  // Calculate breakdown
  const adultPrice = data.price;
  const childPrice = data.price * 0.7; // 30% discount for children
  const infantPrice = 0; // Infants free
  const totalAdults = data.adults || data.guests || 0;
  const totalChildren = data.children || 0;
  const totalInfants = data.infants || 0;
  const totalGuests = totalAdults + totalChildren + totalInfants;
  
  const totalPrice = (totalAdults * adultPrice) + (totalChildren * childPrice) + (totalInfants * infantPrice);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tour Inquiry Confirmation</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f5f0eb; 
      margin: 0; 
      padding: 0; 
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 40px 20px; 
    }
    .card { 
      background: #ffffff; 
      border-radius: 16px; 
      padding: 40px; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.08); 
    }
    .header { 
      text-align: center; 
      border-bottom: 2px solid #f2e8d4; 
      padding-bottom: 24px; 
      margin-bottom: 24px;
    }
    .logo { 
      font-size: 24px; 
      font-weight: bold; 
      color: #1E3D47; 
      font-family: Georgia, serif;
    }
    .logo span { 
      color: #C0532C; 
    }
    .badge { 
      display: inline-block; 
      background: #72803A; 
      color: white; 
      padding: 4px 16px; 
      border-radius: 20px; 
      font-size: 12px; 
      font-weight: 600; 
      letter-spacing: 0.5px;
      margin-top: 8px;
    }
    .ref-box { 
      background: #f2e8d4; 
      padding: 14px; 
      border-radius: 10px; 
      text-align: center; 
      font-size: 14px; 
      margin-bottom: 24px;
    }
    .ref-box strong {
      color: #1E3D47;
    }
    .ref-box .ref-code {
      font-family: monospace;
      font-size: 18px;
      font-weight: bold;
      color: #C0532C;
      letter-spacing: 1px;
    }
    .greeting {
      font-size: 16px;
      line-height: 1.6;
      color: #141414;
      margin-bottom: 20px;
    }
    .greeting strong {
      color: #1E3D47;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #1E3D47;
      margin: 24px 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #f2e8d4;
    }
    .detail-row { 
      display: flex; 
      justify-content: space-between; 
      padding: 10px 0; 
      border-bottom: 1px solid #f2e8d4; 
      font-size: 14px;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #666;
    }
    .detail-value {
      color: #141414;
      font-weight: 500;
    }
    .price-breakdown {
      background: #f8f5f0;
      border-radius: 10px;
      padding: 16px;
      margin: 16px 0;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 14px;
    }
    .price-total {
      display: flex;
      justify-content: space-between;
      padding: 12px 0 0 0;
      border-top: 2px solid #1E3D47;
      margin-top: 8px;
      font-size: 18px;
      font-weight: bold;
      color: #1E3D47;
    }
    .steps {
      margin: 20px 0;
    }
    .step {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 12px 0;
      border-bottom: 1px solid #f2e8d4;
    }
    .step:last-child {
      border-bottom: none;
    }
    .step-number {
      background: #1E3D47;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      flex-shrink: 0;
    }
    .step-content {
      font-size: 14px;
      color: #141414;
    }
    .step-content strong {
      color: #1E3D47;
    }
    .whatsapp-btn {
      display: inline-block;
      background: #25D366;
      color: white;
      padding: 12px 28px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      margin: 16px 0 8px 0;
    }
    .whatsapp-btn:hover {
      background: #128C7E;
    }
    .footer {
      text-align: center;
      padding-top: 24px;
      border-top: 2px solid #f2e8d4;
      margin-top: 24px;
      font-size: 12px;
      color: #999;
    }
    .footer .brand {
      font-size: 16px;
      font-weight: bold;
      color: #1E3D47;
      font-family: Georgia, serif;
    }
    .footer .tagline {
      color: #666;
      font-size: 13px;
      margin: 4px 0 12px 0;
    }
    .contact-info {
      margin: 12px 0;
      font-size: 13px;
      color: #666;
    }
    .contact-info a {
      color: #1E3D47;
      text-decoration: none;
    }
    .contact-info a:hover {
      text-decoration: underline;
    }
    .divider {
      height: 2px;
      background: linear-gradient(to right, transparent, #1E3D47, transparent);
      margin: 20px 0;
      opacity: 0.2;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <!-- Header -->
      <div class="header">
        <div class="logo">Djibouti <span>Explorer</span></div>
        <div class="badge">INQUIRY</div>
      </div>

      <!-- Reference -->
      <div class="ref-box">
        <strong>REF:</strong> <span class="ref-code">${data.reference}</span>
      </div>

      <!-- Greeting -->
      <div class="greeting">
        Dear <strong>${data.name}</strong>,
      </div>
      <p style="color: #555; line-height: 1.6; font-size: 15px; margin-bottom: 24px;">
        Thank you for your interest in exploring Djibouti with us! We are excited to help you plan an unforgettable experience.
      </p>

      <!-- Inquiry Details -->
      <div class="section-title">🗺️ Your Inquiry Details</div>
      <div class="detail-row">
        <span class="detail-label">Reference:</span>
        <span class="detail-value">${data.reference}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Tour:</span>
        <span class="detail-value">${data.tourName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Date:</span>
        <span class="detail-value">${data.date || 'Flexible'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Guests:</span>
        <span class="detail-value">${totalGuests}</span>
      </div>

      <!-- Price Estimate -->
      <div class="section-title" style="margin-top: 20px;">💰 Price Estimate</div>
      <div class="price-breakdown">
        ${totalAdults > 0 ? `<div class="price-row"><span>Adults (18+) × ${totalAdults}</span><span>${data.currency} ${(totalAdults * adultPrice).toLocaleString()}</span></div>` : ''}
        ${totalChildren > 0 ? `<div class="price-row"><span>Children (4-11) × ${totalChildren}</span><span>${data.currency} ${(totalChildren * childPrice).toLocaleString()}</span></div>` : ''}
        ${totalInfants > 0 ? `<div class="price-row"><span>Infants (0-3) × ${totalInfants}</span><span>${data.currency} ${(totalInfants * infantPrice).toLocaleString()}</span></div>` : ''}
        <div class="price-total">
          <span>Estimated Total</span>
          <span>${data.currency} ${totalPrice.toLocaleString()}</span>
        </div>
      </div>
      <p style="font-size: 12px; color: #999; text-align: right; margin-top: -8px;">
        * Final price may vary based on availability and group size
      </p>

      <!-- Next Steps -->
      <div class="section-title">📋 Next Steps</div>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content"><strong>Review</strong> – Our team will review your request and check availability.</div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content"><strong>Contact</strong> – We will contact you via WhatsApp within 24 hours.</div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content"><strong>Confirmation</strong> – Once details are finalized, we will send you a confirmation.</div>
        </div>
      </div>

      <!-- WhatsApp CTA -->
      <div style="text-align: center;">
        <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25377862639'}" class="whatsapp-btn">
          💬 Chat with us on WhatsApp
        </a>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Footer -->
      <div class="footer">
        <div class="brand">Djibouti Explorer</div>
        <div class="tagline">Your gateway to East Africa's hidden gem</div>
        <div class="contact-info">
          Have questions? Contact us directly:<br>
          WhatsApp: <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '25377862639'}">+253 77 86 26 39</a> &nbsp;|&nbsp; Email: <a href="mailto:info@djiboutiexplorer.com">info@djiboutiexplorer.com</a>
        </div>
        <p style="margin-top: 12px;">© ${new Date().getFullYear()} Djibouti Explorer. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Admin Email Template
export function getAdminEmailHTML(data: {
  name: string;
  email: string;
  phone: string;
  reference: string;
  tourName: string;
  date: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  price: number;
  currency: string;
  specialRequests: string;
}) {
  const totalAdults = data.adults || data.guests || 0;
  const totalChildren = data.children || 0;
  const totalInfants = data.infants || 0;
  const totalGuests = totalAdults + totalChildren + totalInfants;
  const totalPrice = (totalAdults * data.price) + (totalChildren * data.price * 0.7);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Tour Inquiry - ${data.reference}</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f5f0eb; 
      margin: 0; 
      padding: 20px; 
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 16px; 
      padding: 30px; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.08); 
    }
    .header { 
      border-bottom: 2px solid #f2e8d4; 
      padding-bottom: 16px; 
      margin-bottom: 20px;
    }
    .header h2 {
      color: #1E3D47;
      margin: 0;
    }
    .badge { 
      display: inline-block; 
      background: #C0532C; 
      color: white; 
      padding: 4px 16px; 
      border-radius: 20px; 
      font-size: 12px; 
      font-weight: 600; 
      margin-top: 6px;
    }
    .row { 
      display: flex; 
      justify-content: space-between; 
      padding: 8px 0; 
      border-bottom: 1px solid #f2e8d4; 
      font-size: 14px;
    }
    .row:last-child {
      border-bottom: none;
    }
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #1E3D47;
      margin: 20px 0 12px 0;
    }
    .whatsapp-btn {
      display: inline-block;
      background: #25D366;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
    .whatsapp-btn:hover {
      background: #128C7E;
    }
    .footer {
      text-align: center;
      padding-top: 16px;
      border-top: 1px solid #f2e8d4;
      margin-top: 20px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🆕 New Tour Inquiry</h2>
      <div class="badge">${data.reference}</div>
    </div>

    <div class="section-title">👤 Customer Details</div>
    <div class="row"><span><strong>Name:</strong></span> <span>${data.name}</span></div>
    <div class="row"><span><strong>Email:</strong></span> <span><a href="mailto:${data.email}">${data.email}</a></span></div>
    <div class="row"><span><strong>Phone:</strong></span> <span><a href="tel:${data.phone}">${data.phone}</a></span></div>

    <div class="section-title">📋 Inquiry Details</div>
    <div class="row"><span><strong>Tour:</strong></span> <span>${data.tourName}</span></div>
    <div class="row"><span><strong>Date:</strong></span> <span>${data.date || 'Flexible'}</span></div>
    <div class="row"><span><strong>Guests:</strong></span> <span>${totalGuests}</span></div>
    ${totalAdults > 0 ? `<div class="row"><span><strong>Adults:</strong></span> <span>${totalAdults}</span></div>` : ''}
    ${totalChildren > 0 ? `<div class="row"><span><strong>Children:</strong></span> <span>${totalChildren}</span></div>` : ''}
    ${totalInfants > 0 ? `<div class="row"><span><strong>Infants:</strong></span> <span>${totalInfants}</span></div>` : ''}
    <div class="row"><span><strong>Estimated Total:</strong></span> <span><strong>${data.currency} ${totalPrice.toLocaleString()}</strong></span></div>

    ${data.specialRequests ? `
    <div class="section-title">📝 Special Requests</div>
    <p style="background: #f5f0eb; padding: 12px; border-radius: 8px; font-size: 14px; margin: 0;">${data.specialRequests}</p>
    ` : ''}

    <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f2e8d4;">
      <a href="https://wa.me/${data.phone}" class="whatsapp-btn">💬 Contact Customer</a>
    </div>

    <div class="footer">
      Djibouti Explorer • ${new Date().getFullYear()}
    </div>
  </div>
</body>
</html>
  `;
}