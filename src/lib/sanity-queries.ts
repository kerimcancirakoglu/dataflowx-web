import { groq } from 'next-sanity';

// Blog Yazıları (Post)
export const GET_ALL_POSTS_QUERY = groq`
  *[_type == "blogPost" && language == $language] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    "author": author->{name, "image": image.asset->url},
    "featuredImage": featuredImage.asset->url,
    "categories": categories[]->{name, "slug": slug.current},
    language,
    translationId
  }
`;

export const GET_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    excerpt,
    date,
    _updatedAt,
    "author": author->{name, "image": image.asset->url},
    "featuredImage": featuredImage.asset->url,
    "categories": categories[]->{name, "slug": slug.current},
    seo,
    language,
    translationId,
    "translations": *[_type == "blogPost" && translationId == ^.translationId && _id != ^._id] {
      language,
      "slug": slug.current
    }
  }
`;

export const GET_ALL_POST_SLUGS_QUERY = groq`
  *[_type == "blogPost"] {
    "slug": slug.current,
    language
  }
`;

// Haberler (News)
export const GET_ALL_NEWS_QUERY = groq`
  *[_type == "news" && language == $language] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    sourceUrl,
    date,
    "featuredImage": featuredImage.asset->url,
    "categories": categories[]->{name, "slug": slug.current},
    language
  }
`;

export const GET_NEWS_BY_SLUG_QUERY = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    content,
    excerpt,
    sourceUrl,
    date,
    _updatedAt,
    "featuredImage": featuredImage.asset->url,
    "categories": categories[]->{name, "slug": slug.current},
    seo,
    language
  }
`;

// Kaynaklar (Resources: Whitepaper, Datasheet vs.)
export const GET_ALL_RESOURCES_QUERY = groq`
  *[_type == "resource" && language == $language] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "fileUrl": file.asset->url,
    externalLink,
    date,
    language
  }
`;
