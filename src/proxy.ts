import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr'];
const defaultLocale = 'en';

function getLocale(pathname: string): string {
  const segments = pathname.split('/');
  const firstSegment = segments[1] ?? '';
  return locales.includes(firstSegment) ? firstSegment : defaultLocale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip proxy for API routes, static assets, AND ADMIN ROUTES
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/admin') ||        // ← ADD THIS - excludes ALL admin routes
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if path already has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = getLocale(pathname);
    const response = NextResponse.next();
    
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    
    return response;
  }

  // Redirect to default locale
  const locale = defaultLocale;
  const newPath = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|admin).*)',  // ← ADD admin to matcher
  ],
};