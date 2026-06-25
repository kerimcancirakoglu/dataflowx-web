import { gql } from '@apollo/client';

// WPGraphQL query for the blog listing page
export const GET_ALL_POSTS = gql`
  query GetAllPosts($language: LanguageCodeFilterEnum!) {
    posts(first: 100, where: { language: $language }) {
      nodes {
        id
        title
        slug
        excerpt
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
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

// WPGraphQL query for generating static paths
export const GET_ALL_POST_SLUGS = gql`
  query GetAllPostSlugs($language: LanguageCodeFilterEnum!, $after: String) {
    posts(first: 100, where: { language: $language }, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
      }
    }
  }
`;

// WPGraphQL query for the single blog detail page
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($id: ID!, $language: LanguageCodeEnum!) {
    post(id: $id, idType: SLUG) {
      translation(language: $language) {
        id
        title
        content
        date
        slug
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
        translations {
          slug
          language {
            code
          }
        }
      }
    }
  }
`;
