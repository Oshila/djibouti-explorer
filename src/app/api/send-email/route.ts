import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getCustomerEmailHTML, getAdminEmailHTML } from '@/lib/email/templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Generate reference
    const reference = `INQ-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const fromEmail = 'info@djiboutiexplorer.com';
    const fromName = 'Djibouti Explorer';

    // Send to customer
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [data.email],
      subject: `Thank You for Your Inquiry - ${reference}`,
      html: getCustomerEmailHTML({
        name: data.name,
        reference: reference,
        tourName: data.tourName,
        date: data.date,
        guests: data.guests || 0,
        adults: data.adults || 0,
        children: data.children || 0,
        infants: data.infants || 0,
        price: data.price,
        currency: data.currency || 'USD',
        email: data.email,
        phone: data.phone,
        specialRequests: data.specialRequests || '',
      }),
    });

    // Send to admin (with BCC to you)
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [process.env.ADMIN_EMAIL || 'info@djiboutiexplorer.com'],
      bcc: ['similoluwa1100@gmail.com'],
      subject: `New Tour Inquiry - ${reference}`,
      html: getAdminEmailHTML({
        name: data.name,
        email: data.email,
        phone: data.phone,
        reference: reference,
        tourName: data.tourName,
        date: data.date,
        guests: data.guests || 0,
        adults: data.adults || 0,
        children: data.children || 0,
        infants: data.infants || 0,
        price: data.price,
        currency: data.currency || 'USD',
        specialRequests: data.specialRequests || '',
      }),
    });

    return NextResponse.json({
      success: true,
      reference: reference,
      message: 'Emails sent successfully',
    });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}