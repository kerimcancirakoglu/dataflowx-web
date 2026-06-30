import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Sanity'den alacağımız secret (.env.local içinde tanımlanacak)
const secret = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 });
    }

    // Gelen içeriğin tipine göre Next.js cache tag'ini temizle
    // Örneğin "blogPost" güncellenirse, "blogPost" tag'ini kullanan fetch istekleri temizlenir.
    revalidateTag(body._type);

    return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
