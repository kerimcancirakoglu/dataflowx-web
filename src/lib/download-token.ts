const TTL_MS = 10 * 60 * 1000; // 10 minutes

function toB64Url(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromB64Url(s: string): string {
  const pad = (4 - (s.length % 4)) % 4;
  return atob(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad));
}

async function importKey(secret: string, usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usage
  );
}

export async function generateDownloadToken(fileUrl: string, secret: string): Promise<string> {
  const payload = toB64Url(JSON.stringify({ url: fileUrl, exp: Date.now() + TTL_MS }));
  const key = await importKey(secret, ['sign']);
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const sig = toB64Url(String.fromCharCode(...new Uint8Array(sigBuf)));
  return `${payload}.${sig}`;
}

export async function verifyDownloadToken(token: string, secret: string): Promise<string | null> {
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;

  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  try {
    const key = await importKey(secret, ['verify']);
    const sigBytes = Uint8Array.from(fromB64Url(sig), (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload));
    if (!valid) return null;

    const { url, exp } = JSON.parse(fromB64Url(payload));
    if (Date.now() > exp) return null;
    if (!url.startsWith('https://cdn.sanity.io/')) return null;

    return url as string;
  } catch {
    return null;
  }
}
