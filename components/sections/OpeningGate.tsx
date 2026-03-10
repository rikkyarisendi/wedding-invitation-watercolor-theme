'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/lib/config';
import { WcBlob, WcLeaf, WcBranchRow, WcFlower } from '@/components/ui/WatercolorOrnaments';

export default function OpeningGate() {
  const [phase, setPhase] = useState<'idle' | 'closing' | 'opening' | 'gone'>('idle');

  const handleClick = () => {
    setPhase('closing');
    setTimeout(() => setPhase('opening'), 450);
    setTimeout(() => {
      setPhase('gone');
      const main = document.getElementById('main-content');
      if (main) { main.style.opacity = '1'; main.style.pointerEvents = 'auto'; }
    }, 450 + 1500);
  };

  const isContentVisible = phase === 'idle';
  const doorsOpen        = phase === 'opening' || phase === 'gone';

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div className="fixed inset-0 z-[9999] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.7 } }}>

          {/* ── Left door panel ── */}
          <motion.div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
            style={{ background: 'var(--bg)', transformOrigin: 'left center' }}
            animate={doorsOpen ? { x: '-102%', transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] } } : {}}
          >
            {/* Watercolor wash background */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--sage-mist) 0%, var(--bg) 60%, var(--sage-pale) 100%)' }}/>
            {/* Blob backgrounds */}
            <div className="absolute -top-20 -left-20 pointer-events-none">
              <WcBlob size={380} color="var(--sage-pale)" opacity={0.5} rotate={-20} />
            </div>
            <div className="absolute -bottom-10 left-10 pointer-events-none">
              <WcBlob size={280} color="var(--petal)" opacity={0.35} rotate={40} />
            </div>
            {/* Corner leaves */}
            <div className="absolute top-8 left-8 pointer-events-none">
              <WcLeaf size={55} color="var(--sage)" opacity={0.35} rotate={-40} />
            </div>
            <div className="absolute bottom-16 right-6 pointer-events-none">
              <WcLeaf size={45} color="var(--moss)" opacity={0.25} rotate={20} />
            </div>
            {/* Overlay gelap saat idle */}
            <motion.div className="absolute inset-0"
              style={{ background: 'rgba(44,62,45,0.28)' }}
              animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* ── Right door panel ── */}
          <motion.div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
            style={{ background: 'var(--bg)', transformOrigin: 'right center' }}
            animate={doorsOpen ? { x: '102%', transition: { duration: 1.3, ease: [0.76, 0, 0.24, 1] } } : {}}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg, var(--sage-mist) 0%, var(--bg) 60%, var(--sage-pale) 100%)' }}/>
            <div className="absolute -top-20 -right-20 pointer-events-none">
              <WcBlob size={380} color="var(--petal)" opacity={0.45} rotate={30} />
            </div>
            <div className="absolute -bottom-10 right-10 pointer-events-none">
              <WcBlob size={260} color="var(--sage-pale)" opacity={0.4} rotate={-15} />
            </div>
            <div className="absolute top-8 right-8 pointer-events-none">
              <WcLeaf size={55} color="var(--sage)" opacity={0.35} rotate={40} />
            </div>
            <div className="absolute bottom-16 left-6 pointer-events-none">
              <WcLeaf size={45} color="var(--moss)" opacity={0.25} rotate={-20} />
            </div>
            <motion.div className="absolute inset-0"
              style={{ background: 'rgba(44,62,45,0.28)' }}
              animate={phase === 'opening' ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* ── Center content ── */}
          <AnimatePresence>
            {isContentVisible && (
              <motion.div key="gate-content"
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.35, ease: 'easeIn' } }}
              >
                <div className="text-center px-6 max-w-sm pointer-events-auto relative">

                  {/* Watercolor circle frame behind text */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10 scale-150 pointer-events-none">
                    <WcBlob size={320} color="var(--cream)" opacity={0.85} />
                  </div>

                  {/* Top flower */}
                  <motion.div className="flex justify-center mb-4"
                    initial={{ opacity: 0, scale: 0.5, y: -12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 120 }}
                  >
                    <WcFlower size={52} color="var(--sage)" opacity={0.8} />
                  </motion.div>

                  {/* Eyebrow */}
                  <motion.p className="text-xs tracking-[0.35em] uppercase mb-5"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Undangan Pernikahan
                  </motion.p>

                  {/* Branch divider top */}
                  <motion.div className="flex justify-center mb-5"
                    initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.9 }}
                  >
                    <WcBranchRow width={220} color="var(--sage)" />
                  </motion.div>

                  {/* Groom name */}
                  <motion.h1
                    className="leading-tight mb-1"
                    style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem, 10vw, 4.5rem)', color: 'var(--moss-dark)' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {weddingConfig.groom.nickname}
                  </motion.h1>

                  {/* & separator */}
                  <motion.p className="text-2xl my-1 italic"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--sage)' }}
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.95, duration: 0.6, type: 'spring' }}
                  >
                    &amp;
                  </motion.p>

                  {/* Bride name */}
                  <motion.h1
                    className="leading-tight mb-5"
                    style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem, 10vw, 4.5rem)', color: 'var(--moss-dark)' }}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {weddingConfig.bride.nickname}
                  </motion.h1>

                  {/* Branch divider bottom */}
                  <motion.div className="flex justify-center mb-7"
                    initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.25, duration: 0.9 }}
                  >
                    <WcBranchRow width={220} color="var(--sage)" />
                  </motion.div>

                  {/* CTA button */}
                  <motion.button
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.45, duration: 0.7 }}
                    whileHover={{ scale: 1.04, boxShadow: '0 6px 28px rgba(74,124,89,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClick}
                    className="relative px-10 py-3 text-xs tracking-[0.3em] uppercase overflow-hidden rounded-full"
                    style={{ background: 'var(--moss)', color: 'white', fontFamily: 'var(--font-sans)' }}
                  >
                    <motion.span className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--moss-dark)' }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative z-10">Buka Undangan</span>
                  </motion.button>

                  {/* Guest note */}
                  <motion.p className="mt-5 text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.65 }}
                  >
                    Kepada Yth. Bapak / Ibu / Saudara/i
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
