export function localeToWPLanguage(locale: string): string {
  const map: Record<string, string> = {
    tr: 'TR',
    en: 'EN',
    ar: 'AR',
  };
  return map[locale] ?? 'EN'; // Default to EN or TR as preferred
}
