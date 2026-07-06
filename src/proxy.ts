import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

/**
 * Ensures all Set-Cookie headers on the outgoing response include
 * Secure and SameSite flags when not already present.
 *
 * Note: __prerender_bypass (Draft Mode) must be SameSite=None to work
 * inside the Sanity Studio iframe (cross-origin). All other cookies
 * get SameSite=Strict.
 */
function enforceSecureCookies(response: NextResponse): NextResponse {
  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];

  if (setCookieHeaders.length === 0) return response;

  response.headers.delete('Set-Cookie');

  for (const cookie of setCookieHeaders) {
    let enhanced = cookie;

    // Add Secure flag if missing
    if (!/;\s*Secure/i.test(enhanced)) {
      enhanced += '; Secure';
    }

    // Add SameSite if missing
    if (!/;\s*SameSite=/i.test(enhanced)) {
      // Draft Mode bypass cookies need SameSite=None for cross-origin Sanity Studio iframe
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

export function proxy(request: NextRequest) {
  // HTTP → HTTPS redirect (Cloudflare "Always Use HTTPS" da açık olmalı)
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
