'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { weddingConfig } from '@/lib/config';
import { WcBranchRow, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import { FloTop, FloBot, FloCrn, FlorOne, FlorFour, FlorSeven } from '@/components/ui/IlustrationBG';

function FloatingFlower({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div className={className}
      animate={{ y:[0,-8,0], rotate:[-2,2,-2] }}
      transition={{ duration:5+delay, repeat:Infinity, ease:'easeInOut', delay }}>
      {children}
    </motion.div>
  );
}

export function DigitalEnvelope() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [copiedId, setCopied] = useState<string | null>(null);
  if (!weddingConfig.digitalEnvelope.enabled) return null;

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(id); setTimeout(() => setCopied(null), 2000); });
  };

  return (
    <section className="section-pad relative overflow-hidden">

      {/* Corner PNG */}
      <div className="absolute -top-8 -right-8 pointer-events-none opacity-50">
        <FlorOne
          style={{ width: 'clamp(90px, 12vw, 180px)', aspectRatio: '1/1', height: 'auto' }}
          rotate={10}
        />
      </div>

      <div className="max-w-2xl mx-auto relative">
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <motion.span className="text-4xl inline-block"
            animate={{ y:[0,-8,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            💌
          </motion.span>
          <p className="text-xs tracking-[0.35em] uppercase mt-4 mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            Hadiah Digital
          </p>
          <h2 className="text-sage-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.8rem, 7vw, 4.5rem)' }}>
            Amplop Digital
          </h2>
          <div className="flex justify-center mt-3">
            <WcBranchRow width={240} color="var(--sage)" />
          </div>
          <p className="mt-5 text-sm italic leading-relaxed"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', maxWidth: '400px', margin: '1.5rem auto 0' }}>
            Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami.
          </p>
        </motion.div>

        <div className="space-y-4">
          {weddingConfig.digitalEnvelope.accounts.map((acc, i) => (
            <motion.div key={i} className="wc-card p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
              animate={titleInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.8 }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}>
              <div className="absolute top-2 right-2 opacity-20 pointer-events-none">
                <FlorFour
                  style={{ width: 'clamp(24px, 3vw, 40px)', aspectRatio: '1/1', height: 'auto' }}
                  rotate={15}
                />
              </div>
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'var(--sage-pale)', color: 'var(--moss)', fontFamily: 'var(--font-sans)' }}
                    whileHover={{ rotate: [0,-8,8,0], transition: { duration: 0.4 } }}>
                    {acc.bank.slice(0,3)}
                  </motion.div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-0.5"
                      style={{ color: 'var(--sage)', fontFamily: 'var(--font-sans)' }}>{acc.bank}</p>
                    <p className="text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontWeight: 500 }}>
                      {acc.accountNo}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                      a.n. {acc.accountName}
                    </p>
                  </div>
                </div>
                <motion.button onClick={() => copy(acc.accountNo, `${i}`)}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase"
                  style={{
                    border: '1px solid var(--border)',
                    color: copiedId === `${i}` ? 'var(--moss)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    background: copiedId === `${i}` ? 'var(--sage-mist)' : 'transparent',
                  }}>
                  {copiedId === `${i}` ? <><Check className="w-3 h-3" /> Tersalin</> : <><Copy className="w-3 h-3" /> Salin</>}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {weddingConfig.digitalEnvelope.saweria && (
          <motion.div className="mt-6 text-center"
            initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
            <motion.a href={weddingConfig.digitalEnvelope.saweria} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase"
              style={{ border: '1px solid var(--border)', color: 'var(--moss)', fontFamily: 'var(--font-sans)' }}>
              🎁 &nbsp;Kirim via Saweria
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer className="relative overflow-hidden py-20 px-6 text-center"
      style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>

      {/* Corner PNG flowers */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-45">
        <FloatingFlower delay={0}>
          <FloTop style={{ width: 'clamp(80px, 10vw, 160px)', aspectRatio: '1/1', height: 'auto' }} />
        </FloatingFlower>
      </div>
      <div className="absolute top-0 right-0 pointer-events-none opacity-45">
        <FloatingFlower delay={0.8}>
          <FloTop flip style={{ width: 'clamp(80px, 10vw, 160px)', aspectRatio: '1/1', height: 'auto' }} />
        </FloatingFlower>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-40">
        <FloatingFlower delay={1.2}>
          <FloBot style={{ width: 'clamp(70px, 9vw, 140px)', aspectRatio: '1/1', height: 'auto' }} />
        </FloatingFlower>
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-40">
        <FloatingFlower delay={0.4}>
          <FloBot flip style={{ width: 'clamp(70px, 9vw, 140px)', aspectRatio: '1/1', height: 'auto' }} />
        </FloatingFlower>
      </div>

      <motion.div ref={ref} className="relative z-10"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}>

        <motion.div className="flex justify-center mb-6"
          animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
          <FloCrn
            style={{ width: 'clamp(40px, 6vw, 60px)', aspectRatio: '1/1', height: 'auto', margin: '0 auto' }}
            opacity={0.9}
          />
        </motion.div>

        <p className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          Dengan Cinta
        </p>

        <h2 className="text-sage-gradient mb-4"
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.2 }}>
          {weddingConfig.groom.nickname}
          <span className="mx-3 text-3xl italic" style={{ fontFamily: 'var(--font-display)' }}>&</span>
          {weddingConfig.bride.nickname}
        </h2>

        <div className="flex justify-center mb-6">
          <WcBranchRow width={260} color="var(--sage)" />
        </div>

        <p className="text-sm mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          Bagikan momen spesial
        </p>
        <motion.p className="text-2xl mb-10"
          style={{ fontFamily: 'var(--font-script)', color: 'var(--moss)', fontSize: '2rem' }}
          whileHover={{ scale: 1.05 }}>
          {weddingConfig.hashtag}
        </motion.p>

        <p className="text-xs" style={{ color: 'var(--text-light)', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>
          Dibuat dengan ♥ untuk momen yang tak terlupakan
        </p>
      </motion.div>
    </footer>
  );
}
