import { type SchemaTypeDefinition } from 'sanity';
import seo from './seo';
import category from './category';
import author from './author';
import blogPost from './blogPost';
import news from './news';
import resource from './resource';
import homePage from './homePage';
import siteSettings from './siteSettings';
import productPage from './productPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    seo,
    category,
    author,
    blogPost,
    news,
    resource,
    homePage,
    siteSettings,
    productPage,
  ],
};
