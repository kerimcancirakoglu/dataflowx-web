import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { previewClient } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    previewClient,
    request.url
  );

  if (!isValid) {
    return new Response('Invalid token', { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();
  redirect(redirectTo);
}
