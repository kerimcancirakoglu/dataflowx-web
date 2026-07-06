import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (
    request.headers.get('x-forwarded-proto') === 'http' ||
    request.headers.get('cf-visitor')?.includes('"scheme":"http"')
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`,
      { status: 301 }
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(tr|en|ar)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
};
