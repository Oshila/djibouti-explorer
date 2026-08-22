import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, pdfAttachment } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const attachments = pdfAttachment
      ? [
          {
            filename: pdfAttachment.filename || 'visa-invitation.pdf',
            content: pdfAttachment.content, // Base64 encoded
          },
        ]
      : [];

    const { data, error } = await resend.emails.send({
      from: 'Djibouti Explorer <info@djiboutiexplorer.com>',
      to: [to],
      subject: subject,
      html: html,
      attachments: attachments,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email with PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}