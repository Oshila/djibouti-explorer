import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/vercel.svg',
      ],
    },
    sitemap: 'https://djiboutiexplorer.com/sitemap.xml',
  }
}