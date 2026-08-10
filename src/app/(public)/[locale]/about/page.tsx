import { Locale } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UsersIcon,
  MapPinIcon,
  HeartIcon,
  StarIcon,
  GlobeIcon,
  ShieldCheckIcon,
  TrophyIcon,
  ClockIcon,
  SunIcon,
  CloudIcon,
  MountainIcon,
  WavesIcon,
  TreePalmIcon,
  CompassIcon
} from 'lucide-react';

interface Props {
  params: {
    locale: Locale;
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = (locale === 'en' || locale === 'fr') ? locale : 'en';

  const content = {
    en: {
      title: 'About Djibouti Explorer',
      subtitle: 'Your trusted local guide to the wonders of Djibouti',
      story: {
        title: 'Our Story',
        description: 'Djibouti Explorer was born from a passion for sharing the extraordinary beauty of Djibouti with the world. Founded by local experts who have spent years exploring every corner of this remarkable country, we offer authentic, handcrafted experiences that go beyond the typical tourist routes.',
        description2: 'We believe that travel should be more than just sightseeing—it should be a journey of discovery, connection, and wonder. Every tour we create is designed to showcase the unique landscapes, rich culture, and warm hospitality that make Djibouti truly special.',
      },
      mission: {
        title: 'Our Mission',
        description: 'To provide travelers with authentic, sustainable, and unforgettable experiences while supporting local communities and preserving Djibouti\'s natural and cultural heritage.',
      },
      values: {
        title: 'Our Values',
        items: [
          { icon: UsersIcon, title: 'Local Expertise', description: 'Our guides are passionate locals who know Djibouti inside out.' },
          { icon: ShieldCheckIcon, title: 'Authentic Experiences', description: 'We offer genuine, off-the-beaten-path experiences that connect you with local culture.' },
          { icon: HeartIcon, title: 'Sustainable Travel', description: 'We are committed to responsible tourism that benefits local communities.' },
          { icon: TrophyIcon, title: 'Quality & Safety', description: 'Your safety and satisfaction are our top priorities.' },
        ],
      },
      team: {
        title: 'Meet Your Guides',
        description: 'Our team of expert local guides are passionate about sharing the wonders of Djibouti with you.',
      },
      cta: {
        title: 'Ready to Explore Djibouti?',
        subtitle: 'Book your adventure today and experience the extraordinary.',
        button: 'View Tours',
      },
    },
    fr: {
      title: 'À Propos de Djibouti Explorer',
      subtitle: 'Votre guide local de confiance pour les merveilles de Djibouti',
      story: {
        title: 'Notre Histoire',
        description: 'Djibouti Explorer est né d\'une passion pour faire découvrir la beauté extraordinaire de Djibouti au monde. Fondé par des experts locaux qui ont passé des années à explorer chaque recoin de ce pays remarquable, nous proposons des expériences authentiques et artisanales qui vont au-delà des circuits touristiques habituels.',
        description2: 'Nous croyons que le voyage devrait être plus qu\'une simple visite touristique—ce devrait être un voyage de découverte, de connexion et d\'émerveillement. Chaque circuit que nous créons est conçu pour mettre en valeur les paysages uniques, la riche culture et l\'hospitalité chaleureuse qui rendent Djibouti vraiment spécial.',
      },
      mission: {
        title: 'Notre Mission',
        description: 'Offrir aux voyageurs des expériences authentiques, durables et inoubliables tout en soutenant les communautés locales et en préservant le patrimoine naturel et culturel de Djibouti.',
      },
      values: {
        title: 'Nos Valeurs',
        items: [
          { icon: UsersIcon, title: 'Expertise Locale', description: 'Nos guides sont des locaux passionnés qui connaissent Djibouti sur le bout des doigts.' },
          { icon: ShieldCheckIcon, title: 'Expériences Authentiques', description: 'Nous proposons des expériences authentiques hors des sentiers battus qui vous connectent à la culture locale.' },
          { icon: HeartIcon, title: 'Tourisme Durable', description: 'Nous nous engageons à un tourisme responsable qui profite aux communautés locales.' },
          { icon: TrophyIcon, title: 'Qualité & Sécurité', description: 'Votre sécurité et votre satisfaction sont nos priorités absolues.' },
        ],
      },
      team: {
        title: 'Rencontrez Vos Guides',
        description: 'Notre équipe de guides locaux experts est passionnée par le partage des merveilles de Djibouti avec vous.',
      },
      cta: {
        title: 'Prêt à Explorer Djibouti ?',
        subtitle: 'Réservez votre aventure dès aujourd\'hui et vivez l\'extraordinaire.',
        button: 'Voir les Circuits',
      },
    },
  };

  const t = content[validLocale];

  // Real images from Unsplash for the 4 sections
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=600&fit=crop',
      alt: 'Lake Assal salt flats',
    },
    {
      src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=600&fit=crop',
      alt: 'Djibouti desert landscape',
    },
    {
      src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=600&fit=crop',
      alt: 'Djibouti coastline',
    },
    {
      src: '/images/about/mountain-landscape.jpg',
      alt: 'Mountain landscape',
    },
  ];

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal/90 via-teal/80 to-teal/70 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream/5 to-transparent" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block text-ochre font-medium text-sm uppercase tracking-wider mb-3">
              {validLocale === 'en' ? 'About Us' : 'À Propos'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-4 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-cream/90 max-w-2xl">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Our Story */}
          <div className="p-8 md:p-12 border-b border-cream">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
                  {validLocale === 'en' ? 'Our Story' : 'Notre Histoire'}
                </span>
                <h2 className="text-3xl font-heading text-teal mt-2 mb-4">
                  {t.story.title}
                </h2>
                <p className="text-nearblack/70 leading-relaxed">
                  {t.story.description}
                </p>
                <p className="text-nearblack/70 leading-relaxed mt-4">
                  {t.story.description2}
                </p>
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                      <MapPinIcon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <div className="font-medium text-nearblack">50+</div>
                      <div className="text-xs text-nearblack/50">{validLocale === 'en' ? 'Unique Tours' : 'Circuits Uniques'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                      <UsersIcon className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <div className="font-medium text-nearblack">1000+</div>
                      <div className="text-xs text-nearblack/50">{validLocale === 'en' ? 'Happy Travelers' : 'Voyageurs Satisfaits'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-ochre" />
                    </div>
                    <div>
                      <div className="font-medium text-nearblack">4.9★</div>
                      <div className="text-xs text-nearblack/50">{validLocale === 'en' ? 'Average Rating' : 'Note Moyenne'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="aspect-square rounded-2xl overflow-hidden relative">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 md:p-12 border-b border-cream bg-cream/30">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
                {validLocale === 'en' ? 'Our Mission' : 'Notre Mission'}
              </span>
              <h2 className="text-3xl font-heading text-teal mt-2 mb-4">
                {t.mission.title}
              </h2>
              <p className="text-nearblack/70 leading-relaxed text-lg">
                {t.mission.description}
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="p-8 md:p-12 border-b border-cream">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
                {validLocale === 'en' ? 'Our Values' : 'Nos Valeurs'}
              </span>
              <h2 className="text-3xl font-heading text-teal mt-2">
                {t.values.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.values.items.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-cream/50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-teal/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-teal" />
                    </div>
                    <h3 className="font-heading text-teal mb-2">{value.title}</h3>
                    <p className="text-sm text-nearblack/60">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meet Your Guides */}
          <div className="p-8 md:p-12 border-b border-cream">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-terracotta font-medium text-sm uppercase tracking-wider">
                {validLocale === 'en' ? 'Team' : 'Équipe'}
              </span>
              <h2 className="text-3xl font-heading text-teal mt-2">
                {t.team.title}
              </h2>
              <p className="text-nearblack/70 mt-2">
                {t.team.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-cream/50 rounded-2xl p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal/20 to-terracotta/20 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <UsersIcon className="w-8 h-8 text-teal/40" />
                  </div>
                  <h3 className="font-heading text-teal">
                    {validLocale === 'en' ? 'Local Guide' : 'Guide Local'}
                  </h3>
                  <p className="text-sm text-nearblack/50 mt-1">
                    {validLocale === 'en' ? 'Expert in Djibouti\'s wonders' : 'Expert des merveilles de Djibouti'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 md:p-12 bg-gradient-to-r from-teal/5 to-terracotta/5">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading text-teal mb-2">
                {t.cta.title}
              </h2>
              <p className="text-nearblack/60 mb-6">
                {t.cta.subtitle}
              </p>
              <Link
                href={`/${validLocale}/tours`}
                className="inline-block bg-terracotta hover:bg-terracotta/90 text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                {t.cta.button} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}