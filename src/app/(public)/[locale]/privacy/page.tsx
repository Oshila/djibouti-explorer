import { Locale } from '@/types';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function PrivacyPage({ params }: Props) {
  // ⭐ Await the params
  const { locale } = await params;
  const isEn = locale === 'en';

  const content = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'We take data protection very seriously. Learn how we secure your information.',
      lastUpdated: 'Last updated: August 2026',
      sections: [
        {
          title: '1. Data Collection',
          content: 'We collect information you provide directly during bookings: name, email, phone, payment information. We also collect browsing data via cookies to improve your experience.'
        },
        {
          title: '2. Use of Data',
          content: 'Your data is used to: process your bookings, send confirmations and updates, contact you if necessary, improve our services, and with your consent, send promotional offers.'
        },
        {
          title: '3. Data Protection',
          content: 'We implement technical and organizational security measures to protect your data against unauthorized access, modification, disclosure, or destruction. Payments are processed via secure PCI-DSS certified platforms.'
        },
        {
          title: '4. Data Sharing',
          content: 'Your data may be shared with our partners (hotels, guides, carriers) only as part of providing our services. We never sell your data to third parties for marketing purposes.'
        },
        {
          title: '5. Cookies',
          content: 'We use essential cookies for site functionality, analytical cookies to understand site usage, and personalization cookies to improve your experience. You can manage your preferences via our cookie banner.'
        },
        {
          title: '6. Your Rights',
          content: 'Under GDPR, you have the right to access your data, rectify it, delete it, limit processing, object to processing, and data portability. Contact us to exercise these rights.'
        },
        {
          title: '7. Data Retention',
          content: 'Your data is kept for as long as necessary to provide our services and legal obligations (typically 5 years for accounting data). You can request deletion of your data at any time.'
        },
        {
          title: '8. DPO Contact',
          content: 'For any questions regarding your personal data, contact our Data Protection Officer at privacy@djiboutiexplorer.com or by mail to our postal address.'
        }
      ],
      ctaTitle: 'Questions about your data?',
      ctaText: 'Our data protection team is here to help.',
      ctaButton: 'Contact Us',
    },
    fr: {
      title: 'Politique de Confidentialité',
      subtitle: 'Nous prenons la protection des données très au sérieux. Découvrez comment nous sécurisons vos informations.',
      lastUpdated: 'Dernière mise à jour : Août 2026',
      sections: [
        {
          title: '1. Collecte de Données',
          content: 'Nous collectons les informations que vous fournissez directement lors des réservations : nom, email, téléphone, informations de paiement. Nous collectons également des données de navigation via les cookies pour améliorer votre expérience.'
        },
        {
          title: '2. Utilisation des Données',
          content: 'Vos données sont utilisées pour : traiter vos réservations, vous envoyer des confirmations et mises à jour, vous contacter si nécessaire, améliorer nos services, et avec votre consentement, vous envoyer des offres promotionnelles.'
        },
        {
          title: '3. Protection des Données',
          content: 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Les paiements sont traités via des plateformes sécurisées certifiées PCI-DSS.'
        },
        {
          title: '4. Partage des Données',
          content: 'Vos données peuvent être partagées avec nos partenaires (hôtels, guides, transporteurs) uniquement dans le cadre de la fourniture de nos services. Nous ne vendons jamais vos données à des tiers à des fins marketing.'
        },
        {
          title: '5. Cookies',
          content: 'Nous utilisons des cookies essentiels pour la fonctionnalité du site, des cookies analytiques pour comprendre l\'utilisation du site, et des cookies de personnalisation pour améliorer votre expérience. Vous pouvez gérer vos préférences via notre bannière de cookies.'
        },
        {
          title: '6. Vos Droits',
          content: 'Conformément au RGPD, vous avez le droit d\'accéder à vos données, de les rectifier, de les supprimer, de limiter leur traitement, de vous opposer au traitement et à la portabilité des données. Contactez-nous pour exercer ces droits.'
        },
        {
          title: '7. Conservation des Données',
          content: 'Vos données sont conservées aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales (généralement 5 ans pour les données comptables). Vous pouvez demander la suppression de vos données à tout moment.'
        },
        {
          title: '8. Contact du DPO',
          content: 'Pour toute question concernant vos données personnelles, contactez notre Délégué à la Protection des Données à privacy@djiboutiexplorer.com ou par courrier à notre adresse postale.'
        }
      ],
      ctaTitle: 'Des questions sur vos données ?',
      ctaText: 'Notre équipe de protection des données est là pour vous aider.',
      ctaButton: 'Contactez-Nous',
    }
  };

  const t = content[locale] || content.en;

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading text-teal mb-4">{t.title}</h1>
            <p className="text-lg text-nearblack/70">{t.subtitle}</p>
            <p className="text-sm text-nearblack/40 mt-2">{t.lastUpdated}</p>
          </div>

          {/* Sections */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
            {t.sections.map((section, index) => (
              <div key={index} className="border-b border-cream last:border-0 pb-6 last:pb-0">
                <h2 className="text-xl font-heading text-teal mb-3">{section.title}</h2>
                <p className="text-nearblack/80 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-8 bg-gradient-to-r from-teal/5 to-terracotta/5 rounded-2xl p-8 text-center border border-cream">
            <h3 className="text-2xl font-heading text-teal mb-2">{t.ctaTitle}</h3>
            <p className="text-nearblack/70 mb-4">{t.ctaText}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}