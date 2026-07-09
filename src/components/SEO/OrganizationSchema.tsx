import Script from 'next/script';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DataFlowX',
  url: 'https://www.dataflowx.com',
  logo: 'https://www.dataflowx.com/logo.png',
  description: 'DataFlowX develops hardware-enforced unidirectional gateway and data diode solutions for critical infrastructure cybersecurity.',
  foundingDate: '2015',
  foundingLocation: {
    '@type': 'Place',
    addressCountry: 'TR',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Hacettepe Teknokent',
    addressLocality: 'Ankara',
    addressCountry: 'TR',
  },
  areaServed: ['TR', 'AE', 'SA', 'QA', 'GB', 'US'],
  sameAs: [
    'https://www.linkedin.com/company/dataflowx',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'TechnicalSupport',
      email: 'support@dataflowx.com',
      availableLanguage: ['English', 'Turkish'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'sales@dataflowx.com',
      availableLanguage: ['English', 'Turkish', 'Arabic'],
    }
  ],
};

export default function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}
