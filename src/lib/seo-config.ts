export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.dataflowx.com';

export function ogLocale(locale: string): string {
  if (locale === 'ar') return 'ar_SA';
  if (locale === 'tr') return 'tr_TR';
  return 'en_US';
}

/** Canonical + hreflang alternates for any static page. */
export function buildAlternates(locale: string, path: string) {
  // path: '/unidirectional-gateway' | '' (homepage)
  const suffix = path ? path : '';
  return {
    canonical: `${SITE_URL}/${locale}${suffix}`,
    languages: {
      en: `${SITE_URL}/en${suffix}`,
      tr: `${SITE_URL}/tr${suffix}`,
      ar: `${SITE_URL}/ar${suffix}`,
      'x-default': `${SITE_URL}/en${suffix}`,
    },
  };
}
