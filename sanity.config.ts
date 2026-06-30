import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '15oto8dp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'DataFlowX Studio',

  plugins: [structureTool()],
  
  schema: {
    types: schema.types,
  },
});
