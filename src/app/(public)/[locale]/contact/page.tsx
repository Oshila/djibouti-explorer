import { Locale } from '@/types';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you. Reach out to us any time.',
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      phone: 'Phone',
      emailLabel: 'Email',
      address: 'Address',
      whatsapp: 'Chat on WhatsApp',
      or: 'or',
      reachUs: 'Reach Us Directly',
    },
    fr: {
      title: 'Contactez-Nous',
      subtitle: 'Nous serions ravis de vous entendre. Contactez-nous à tout moment.',
      name: 'Nom Complet',
      email: 'Adresse Email',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer le Message',
      phone: 'Téléphone',
      emailLabel: 'Email',
      address: 'Adresse',
      whatsapp: 'Discuter sur WhatsApp',
      or: 'ou',
      reachUs: 'Contactez-Nous Directement',
    },
  };

  const t = content[validLocale];

  return (
    <div className="section-padding bg-cream">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading text-teal mb-4">{t.title}</h1>
            <p className="text-nearblack/70 text-lg">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-heading text-teal mb-4">{t.reachUs}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-teal mt-0.5" />
                    <div>
                      <div className="text-xs text-nearblack/50">{t.phone}</div>
                      <div className="text-sm text-nearblack">+253 77 86 26 39</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-teal mt-0.5" />
                    <div>
                      <div className="text-xs text-nearblack/50">{t.emailLabel}</div>
                      <div className="text-sm text-nearblack">info@djiboutiexplorer.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-teal mt-0.5" />
                    <div>
                      <div className="text-xs text-nearblack/50">{t.address}</div>
                      <div className="text-sm text-nearblack">Djibouti City, Djibouti</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-cream">
                    <a
                      href="https://wa.me/25377862639"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      {t.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-1">
                        {t.name} *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-1">
                        {t.email} *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-1">
                        {t.subject}
                      </label>
                      <input
                        type="text"
                        placeholder={validLocale === 'en' ? 'Tour Enquiry' : 'Demande de Circuit'}
                        className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-nearblack/70 mb-1">
                        {t.message} *
                      </label>
                      <textarea
                        rows={5}
                        placeholder={validLocale === 'en' ? 'Your message...' : 'Votre message...'}
                        className="w-full px-4 py-3 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-95"
                    >
                      {t.send}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}