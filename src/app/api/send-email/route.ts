import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getCustomerEmailHTML, getAdminEmailHTML } from '@/lib/email/templates';

// Initialize Resend - will work once domain is verified
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate reference
    const reference = `INQ-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Sender email - UPDATE THIS AFTER DOMAIN VERIFICATION
    const fromEmail = 'info@djiboutiexplorer.com';  // ← Your domain email
    const fromName = 'Djibouti Explorer';

    // Customer email
    const customerResult = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [data.email],
      subject: `Tour Inquiry Confirmation - ${reference}`,
      html: getCustomerEmailHTML({
        name: data.name,
        reference: reference,
        tourName: data.tourName,
        date: data.date,
        guests: data.guests,
        price: data.price,
        currency: data.currency || 'USD',
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests || '',
      }),
    });

    console.log('✅ Customer email sent:', customerResult);

    // Admin email
    const adminResult = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [process.env.ADMIN_EMAIL || 'oshilarusimi@gmail.com'],
      subject: `New Tour Inquiry - ${reference}`,
      html: getAdminEmailHTML({
        name: data.name,
        email: data.email,
        phone: data.phone,
        reference: reference,
        tourName: data.tourName,
        date: data.date,
        guests: data.guests,
        price: data.price,
        currency: data.currency || 'USD',
        specialRequests: data.specialRequests || '',
        bookingData: data,
      }),
    });

    console.log('✅ Admin email sent:', adminResult);

    return NextResponse.json({
      success: true,
      reference: reference,
      message: 'Emails sent successfully',
    });
  } catch (error: any) {
    console.error('❌ Email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: error?.response?.body || 'Unknown error'
      },
      { status: 500 }
    );
  }
}