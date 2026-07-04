export interface WPRestPost {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

export async function getPosts(categorySlug: string = 'news-dfx', locale: string = 'tr'): Promise<WPRestPost[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL || '';
  
  try {
    // 1. Fetch category ID from slug
    const catEndpoint = `${wpUrl}/wp-json/wp/v2/categories?slug=${encodeURIComponent(categorySlug)}&lang=${locale}`;
    const catRes = await fetch(catEndpoint, { next: { revalidate: 3600 } });
    if (!catRes.ok) throw new Error(`Failed to fetch category: ${catRes.statusText}`);
    
    const categories = await catRes.json();
    if (categories.length === 0) {
      console.warn(`Category with slug '${categorySlug}' not found.`);
      return [];
    }
    const categoryId = categories[0].id;

    // 2. Fetch posts belonging to that category ID
    const endpoint = `${wpUrl}/wp-json/wp/v2/posts?_embed&per_page=100&categories=${categoryId}&lang=${locale}`;
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch WP posts: ${res.statusText}`);
    }

    const posts: WPRestPost[] = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching from WP REST API:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, locale: string = 'tr'): Promise<WPRestPost | null> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL || '';
  const endpoint = `${wpUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed&lang=${locale}`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Failed to fetch WP post: ${res.statusText}`);
    }
    const posts: WPRestPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post by slug from WP REST API:', error);
    return null;
  }
}

export interface WPRestResource extends WPRestPost {
  acf?: {
    file_url?: string;
  };
}

export async function getResources(locale: string = 'en'): Promise<WPRestResource[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL || '';
  const endpoint = `${wpUrl}/wp-json/wp/v2/resource?_embed&per_page=100&lang=${locale}`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) {
      if (res.status === 404 || res.status === 400) {
        // CPT might not exist yet
        return [];
      }
      throw new Error(`Failed to fetch WP resources: ${res.statusText}`);
    }

    const resources: WPRestResource[] = await res.json();
    return resources;
  } catch (error) {
    console.warn('Error fetching resources from WP REST API (it may not be configured yet):', error);
    return [];
  }
}

