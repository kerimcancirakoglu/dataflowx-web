import { NextResponse } from 'next/server';
import { verifyDownloadToken } from '@/lib/download-token';

function sanitizeFilename(raw: string): string {
  return raw.replace(/[^\w\s\-\.]/g, '').trim().slice(0, 100) || 'document';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const name = searchParams.get('name') ?? 'document';

  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }

  const secret = process.env.DOWNLOAD_SECRET;
  if (!secret) {
    console.error('[download] DOWNLOAD_SECRET is not configured');
    return new NextResponse('Server configuration error', { status: 500 });
  }

  const fileUrl = await verifyDownloadToken(token, secret);
  if (!fileUrl) {
    return new NextResponse('Invalid or expired download link. Please fill the form again.', {
      status: 403,
    });
  }

  const upstream = await fetch(fileUrl, {
    headers: { 'User-Agent': 'DataFlowX-Download-Proxy/1.0' },
  });

  if (!upstream.ok) {
    console.error(`[download] Upstream fetch failed: ${upstream.status} for ${fileUrl}`);
    return new NextResponse('File temporarily unavailable', { status: 502 });
  }

  const filename = `${sanitizeFilename(name)}.pdf`;
  const headers: Record<string, string> = {
    'Content-Type': upstream.headers.get('Content-Type') ?? 'application/pdf',
    'Content-Disposition': `attachment; filename="${filename}"`,
    'Cache-Control': 'no-store, no-cache',
  };

  const contentLength = upstream.headers.get('Content-Length');
  if (contentLength) headers['Content-Length'] = contentLength;

  return new NextResponse(upstream.body, { headers });
}
