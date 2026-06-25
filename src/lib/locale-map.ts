export function localeToWPLanguage(locale: string): string {
  // Currently, all posts in WP Engine are in English.
  // To prevent the Turkish/Arabic sites from returning empty results and falling back to mock posts (which have brochure images),
  // we always request the 'EN' language posts.
  return 'EN';
}
