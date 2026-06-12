import { gql } from '@apollo/client';

// WPGraphQL query for the blog listing page
export const GET_ALL_POSTS = gql`
  query GetAllPosts($language: LanguageCodeFilterEnum!) {
    posts(where: { language: $language }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        author {
          node {
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
          readingTime
        }
      }
    }
  }
`;

// WPGraphQL query for generating static paths
export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs {
    posts(first: 100) {
      nodes {
        slug
        language {
          code
        }
      }
    }
  }
`;

// WPGraphQL query for the single blog detail page
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($id: ID!, $idType: PostIdType = SLUG) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      date
      author {
        node {
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
        title
        metaDesc
        readingTime
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;
