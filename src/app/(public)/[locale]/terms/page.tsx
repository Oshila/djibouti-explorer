import { Locale } from '@/types';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function TermsPage({ params }: Props) {
  // ⭐ Await the params
  const { locale } = await params;
  const isEn = locale === 'en';

  const content = {
    en: {
      title: 'Terms & Conditions',
      subtitle: 'Please read these terms carefully before using our services.',
      lastUpdated: 'Last updated: August 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing this website and using our services, you agree to be bound by these terms and conditions. If you do not accept these terms, please do not use our site or services.'
        },
        {
          title: '2. Booking Services',
          content: 'Djibouti Explorer offers booking services for tours and experiences. All bookings are subject to availability and confirmation. Displayed prices are indicative and may vary.'
        },
        {
          title: '3. Payment',
          content: 'We accept multiple payment methods including credit cards and bank transfers. A deposit is required to confirm all reservations. The balance is due before departure.'
        },
        {
          title: '4. Cancellation Policy',
          content: 'Cancellations made more than 14 days before departure are entitled to a full refund minus administrative fees. Cancellations between 7 and 14 days are entitled to a 50% refund. Less than 7 days, no refund is possible except in cases of force majeure.'
        },
        {
          title: '5. Liability',
          content: 'Djibouti Explorer acts as an intermediary between you and service providers. We cannot be held responsible for the acts, errors, or omissions of these providers. We strongly recommend purchasing travel insurance.'
        },
        {
          title: '6. Modifications',
          content: 'We reserve the right to modify itineraries if necessary for safety, weather, or other circumstances beyond our control. We will strive to offer equivalent alternatives.'
        },
        {
          title: '7. Intellectual Property',
          content: 'All content on this site, including texts, images, logos, and designs, is the property of Djibouti Explorer and is protected by intellectual property laws. Any unauthorized reproduction is prohibited.'
        },
        {
          title: '8. Contact',
          content: 'For any questions regarding these terms, please contact us at info@djiboutiexplorer.com or by phone at +253 77 86 26 39.'
        }
      ],
      ctaTitle: 'Have questions?',
      ctaText: 'Our team is here to help with any questions you may have.',
      ctaButton: 'Contact Us',
    },
    fr: {
      title: 'Conditions Générales',
      subtitle: 'Veuillez lire attentivement ces conditions avant d\'utiliser nos services.',
      lastUpdated: 'Dernière mise à jour : Août 2026',
      sections: [
        {
          title: '1. Acceptation des Conditions',
          content: 'En accédant à ce site web et en utilisant nos services, vous acceptez d\'être lié par ces conditions générales. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre site ou nos services.'
        },
        {
          title: '2. Services de Réservation',
          content: 'Djibouti Explorer propose des services de réservation pour des circuits et expériences. Toutes les réservations sont soumises à disponibilité et confirmation. Les prix affichés sont indicatifs et peuvent varier.'
        },
        {
          title: '3. Paiement',
          content: 'Nous acceptons plusieurs méthodes de paiement incluant les cartes de crédit et les virements bancaires. Un acompte est requis pour confirmer toute réservation. Le solde est dû avant le départ.'
        },
        {
          title: '4. Politique d\'Annulation',
          content: 'Les annulations effectuées plus de 14 jours avant le départ donnent droit à un remboursement complet moins les frais administratifs. Les annulations entre 7 et 14 jours donnent droit à un remboursement de 50%. Moins de 7 jours, aucun remboursement n\'est possible sauf en cas de force majeure.'
        },
        {
          title: '5. Responsabilité',
          content: 'Djibouti Explorer agit en tant qu\'intermédiaire entre vous et les prestataires de services. Nous ne pouvons être tenus responsables des actes, erreurs ou omissions de ces prestataires. Nous recommandons vivement de souscrire une assurance voyage.'
        },
        {
          title: '6. Modifications',
          content: 'Nous nous réservons le droit de modifier les itinéraires si nécessaire pour des raisons de sécurité, météorologiques ou d\'autres circonstances indépendantes de notre volonté. Nous nous efforcerons de proposer des alternatives équivalentes.'
        },
        {
          title: '7. Propriété Intellectuelle',
          content: 'Tout le contenu de ce site, y compris les textes, images, logos et designs, est la propriété de Djibouti Explorer et est protégé par les lois sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.'
        },
        {
          title: '8. Contact',
          content: 'Pour toute question concernant ces conditions, veuillez nous contacter à info@djiboutiexplorer.com ou par téléphone au +253 77 86 26 39.'
        }
      ],
      ctaTitle: 'Des questions ?',
      ctaText: 'Notre équipe est là pour répondre à toutes vos questions.',
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