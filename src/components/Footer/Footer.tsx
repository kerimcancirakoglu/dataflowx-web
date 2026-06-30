import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import styles from './Footer.module.css';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = await getLocale();
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');

  const l = (path: string) => `/${locale}${path}`;

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.topSection}>

          <div className={styles.brandColumn}>
            <Link href={`/${locale}`} className={styles.logo}>
              <Image src="/DataFlowX_Logo_W.png" alt="DataFlowX Logo" width={200} height={60} unoptimized={true} className={styles.logoImage} />
            </Link>
            <p className={styles.brandDescription}>
              {t('description')}
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/company/dataflowx/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{tNav('network_security')}</h3>
            <ul className={styles.linkList}>
              <li><Link href={l('/unidirectional-gateway')}>{tNav('unidirectional_gateway')}</Link></li>
              <li><Link href={l('/secure-remote-access')}>{tNav('secure_remote_access')}</Link></li>
            </ul>
            <h3 className={styles.columnTitle} style={{ marginTop: '1.5rem' }}>{tNav('file_security')}</h3>
            <ul className={styles.linkList}>
              <li><Link href={l('/sandbox')}>{tNav('sandbox')}</Link></li>
              <li><Link href={l('/media-transfer-station')}>{tNav('media_transfer_station')}</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{tNav('email_security')}</h3>
            <ul className={styles.linkList}>
              <li><Link href={l('/email-security-platform')}>{tNav('email_security_platform')}</Link></li>
              <li><Link href={l('/intelroom')}>{tNav('intelroom')}</Link></li>
              <li><Link href={l('/dfx-cdr')}>{tNav('true_cdr')}</Link></li>
            </ul>
            <h3 className={styles.columnTitle} style={{ marginTop: '1.5rem' }}>{tNav('ot_security')}</h3>
            <ul className={styles.linkList}>
              <li><Link href={l('/portx')}>{tNav('portx')}</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{t('company')}</h3>
            <ul className={styles.linkList}>
              <li><Link href={l('/about-us')}>{tNav('about_us')}</Link></li>
              <li><Link href={`/${locale}#partners`}>{tNav('partners')}</Link></li>
              <li><Link href={l('/resources')}>{t('use_cases')}</Link></li>
              <li><Link href={`/${locale}#news`}>{tNav('news')}</Link></li>
              <li><Link href={l('/contact')}>{tNav('contact')}</Link></li>
            </ul>
          </div>

          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{t('legal')}</h3>
            <ul className={styles.linkList}>
              <li><Link href={l('/privacy')}>{t('privacy_policy')}</Link></li>
              <li><Link href={l('/gdpr')}>{t('gdpr')}</Link></li>
              <li><Link href={l('/cookie-policy')}>{t('cookie_policy')}</Link></li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            &copy; {currentYear} DataFlowX. {t('all_rights_reserved')}
          </div>
        </div>
      </div>
    </footer>
  );
}
