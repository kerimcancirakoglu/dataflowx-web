import Nav from '@/components/Nav/Nav';
import AboutUs from '@/components/AboutUs/AboutUs';
import Contact from '@/components/Contact/Contact';
import VideoBackground from '@/components/VideoBackground/VideoBackground';

export const metadata = {
  title: 'About Us | DataFlowX',
  description: 'DataFlowX is a cybersecurity company focused on securing critical infrastructures and enabling safe, controlled data flow between IT and OT environments.',
};

export default function AboutUsPage() {
  return (
    <main>
      <VideoBackground />
      <Nav />
      
      {/* Spacer to push content below the fixed navigation */}
      <div style={{ paddingTop: '80px' }}>
        <AboutUs />
      </div>

      <div className="section-spacer" aria-hidden="true" />
      <Contact />
    </main>
  );
}
