import type { MetadataRoute } from 'next'
import { db } from '@/lib/firebase/client'
import { collection, getDocs } from 'firebase/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://djiboutiexplorer.com'
  const locales = ['en', 'fr'] as const
  
  // Static pages with their priorities
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/tours', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/destinations', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  ]
  
  // Generate multilingual static pages
  const staticSitemapEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency as any,
      priority: page.priority,
    }))
  )
  
  // Fetch tours from Firebase
  let tourPages: { url: string; priority: number; changeFrequency: string }[] = []
  try {
    const toursSnapshot = await getDocs(collection(db, 'tours'))
    tourPages = toursSnapshot.docs.flatMap((doc) => {
      const data = doc.data()
      const slug = data.slug?.en || doc.id
      
      // Add both language versions
      return locales.map((locale) => ({
        url: `${baseUrl}/${locale}/tours/${slug}`,
        priority: 0.8,
        changeFrequency: 'monthly',
      }))
    })
  } catch (error) {
    console.error('Error fetching tours for sitemap:', error)
  }
  
  // Fetch destinations from Firebase
  let destinationPages: { url: string; priority: number; changeFrequency: string }[] = []
  try {
    const destSnapshot = await getDocs(collection(db, 'destinations'))
    destinationPages = destSnapshot.docs.flatMap((doc) => {
      const data = doc.data()
      const slug = data.slug?.en || doc.id
      
      // Add both language versions
      return locales.map((locale) => ({
        url: `${baseUrl}/${locale}/destinations/${slug}`,
        priority: 0.8,
        changeFrequency: 'monthly',
      }))
    })
  } catch (error) {
    console.error('Error fetching destinations for sitemap:', error)
  }
  
  // Combine all pages
  const allPages = [
    ...staticSitemapEntries,
    ...tourPages,
    ...destinationPages,
  ]
  
  // Remove duplicates (just in case)
  const uniquePages = Array.from(
    new Map(allPages.map((page) => [page.url, page])).values()
  )
  
  return uniquePages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as any,
    priority: page.priority,
  }))
}