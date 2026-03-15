import OpeningGate    from '@/components/sections/OpeningGate';
import HeroSection    from '@/components/sections/HeroSection';
import OpeningSection from '@/components/sections/OpeningSection';
import CoupleStory    from '@/components/sections/CoupleStory';
import EventDetails   from '@/components/sections/EventDetails';
import { Gallery }    from '@/components/sections/Gallery';
import RSVPForm       from '@/components/sections/RSVPForm';
import Wishes         from '@/components/sections/Wishes';
import { DigitalEnvelope, Footer } from '@/components/sections/DigitalEnvelopeAndFooter';
import { Navbar, MusicPlayer, PetalAnimation } from '@/components/ui/UIComponents';

export default function HomePage() {
  return (
    <div style={{ overflowX: 'clip', maxWidth: '100vw', position: 'relative' }}>
      <OpeningGate />
      <div id="navbar-wrapper" style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 1.4s ease' }}>
        <Navbar />
      </div>
      <div id="main-content">
        <PetalAnimation />
        <main>
          <HeroSection />
          <OpeningSection />
          <CoupleStory />
          <EventDetails />
          <Gallery />
          <RSVPForm />
          <Wishes />
          <DigitalEnvelope />
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </div>
  );
}