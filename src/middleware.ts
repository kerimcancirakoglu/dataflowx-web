import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

function enforceSecureCookies(response: NextResponse): NextResponse {
  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];

  if (setCookieHeaders.length === 0) return response;

  response.headers.delete('Set-Cookie');

  for (const cookie of setCookieHeaders) {
    let enhanced = cookie;

    if (!/;\s*Secure/i.test(enhanced)) {
      enhanced += '; Secure';
    }

    if (!/;\s*SameSite=/i.test(enhanced)) {
      if (
        enhanced.includes('__prerender_bypass') ||
        enhanced.includes('__next_preview_data')
      ) {
        enhanced += '; SameSite=None';
      } else {
        enhanced += '; SameSite=Strict';
      }
    }

    response.headers.append('Set-Cookie', enhanced);
  }

  return response;
}

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

  const response = intlMiddleware(request);
  return enforceSecureCookies(response);
}

export const config = {
  matcher: [
    '/',
    '/(tr|en|ar)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)',
  ],
};
