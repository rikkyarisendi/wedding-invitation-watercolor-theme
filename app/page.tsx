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
    <>
      <OpeningGate />
      <div id="main-content">
        <Navbar />
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
    </>
  );
}
