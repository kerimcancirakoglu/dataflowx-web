import { groq } from 'next-sanity';

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    hero {
      slides[] {
        titlePrefix,
        titleHighlight,
        description,
        buttonText,
        buttonLink,
        features[] { text }
      }
    },
    seoTitle,
    seoDescription,
    _id,
    _type
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    defaultSeoDescription,
    contactEmail,
    linkedinUrl,
    twitterUrl,
    youtubeUrl
  }
`;

export const productPageQuery = groq`
  *[_type == "productPage" && slug.current == $slug][0] {
    _id,
    _type,
    productName,
    "slug": slug.current,
    hero {
      overTitle,
      title,
      titleHighlight,
      subtitle,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink
    },
    overview {
      overTitle,
      title,
      description,
      infoBlocks[] { label, title, text }
    },
    features {
      overTitle,
      title,
      titleHighlight,
      description,
      items[] { title, description }
    },
    seoTitle,
    seoDescription
  }
`;
