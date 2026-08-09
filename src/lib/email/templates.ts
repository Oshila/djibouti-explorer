// Customer Email Template
export function getCustomerEmailHTML(data: {
  name: string;
  reference: string;
  tourName: string;
  date: string;
  guests: number;
  price: number;
  currency: string;
  email: string;
  phone: string;
  specialRequests: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tour Inquiry Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .card { background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { text-align: center; border-bottom: 2px solid #f2e8d4; padding-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #1E3D47; }
    .badge { display: inline-block; background: #72803A; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .ref { background: #f2e8d4; padding: 12px; border-radius: 8px; text-align: center; font-size: 14px; }
    .details { margin: 24px 0; }
    .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f2e8d4; }
    .total { font-size: 20px; font-weight: bold; color: #1E3D47; }
    .steps { margin: 24px 0; }
    .step { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f2e8d4; }
    .step-number { background: #1E3D47; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; }
    .step-content { font-size: 14px; color: #141414; }
    .whatsapp-btn { display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">Djibouti Explorer</div>
        <p style="color: #666; margin: 8px 0 0;">Your gateway to East Africa's hidden gem</p>
      </div>

      <div style="text-align: center; margin: 24px 0;">
        <h2 style="color: #1E3D47; margin: 0;">Thank You for Your Inquiry</h2>
        <p style="color: #666;">Your tour request has been received</p>
        <div class="badge">INQUIRY</div>
      </div>

      <div class="ref">
        <strong>REF:</strong> ${data.reference}
      </div>

      <div style="margin: 24px 0;">
        <p style="font-size: 16px; color: #141414;">
          Dear <strong>${data.name}</strong>,
        </p>
        <p style="color: #555; line-height: 1.6;">
          Thank you for your interest in exploring Djibouti with us! We are excited to help you plan an unforgettable experience.
        </p>
      </div>

      <h3 style="color: #1E3D47;">🗺️ Your Inquiry Details</h3>
      <div class="details">
        <div class="row"><span><strong>Reference:</strong></span> <span>${data.reference}</span></div>
        <div class="row"><span><strong>Tour:</strong></span> <span>${data.tourName}</span></div>
        <div class="row"><span><strong>Date:</strong></span> <span>${data.date}</span></div>
        <div class="row"><span><strong>Guests:</strong></span> <span>${data.guests}</span></div>
      </div>

      <h3 style="color: #1E3D47;">💰 Price Estimate</h3>
      <div class="details">
        <div class="row"><span>Estimated Total:</span> <span class="total">${data.currency} ${data.price.toLocaleString()}</span></div>
        <div style="font-size: 12px; color: #999; text-align: right; padding-top: 8px;">
          * Final price may vary based on availability and group size
        </div>
      </div>

      <h3 style="color: #1E3D47;">📋 Next Steps</h3>
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

      <div style="text-align: center; margin: 24px 0;">
        <a href="https://wa.me/25377862639" class="whatsapp-btn">💬 Chat with us on WhatsApp</a>
      </div>

      <div style="font-size: 12px; color: #999; text-align: center; border-top: 1px solid #f2e8d4; padding-top: 20px;">
        <p>Have questions? Contact us directly:</p>
        <p>WhatsApp: <a href="https://wa.me/25377862639" style="color: #25D366;">+253 77 86 26 39</a> | Email: <a href="mailto:info@djiboutiexplorer.com" style="color: #1E3D47;">info@djiboutiexplorer.com</a></p>
        <p style="margin-top: 12px;">© 2026 Djibouti Explorer. All rights reserved.</p>
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
  price: number;
  currency: string;
  specialRequests: string;
  bookingData: any;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Tour Inquiry - ${data.reference}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f0eb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { border-bottom: 2px solid #f2e8d4; padding-bottom: 16px; }
    .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f2e8d4; }
    .badge { display: inline-block; background: #C0532C; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .whatsapp-btn { display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="color: #1E3D47;">🆕 New Tour Inquiry</h2>
      <div class="badge">${data.reference}</div>
    </div>

    <h3 style="color: #1E3D47; margin-top: 20px;">👤 Customer Details</h3>
    <div class="row"><span><strong>Name:</strong></span> <span>${data.name}</span></div>
    <div class="row"><span><strong>Email:</strong></span> <span>${data.email}</span></div>
    <div class="row"><span><strong>Phone:</strong></span> <span>${data.phone}</span></div>

    <h3 style="color: #1E3D47; margin-top: 20px;">📋 Inquiry Details</h3>
    <div class="row"><span><strong>Tour:</strong></span> <span>${data.tourName}</span></div>
    <div class="row"><span><strong>Date:</strong></span> <span>${data.date}</span></div>
    <div class="row"><span><strong>Guests:</strong></span> <span>${data.guests}</span></div>
    <div class="row"><span><strong>Estimated Total:</strong></span> <span><strong>${data.currency} ${data.price.toLocaleString()}</strong></span></div>

    ${data.specialRequests ? `
    <h3 style="color: #1E3D47; margin-top: 20px;">📝 Special Requests</h3>
    <p style="background: #f5f0eb; padding: 12px; border-radius: 8px;">${data.specialRequests}</p>
    ` : ''}

    <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f2e8d4;">
      <a href="https://wa.me/${data.phone}" class="whatsapp-btn">💬 Contact Customer</a>
    </div>
  </div>
</body>
</html>
  `;
}