import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineDocuments } from 'sanity/presentation';
import { schema } from './src/sanity/schemaTypes';

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.dataflowx.com';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '15oto8dp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'DataFlowX Studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('DataFlowX İçerik Yönetimi')
          .items([
            S.listItem()
              .title('🏠 Anasayfa')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('⚙️ Site Ayarları')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('📝 Blog Yazıları')
              .child(S.documentTypeList('blogPost').title('Blog Yazıları')),
            S.listItem()
              .title('📰 Haberler')
              .child(S.documentTypeList('news').title('Haberler')),
            S.listItem()
              .title('📁 Kaynaklar (PDF)')
              .child(S.documentTypeList('resource').title('Kaynaklar')),
            S.divider(),
            S.listItem()
              .title('🛡️ Ürün Sayfaları')
              .child(
                S.list()
                  .title('Ürün Sayfaları')
                  .items([
                    S.listItem()
                      .title('Unidirectional Gateway')
                      .child(S.document().schemaType('productPage').documentId('product-unidirectional-gateway')),
                    S.listItem()
                      .title('PortX — Portable Access')
                      .child(S.document().schemaType('productPage').documentId('product-portx')),
                    S.listItem()
                      .title('Sandbox — Malware Mitigation')
                      .child(S.document().schemaType('productPage').documentId('product-sandbox')),
                    S.listItem()
                      .title('DFX CDR — Content Disarm')
                      .child(S.document().schemaType('productPage').documentId('product-dfx-cdr')),
                    S.listItem()
                      .title('Email Security Platform')
                      .child(S.document().schemaType('productPage').documentId('product-email-security-platform')),
                    S.listItem()
                      .title('Secure Remote Access')
                      .child(S.document().schemaType('productPage').documentId('product-secure-remote-access')),
                    S.listItem()
                      .title('Media Transfer Station')
                      .child(S.document().schemaType('productPage').documentId('product-media-transfer-station')),
                    S.listItem()
                      .title('IntelRoom')
                      .child(S.document().schemaType('productPage').documentId('product-intelroom')),
                  ])
              ),
          ]),
    }),
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/:locale',
            filter: `_type == "homePage" && _id == "homePage"`,
          },
          {
            route: '/:locale/unidirectional-gateway',
            filter: `_type == "productPage" && _id == "product-unidirectional-gateway"`,
          },
          {
            route: '/:locale/portx',
            filter: `_type == "productPage" && _id == "product-portx"`,
          },
          {
            route: '/:locale/sandbox',
            filter: `_type == "productPage" && _id == "product-sandbox"`,
          },
          {
            route: '/:locale/dfx-cdr',
            filter: `_type == "productPage" && _id == "product-dfx-cdr"`,
          },
          {
            route: '/:locale/email-security-platform',
            filter: `_type == "productPage" && _id == "product-email-security-platform"`,
          },
          {
            route: '/:locale/secure-remote-access',
            filter: `_type == "productPage" && _id == "product-secure-remote-access"`,
          },
          {
            route: '/:locale/media-transfer-station',
            filter: `_type == "productPage" && _id == "product-media-transfer-station"`,
          },
          {
            route: '/:locale/intelroom',
            filter: `_type == "productPage" && _id == "product-intelroom"`,
          },
        ]),
      },
      previewUrl: {
        origin: SITE_URL,
        preview: '/',
        draftMode: {
          enable: `${SITE_URL}/api/draft-mode/enable`,
        },
      },
    }),
  ],

  schema: {
    types: schema.types,
  },
});
