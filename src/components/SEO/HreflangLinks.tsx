import React from 'react';

interface Props {
  slug: string;
}

export function HreflangLinks({ slug }: Props) {
  const base = 'https://www.dataflowx.com';
  const locales = ['en', 'tr', 'ar'];
  // Handle root vs nested pages smoothly
  const formattedSlug = slug === '' ? '' : `/${slug}`;

  return (
    <>
      {locales.map(l => (
        <link 
          key={l} 
          rel="alternate" 
          hrefLang={l}
          href={`${base}/${l}${formattedSlug}`} 
        />
      ))}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${base}/en${formattedSlug}`} 
      />
    </>
  );
}
