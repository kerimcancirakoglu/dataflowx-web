import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

const TYPE_TO_PATHS: Record<string, string[]> = {
  blogPost:  ['/[locale]/resources/blog', '/[locale]/resources/blog/[slug]'],
  news:      ['/[locale]/news',            '/[locale]/news/[slug]'],
  resource:  ['/[locale]/resources'],
  author:    ['/[locale]/resources/blog'],
  category:  ['/[locale]/resources/blog', '/[locale]/news'],
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    if (secret) {
      const auth = req.headers.get('authorization');
      if (auth !== `Bearer ${secret}`) {
        return new Response('Unauthorized', { status: 401 });
      }
    }

    const body = await req.json() as { _type?: string };
    if (!body?._type) {
      return new Response('Bad Request: missing _type', { status: 400 });
    }

    const paths = TYPE_TO_PATHS[body._type] || ['/'];
    paths.forEach(path => revalidatePath(path, 'page'));

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      paths,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[revalidate]', message);
    return new Response(message, { status: 500 });
  }
}
