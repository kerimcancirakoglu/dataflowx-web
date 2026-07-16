import type { Metadata } from 'next';
import Image from 'next/image';
import LoginForm from './LoginForm';
import AnimatedX from './AnimatedX';
import styles from './login.module.css';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Sign in to your DataFlowX account.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className={styles.wrapper}>
      {/* Background */}
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.glow} ${styles.glowAmberTL}`} />
        <span className={`${styles.glow} ${styles.glowWhiteTR}`} />
        <span className={`${styles.glow} ${styles.glowGrayBL}`} />
        <span className={styles.glowAmberTop} />
        <span className={styles.glowAmberMid} />
        <AnimatedX />
        <div className={styles.vignette} />
      </div>

      {/* Login card */}
      <div className={styles.content}>
        <h1 className={styles.title}>Log in</h1>
        <LoginForm />
      </div>

      {/* Brand footer */}
      <div className={styles.brand}>
        <Image
          className={styles.brandLogo}
          src="/DataFlowX_Logo_W.png"
          alt="DataFlowX"
          width={520}
          height={118}
          priority
        />
        <span className={styles.tagline}>Zero Trust. Zero Tolerance.</span>
      </div>
    </main>
  );
}
