'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '@/lib/config';
import { WcFlower } from '@/components/ui/WatercolorOrnaments';

// ── Navbar ──────────────────────────────────────────────────────
const links = [
  { href: '#story',   label: 'Kisah' },
  { href: '#event',   label: 'Acara' },
  { href: '#gallery', label: 'Galeri' },
  { href: '#rsvp',    label: 'RSVP' },
  { href: '#wishes',  label: 'Ucapan' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(248,246,240,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
      initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <motion.button onClick={() => scrollTo('#hero')}
          className="text-lg leading-none"
          style={{ fontFamily: 'var(--font-script)', color: 'var(--moss-dark)' }}
          whileHover={{ scale: 1.04 }}>
          {weddingConfig.groom.nickname} & {weddingConfig.bride.nickname}
        </motion.button>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <motion.button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-xs tracking-[0.15em] uppercase relative"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
              whileHover={{ color: 'var(--moss)' } as any}>
              {l.label}
              <motion.span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full"
                style={{ background: 'var(--sage)' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setOpen(!open)}>
          {[0,1,2].map((i) => (
            <motion.span key={i} className="block w-5 h-px"
              style={{ background: 'var(--moss)' }}
              animate={open
                ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 6 } : { rotate: -45, y: -6 }
                : { rotate: 0, y: 0, opacity: 1 }}
            />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(248,246,240,0.95)', backdropFilter: 'blur(16px)' }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-xs tracking-[0.15em] uppercase py-2 border-b"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}


// ── Music Player ─────────────────────────────────────────────────
export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted]       = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true; audio.volume = 0.35;
    const tryPlay = () => { audio.play().then(() => setPlaying(true)).catch(() => {}); document.removeEventListener('click', tryPlay); };
    document.addEventListener('click', tryPlay);
    return () => document.removeEventListener('click', tryPlay);
  }, []);

  const togglePlay = () => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };
  const toggleMute = () => { if (!audioRef.current) return; audioRef.current.muted = !muted; setMuted(!muted); };

  return (
    <>
      <audio ref={audioRef} src={weddingConfig.music.src} preload="metadata" />
      <motion.div className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: 'spring', stiffness: 150 }}>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.85 }} transition={{ duration: 0.3 }}
              className="wc-card mb-3 p-4 flex items-center gap-3" style={{ minWidth: 200 }}>
              <motion.div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--sage-pale)' }}
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                <WcFlower size={18} color="var(--sage)" opacity={1} />
              </motion.div>
              <p className="flex-1 text-xs truncate" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>
                {weddingConfig.music.title}
              </p>
              <button onClick={toggleMute} style={{ color: 'var(--sage)' }}>
                {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => { setExpanded(!expanded); togglePlay(); }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative"
          style={{ background: 'var(--moss)' }}>
          {playing && (
            <motion.div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: 'var(--moss)', opacity: 0.4 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
          <span className="relative z-10 text-white">
            {playing ? <Pause className="w-5 h-5" /> : <Music className="w-5 h-5" />}
          </span>
        </motion.button>
      </motion.div>
    </>
  );
}


// ── Petal Animation ──────────────────────────────────────────────
export function PetalAnimation() {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left:     Math.random() * 100,
      delay:    Math.random() * 14,
      duration: Math.random() * 10 + 10,
      size:     Math.random() * 12 + 10,
      drift:    Math.random() * 70 - 35,
    })));
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" style={{ width: '100vw', maxWidth: '100vw' }}>
      {petals.map((p) => (
        <div key={p.id} className="absolute"
          style={{
            left: `${p.left}%`, top: `-${p.size * 2}px`,
            width: p.size, height: p.size * 1.4,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
          }}>
          {/* Kelopak bunga watercolor — oval soft */}
          <svg viewBox="0 0 20 28" fill="none" className="w-full h-full">
            <path d="M10 1 C15 5 18 10 16 16 C14 22 12 26 10 27 C8 26 6 22 4 16 C2 10 5 5 10 1 Z"
              fill="var(--sage-light)" fillOpacity="0.45"
              style={{ filter: 'blur(0.5px)' }}/>
            <path d="M10 2 L10 27" stroke="var(--sage)" strokeWidth="0.4" opacity="0.4"/>
          </svg>
        </div>
      ))}
    </div>
  );
}