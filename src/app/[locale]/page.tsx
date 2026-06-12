import Nav from '@/components/Nav/Nav';
import Hero from '@/components/Hero/Hero';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import UseCases from '@/components/UseCases/UseCases';
import Solutions from '@/components/Solutions/Solutions';
import Testimonials from '@/components/Testimonials/Testimonials';
import LatestNews from '@/components/LatestNews/LatestNews';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';
import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

export default async function Home() {
  try {
    const { data } = await client.query<any>({
      query: gql`
        query GetGeneralSettings {
          generalSettings {
            title
            description
          }
        }
      `,
    });
    console.log('WPGraphQL Connection Success. Site Title:', data?.generalSettings?.title);
  } catch (error) {
    console.error('WPGraphQL Connection Error:', error);
  }

  return (
    <main>
      <VideoBackground />
      <Nav />
      <Hero />

      {/* Section spacer — 25vh isolation */}
      <div className="section-spacer" aria-hidden="true" />


      <HowItWorks />

      <div className="section-spacer" aria-hidden="true" />

      <UseCases />

      <div className="section-spacer" aria-hidden="true" />

      <Solutions />

      <div className="section-spacer" aria-hidden="true" />

      <Testimonials />

      <div className="section-spacer" aria-hidden="true" />

      <LatestNews />

      <div className="section-spacer" aria-hidden="true" />

      <Contact />
    </main>
  );
}
