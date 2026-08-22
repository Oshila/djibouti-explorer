import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // ⭐ Load and embed the logo
    let logoImage = null;
    try {
      const logoPath = path.join(process.cwd(), 'public/images/logo.jpg');
      const logoBytes = fs.readFileSync(logoPath);
      logoImage = await pdfDoc.embedJpg(logoBytes);
    } catch (error) {
      console.log('Logo not found, continuing without logo');
    }

    const drawText = (text: string, x: number, y: number, size: number = 10, isBold: boolean = false) => {
      page.drawText(text, {
        x,
        y,
        size,
        font: isBold ? boldFont : font,
        color: rgb(0.1, 0.1, 0.1),
      });
    };

    // ⭐ Draw logo if available
    let currentY = 770;
    if (logoImage) {
      const logoWidth = 80;
      const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
      page.drawImage(logoImage, {
        x: 50,
        y: currentY - logoHeight + 10,
        width: logoWidth,
        height: logoHeight,
      });
      currentY = 770;
      // Shift text to the right of logo
      drawText('Djibouti Explorer', 140, currentY, 22, true);
      currentY -= 24;
      drawText("Numéro d'immatriculation N° 24506/A", 140, currentY, 10);
      currentY -= 16;
      drawText('Saline Ouest, Djibouti', 140, currentY, 10);
      currentY -= 16;
      drawText('+253 77 86 26 39', 140, currentY, 10);
      currentY -= 16;
      drawText('info@djiboutiexplorer.com', 140, currentY, 10);
    } else {
      drawText('Djibouti Explorer', 50, currentY, 22, true);
      currentY -= 24;
      drawText("Numéro d'immatriculation N° 24506/A", 50, currentY, 10);
      currentY -= 16;
      drawText('Saline Ouest, Djibouti', 50, currentY, 10);
      currentY -= 16;
      drawText('+253 77 86 26 39', 50, currentY, 10);
      currentY -= 16;
      drawText('info@djiboutiexplorer.com', 50, currentY, 10);
    }

    const formattedDate = new Date(data.createdAt).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    drawText(`Djibouti, le ${formattedDate}`, 450, 770, 10);

    drawText('Objet : Invitation pour la demande de Visa pour Djibouti', 50, 660, 14, true);

    let y = 620;
    drawText('À qui de droit,', 50, y, 11);
    y -= 25;

    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

    const bodyText1 = `Je soussigné, Moussa Hamadou Kamil, CEO de Djibouti Explorer, invite par la présente Mr. ${data.fullName}, titulaire du passeport n° ${data.passportNumber}, à visiter Djibouti pour des raisons touristiques.`;
    const bodyLines1 = bodyText1.match(/.{1,85}/g) || [bodyText1];
    bodyLines1.forEach((line) => {
      drawText(line, 50, y, 11);
      y -= 18;
    });

    y -= 10;

    const bodyText2 = `Je certifie que Mr. ${data.fullName.split(' ')[0]} est un invité légitime et qu'il sera accueilli à Djibouti. Pendant son séjour, il sera accompagné de moi-même pour toutes les visites touristiques que nous avons planifiées.`;
    const bodyLines2 = bodyText2.match(/.{1,85}/g) || [bodyText2];
    bodyLines2.forEach((line) => {
      drawText(line, 50, y, 11);
      y -= 18;
    });

    y -= 10;

    const bodyText3 = `Son séjour est prévu du ${formatDate(data.arrivalDate)} au ${formatDate(data.departureDate)}. Je m'engage à prendre en charge son séjour et à veiller à ce qu'il respecte toutes les lois et règlements de Djibouti pendant sa visite.`;
    const bodyLines3 = bodyText3.match(/.{1,85}/g) || [bodyText3];
    bodyLines3.forEach((line) => {
      drawText(line, 50, y, 11);
      y -= 18;
    });

    y -= 10;
    drawText('Je vous prie de bien vouloir lui accorder le Visa nécessaire pour entrer sur le territoire djiboutien.', 50, y, 11);
    y -= 30;
    drawText('Je reste à votre disposition pour toute information supplémentaire.', 50, y, 11);
    y -= 30;
    drawText('Cordialement,', 50, y, 11);
    y -= 40;

    drawText('Idriss Hamadou Kamil', 50, y, 12, true);
    y -= 18;
    drawText('CEO, Djibouti Explorer', 50, y, 11);
    y -= 16;
    drawText('+253 77 86 26 39', 50, y, 11);
    y -= 16;
    drawText('info@djiboutiexplorer.com', 50, y, 11);
    y -= 25;
    drawText(`Référence: ${data.reference}`, 50, y, 10);

    drawText('Djibouti Explorer - Saline Ouest, Djibouti - +253 77 86 26 39 - info@djiboutiexplorer.com', 50, 50, 9);

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=visa-invitation-${data.reference}.pdf`,
      },
    });

  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}