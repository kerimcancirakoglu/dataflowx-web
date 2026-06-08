import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip static files, api routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Basic Language Routing Logic
  // This helps us default users from TR to the /tr route,
  // and AR users to /ar (with fallback to /en for now)
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const lang = acceptLanguage.toLowerCase();
      
      if (lang.includes('tr')) {
        const url = request.nextUrl.clone();
        url.pathname = '/tr';
        return NextResponse.redirect(url);
      }
      
      if (lang.includes('ar')) {
        const url = request.nextUrl.clone();
        // TODO: Update to '/ar' when Arabic pages are ready.
        // For now, redirect Arabic users to '/en' as fallback instead of 404.
        url.pathname = '/en'; 
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
