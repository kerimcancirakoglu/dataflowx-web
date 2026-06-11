// src/lib/antigravity.ts

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
  console.warn('[Antigravity] NEXT_PUBLIC_WORDPRESS_API_URL is not set. Blog data will be empty.');
}

// Core fetch helper — ISR caches results for 1 hour server-side
async function fetchAntigravityAPI(query: string, variables: Record<string, any> = {}) {
  if (!API_URL) return null;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // ISR: Next.js reuses this response for 1 hour before re-fetching
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`[Antigravity] HTTP ${res.status} from WordPress API`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`[Antigravity] GraphQL error: ${json.errors[0]?.message}`);
  }

  return json.data;
}

// ── 1. Fetch all posts for the listing page ─────────
export async function getAntigravityPosts() {
  const data = await fetchAntigravityAPI(`
    query GetAllPosts {
      posts(first: 50, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }) {
        nodes {
          title
          slug
          excerpt
          date
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `);
  return data?.posts?.nodes ?? [];
}

// ── 2. Fetch a single post by slug for the detail page ─
export async function getAntigravityPostBySlug(slug: string) {
  const data = await fetchAntigravityAPI(
    `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        excerpt
        date
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          metaDesc
          title
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `,
    { id: slug }
  );
  return data?.post ?? null;
}
