'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

// DEMO-ONLY credential check — no real backend exists yet. Replace with a
// call to a real auth endpoint (e.g. POST /api/auth/login) before shipping.
const DEMO_EMAIL = 'admin';
const DEMO_PASSWORD = 'admin';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [publicProfile, setPublicProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your e-mail and password.');
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        setSuccess(true);
        setTimeout(() => router.push('/'), 700);
      } else {
        setError('Invalid e-mail or password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submit} disabled={loading || success}>
        {success ? 'Success…' : loading ? 'Logging in…' : 'Log In'}
      </button>

      <p className={styles.error}>{error}</p>

      <label className={styles.consent}>
        <input
          type="checkbox"
          checked={publicProfile}
          onChange={(e) => setPublicProfile(e.target.checked)}
        />
        <span>
          Sign up to this site with a public profile.{' '}
          <a href="#">Read more</a>
          <br />
          By signing up, you agree to our <a href="#">Terms of Use</a> and{' '}
          <a href="#">Privacy Policy</a>
        </span>
      </label>
    </form>
  );
}
