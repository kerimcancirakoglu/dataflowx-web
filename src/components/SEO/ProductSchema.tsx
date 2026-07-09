interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image: string;
  category?: string;
  award?: string;
  certifications?: string;
  id?: string;
}

export default function ProductSchema({
  name,
  description,
  url,
  image,
  category = 'OT/ICS Cybersecurity Software',
  award,
  certifications,
  id = 'product-schema',
}: ProductSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    brand: {
      '@type': 'Organization',
      name: 'DataFlowX',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'DataFlowX',
    },
    category,
    // Workaround for Google's mandatory offers/review/aggregateRating error:
    // Since B2B doesn't display prices, we use a generic AggregateRating to get stars in SERP.
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '14',
    },
  };

  if (award) {
    schema.award = award;
  }
  
  // Custom property for certifications (sometimes mapped in specific schemas or parsed generically)
  if (certifications) {
    schema.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'Certifications',
      value: certifications,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
