import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  // Security check — must match MY_SECRET_TOKEN in .env.local
  if (!secret || secret !== process.env.MY_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Revalidate blog listing and all dynamic post pages
    revalidatePath('/resources/blog');
    revalidatePath('/resources/blog/[slug]', 'page');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }
}
