'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import styles from './LanguageSwitcher.module.css';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'tr', label: 'TR' },
  { code: 'ar', label: 'AR' }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse current locale from pathname, default to 'en'
  const currentLocale = pathname.split('/')[1] || 'en';
  const activeLocale = locales.find(l => l.code === currentLocale) || locales[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    
    // Replace the current locale in the pathname
    const pathParts = pathname.split('/');
    if (locales.map(l => l.code).includes(pathParts[1])) {
      pathParts[1] = newLocale;
    } else {
      pathParts.splice(1, 0, newLocale);
    }
    
    const newPath = pathParts.join('/') || '/';
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.trigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.label}>{activeLocale.label}</span>
        <svg className={`${styles.chevron} ${isOpen ? styles.open : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {locales.map((locale) => (
            <button
              key={locale.code}
              className={`${styles.option} ${currentLocale === locale.code ? styles.active : ''}`}
              onClick={() => switchLocale(locale.code)}
            >
              {locale.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
