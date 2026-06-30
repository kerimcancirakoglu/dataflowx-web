'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import styles from './Nav.module.css';
import React, { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export interface SubmenuItem {
  label: string;
  href: string;
}

export interface SubmenuGroup {
  groupLabel: string;
  items: SubmenuItem[];
}

export interface NavLink {
  label: string;
  href: string;
  submenu?: SubmenuItem[];
  megaMenu?: SubmenuGroup[];
}

interface NavProps {
  logoSrc?: string;
  hideMenu?: boolean;
  navLinks: NavLink[];
  contactLabel: string;
}

function localise(locale: string, href: string): string {
  if (href.startsWith('#') || href.startsWith('http')) return href;
  return `/${locale}${href}`;
}

export default function NavClient({ logoSrc = "/DataFlowX_Logo_W.png", hideMenu = false, navLinks, contactLabel }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    setTheme('dark');
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation" dir="ltr">
      {/* Logo */}
      <Link
        href={`/${locale}`}
        className={styles.logo}
        aria-label="DataFlowX – Ana sayfa"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Image
          src={logoSrc === '/Intelroombeyaz.png' ? '/Intelroombeyaz.png' : (theme === 'light' ? '/DataFlowX_Logo.png' : logoSrc)}
          alt="DataFlowX Logo"
          width={200}
          height={60}
          unoptimized={true}
          className={`${styles.logoImage} ${logoSrc === '/Intelroombeyaz.png' ? (theme === 'light' ? styles.intelRoomLogoLight : styles.intelRoomLogo) : ''}`}
        />
      </Link>

      {/* Center Floating Pill Navigation (Desktop) */}
      <div className={styles.pill}>
        <ul className={styles.links} role="list">
          {navLinks.map((link) => {
            const hasChildren = link.submenu || link.megaMenu;
            return (
              <li
                key={link.label}
                className={`${styles.navItem} ${hasChildren ? styles.hasDropdown : ''}`}
                onMouseEnter={() => hasChildren && setActiveDropdown(link.label)}
                onMouseLeave={() => hasChildren && setActiveDropdown(null)}
              >
                {hasChildren ? (
                  <>
                    <button
                      className={styles.link}
                      aria-expanded={activeDropdown === link.label}
                      aria-haspopup="true"
                      onClick={() => toggleDropdown(link.label)}
                    >
                      {link.label}
                      <svg className={styles.arrow} width="8" height="5" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Render Mega Menu */}
                    {link.megaMenu && (
                      <div className={`${styles.megaMenuDropdown} ${activeDropdown === link.label ? styles.dropdownOpen : ''}`}>
                        {link.megaMenu.map((group) => (
                          <div key={group.groupLabel}>
                            <div className={styles.megaMenuGroupTitle}>{group.groupLabel}</div>
                            <ul className={styles.megaMenuLinks}>
                              {group.items.map((sub) => (
                                <li key={sub.href}>
                                  <Link href={localise(locale, sub.href)} className={styles.dropdownLink}>
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Render Standard Submenu */}
                    {link.submenu && (
                      <ul className={`${styles.dropdown} ${activeDropdown === link.label ? styles.dropdownOpen : ''}`} role="list">
                        {link.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link href={localise(locale, sub.href)} className={styles.dropdownLink}>
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={localise(locale, link.href)} className={styles.link}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right Actions */}
      <div className={styles.rightActions}>
        <LanguageSwitcher />
        <Link href={`/${locale}/contact`} className={styles.ctaButton}>
          {contactLabel}
        </Link>
      </div>

      {/* Hamburger Toggle (Mobile) */}
      <button
        className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>

      {/* Mobile Fullscreen Overlay */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks} role="list">
          {navLinks.map((link) => {
            const hasChildren = link.submenu || link.megaMenu;
            return (
              <li key={link.label} className={styles.mobileNavItem}>
                {hasChildren ? (
                  <div className={styles.mobileDropdownContainer}>
                    <button
                      className={styles.mobileLink}
                      onClick={() => toggleDropdown(link.label)}
                      aria-expanded={activeDropdown === link.label}
                    >
                      {link.label}
                      <svg className={`${styles.mobileArrow} ${activeDropdown === link.label ? styles.arrowRotated : ''}`} width="10" height="6" viewBox="0 0 8 5" fill="none">
                        <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <ul className={`${styles.mobileSubmenu} ${activeDropdown === link.label ? styles.mobileSubmenuOpen : ''}`}>

                      {/* Mobile Mega Menu Groups */}
                      {link.megaMenu && link.megaMenu.map((group) => (
                        <React.Fragment key={group.groupLabel}>
                          <li className={styles.mobileGroupTitle}>{group.groupLabel}</li>
                          {group.items.map((sub) => (
                            <li key={sub.href}>
                              <Link href={localise(locale, sub.href)} className={styles.mobileSubLink} onClick={() => setMobileMenuOpen(false)}>
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </React.Fragment>
                      ))}

                      {/* Mobile Standard Submenu */}
                      {link.submenu && link.submenu.map((sub) => (
                        <li key={sub.href}>
                          <Link href={localise(locale, sub.href)} className={styles.mobileSubLink} onClick={() => setMobileMenuOpen(false)}>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link href={localise(locale, link.href)} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
          <li className={styles.mobileNavItem} style={{ marginTop: '20px' }}>
            <a href="#contact" className={styles.mobileCtaButton} onClick={() => setMobileMenuOpen(false)}>
              {contactLabel}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
