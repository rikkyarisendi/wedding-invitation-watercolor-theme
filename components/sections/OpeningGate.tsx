'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/lib/config';
import { WcBlob, WcBranchRow, WcFlower, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import { FloTop, FloBot, FloCrn, FlorOne, FlorTwo, FlorThree, FlorFour, FlorFive, FlorSix, FlorSeven } from '@/components/ui/IlustrationBG';

type Phase = 'idle' | 'seal-break' | 'flap-open' | 'card-rise' | 'card-expand' | 'gone';

const ENV_W     = 340;
const ENV_H     = 220;
const ENV_CX    = 170;
const FLAP_TIP  = 121;

function SealParticles({ active }: { active: boolean }) {
  const pts = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360;
    const dist  = 28 + (i % 5) * 14;
    return {
      tx: Math.cos((angle * Math.PI) / 180) * dist,
      ty: Math.sin((angle * Math.PI) / 180) * dist,
      size: 2.5 + (i % 4) * 1.6,
      delay: (i % 5) * 0.04,
    };
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
      {pts.map((p, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            background: `hsl(${20 + (i % 6) * 6}, 72%, ${46 + (i % 3) * 10}%)`,
            '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
            animation: active
              ? `particleBurst 0.75s cubic-bezier(0.22,1,0.36,1) ${p.delay}s forwards`
              : 'none',
            opacity: active ? 1 : 0,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function WaxStamp({ phase, onClick }: { phase: Phase; onClick: () => void }) {
  const cracking = phase === 'seal-break';
  const gone     = ['flap-open','card-rise','card-expand'].includes(phase);
  const isIdle   = phase === 'idle';

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 82, height: 82, cursor: isIdle ? 'pointer' : 'default', zIndex: 10 }}
      onClick={isIdle ? onClick : undefined}
    >
      <SealParticles active={cracking} />
      <motion.div
        animate={
          cracking ? {
            scale:  [1, 1.18, 0.78, 0],
            rotate: [0, -8, 12, 25],
            opacity:[1, 1, 0.35, 0],
            filter: ['brightness(1)', 'brightness(1.6)', 'brightness(0.6)', 'brightness(0)'],
          }
          : gone ? { scale: 0, opacity: 0, transition: { duration: 0.15 } }
          : {}
        }
        transition={{ duration: 0.72, ease: 'easeInOut' }}
        whileHover={isIdle ? { scale: 1.07, transition: { duration: 0.25 } } : {}}
      >
        <svg width="82" height="82" viewBox="0 0 82 82" fill="none">
          <defs>
            <radialGradient id="waxMain" cx="38%" cy="32%" r="65%">
              <stop offset="0%"   stopColor="#f0c84a"/>
              <stop offset="45%"  stopColor="#c8980a"/>
              <stop offset="100%" stopColor="#8a6200"/>
            </radialGradient>
            <radialGradient id="waxDepth" cx="50%" cy="85%" r="55%">
              <stop offset="0%"   stopColor="#4a3000" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#4a3000" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="waxHi" cx="32%" cy="25%" r="40%">
              <stop offset="0%"   stopColor="#fff8d0" stopOpacity="0.65"/>
              <stop offset="100%" stopColor="#fff8d0" stopOpacity="0"/>
            </radialGradient>
            <filter id="waxNoise" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
              <feColorMatrix type="saturate" values="0" result="grayNoise"/>
              <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend"/>
              <feComposite in="blend" in2="SourceGraphic" operator="in"/>
            </filter>
            <filter id="stampShadow" x="-15%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgba(80,30,5,0.5)"/>
            </filter>
          </defs>
          <path d="M41 76 C32 76 20 71 15 63 C9 55 8 44 10 35 C12 25 18 14 28 10 C35 7 47 6 56 10 C65 14 72 22 74 32 C76 42 73 55 66 63 C60 70 50 76 41 76 Z"
            fill="url(#waxDepth)" transform="translate(0, 2)"/>
          <path d="M41 75 C34 75.5 23 71 17 63 C11 55 10 44 12 35 C14 25 20 14 30 10 C37 7 48 6 57 10 C66 14 73 23 74 33 C75 43 72 55 65 63 C59 70 49 74.5 41 75 Z"
            fill="url(#waxMain)" filter="url(#stampShadow)"/>
          <path d="M41 75 C34 75.5 23 71 17 63 C11 55 10 44 12 35 C14 25 20 14 30 10 C37 7 48 6 57 10 C66 14 73 23 74 33 C75 43 72 55 65 63 C59 70 49 74.5 41 75 Z"
            fill="rgba(100,70,0,0.18)" filter="url(#waxNoise)"/>
          <path d="M41 75 C34 75.5 23 71 17 63 C11 55 10 44 12 35 C14 25 20 14 30 10 C37 7 48 6 57 10 C66 14 73 23 74 33 C75 43 72 55 65 63 C59 70 49 74.5 41 75 Z"
            fill="url(#waxHi)"/>
          <ellipse cx="14" cy="52" rx="4" ry="6" fill="#b88a00" opacity="0.7" transform="rotate(-20 14 52)"/>
          <ellipse cx="68" cy="48" rx="3" ry="5" fill="#a07800" opacity="0.65" transform="rotate(15 68 48)"/>
          <ellipse cx="36" cy="76" rx="5" ry="3.5" fill="#c09200" opacity="0.6" transform="rotate(5 36 76)"/>
          <circle cx="41" cy="41" r="26" fill="none" stroke="rgba(90,30,5,0.3)" strokeWidth="1.2"/>
          <circle cx="41" cy="41" r="20" fill="none" stroke="rgba(90,30,5,0.2)" strokeWidth="0.8"/>
          <g opacity="0.82">
            <path d="M41 18 L41 54" stroke="rgba(70,20,5,0.55)" strokeWidth="1"/>
            <path d="M41 28 C36 24 30 23 27 25 C28 29 33 32 41 32 Z" fill="rgba(70,20,5,0.38)" stroke="rgba(70,20,5,0.25)" strokeWidth="0.6"/>
            <path d="M41 36 C35 32 28 32 25 34 C27 38 33 40 41 40 Z" fill="rgba(70,20,5,0.35)" stroke="rgba(70,20,5,0.22)" strokeWidth="0.6"/>
            <path d="M41 28 C46 24 52 23 55 25 C54 29 49 32 41 32 Z" fill="rgba(70,20,5,0.38)" stroke="rgba(70,20,5,0.25)" strokeWidth="0.6"/>
            <path d="M41 36 C47 32 54 32 57 34 C55 38 49 40 41 40 Z" fill="rgba(70,20,5,0.35)" stroke="rgba(70,20,5,0.22)" strokeWidth="0.6"/>
            <path d="M41 46 C39 50 38 53 41 55 C44 53 43 50 41 46 Z" fill="rgba(70,20,5,0.32)" stroke="rgba(70,20,5,0.2)" strokeWidth="0.5"/>
          </g>
        </svg>
      </motion.div>
      {isIdle && (
        <>
          <motion.div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: '1.5px solid rgba(200,152,10,0.45)' }}
            animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}/>
          <motion.div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: '1px solid rgba(200,152,10,0.28)' }}
            animate={{ scale: [1, 1.9, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}/>
        </>
      )}
      {isIdle && (
        <div className="absolute rounded-full overflow-hidden pointer-events-none"
          style={{ width: 74, height: 74, borderRadius: '50%' }}>
          <motion.div className="absolute inset-y-0 w-8"
            style={{ background: 'linear-gradient(to right,transparent,rgba(255,255,255,0.38),transparent)' }}
            animate={{ x: ['-200%', '320%'] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 3.2, ease: 'easeInOut' }}/>
        </div>
      )}
    </div>
  );
}

function Bokeh() {
  const d = [
    { l:'7%',  t:'16%', s:95,  c:'var(--sage-pale)',  o:0.4, delay:0   },
    { l:'83%', t:'11%', s:68,  c:'var(--petal)',      o:0.38,delay:0.5 },
    { l:'3%',  t:'74%', s:115, c:'var(--sage-pale)',  o:0.36,delay:1   },
    { l:'88%', t:'70%', s:78,  c:'var(--petal)',      o:0.4, delay:1.5 },
    { l:'47%', t:'3%',  s:58,  c:'var(--sage-light)', o:0.3, delay:0.3 },
    { l:'27%', t:'91%', s:100, c:'var(--sage-pale)',  o:0.34,delay:0.8 },
    { l:'73%', t:'89%', s:72,  c:'var(--petal)',      o:0.38,delay:1.2 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {d.map((b, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ left:b.l, top:b.t, width:b.s, height:b.s, background:b.c, opacity:b.o, filter:'blur(32px)' }}
          animate={{ scale:[1,1.2,1], opacity:[b.o, b.o*0.55, b.o] }}
          transition={{ duration:5.5+i*0.5, repeat:Infinity, ease:'easeInOut', delay:b.delay }}/>
      ))}
    </div>
  );
}

export default function OpeningGate() {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  const go = () => {
    if (phase !== 'idle') return;
    setPhase('seal-break');
    setTimeout(() => setPhase('flap-open'),   720);
    setTimeout(() => setPhase('card-rise'),   720 + 1050);
    setTimeout(() => setPhase('card-expand'), 720 + 1050 + 1800);
    setTimeout(() => {
      setPhase('gone');
      document.body.style.overflow = '';
      const m = document.getElementById('main-content');
      if (m) { m.style.opacity = '1'; m.style.pointerEvents = 'auto'; }
      const nav = document.getElementById('navbar-wrapper');
      if (nav) { nav.style.opacity = '1'; nav.style.pointerEvents = 'auto'; }
    }, 720 + 1050 + 1800 + 1800);
  };

  const flapOpen   = ['flap-open','card-rise','card-expand'].includes(phase);
  const cardRising = ['card-rise','card-expand'].includes(phase);
  const cardExpand = phase === 'card-expand';

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#eef5ee 0%,#f4f8f4 45%,#eaf2eb 100%)', overflowX: 'hidden' }}
          exit={{ opacity: 0, transition: { duration: 1.1 } }}
        >
          <Bokeh/>

          {/* BG blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -left-28">
              <WcBlob size={500} color="var(--sage-pale)" opacity={0.36} rotate={-15}/>
            </div>
            <div className="absolute -bottom-28 -right-28">
              <WcBlob size={460} color="var(--petal)" opacity={0.3} rotate={25}/>
            </div>
          </div>

          {/* Corner flowers — absolute di dalam gate */}
          <div className="absolute top-0 left-0 pointer-events-none">
            <motion.div animate={{ y:[0,-10,0], rotate:[-3,3,-3] }}
              transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}>
              <FloTop opacity={0.85}
                className="w-36 sm:w-44 md:w-56 lg:w-64"
                style={{ aspectRatio:'1/1', height:'auto' }}/>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 pointer-events-none">
            <motion.div animate={{ y:[0,-10,0], rotate:[3,-3,3] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:0.8 }}>
              <FloTop flip opacity={0.85}
                className="w-36 sm:w-44 md:w-56 lg:w-64"
                style={{ aspectRatio:'1/1', height:'auto' }}/>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 pointer-events-none">
            <motion.div animate={{ y:[0,-8,0], rotate:[2,-2,2] }}
              transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:1.2 }}>
              <FloBot opacity={0.85}
                className="w-32 sm:w-40 md:w-52 lg:w-60"
                style={{ aspectRatio:'1/1', height:'auto' }}/>
            </motion.div>
          </div>
          <div className="absolute bottom-0 right-0 pointer-events-none">
            <motion.div animate={{ y:[0,-8,0], rotate:[-2,2,-2] }}
              transition={{ duration:7, repeat:Infinity, ease:'easeInOut', delay:0.4 }}>
              <FloBot flip opacity={0.85}
                className="w-32 sm:w-40 md:w-52 lg:w-60"
                style={{ aspectRatio:'1/1', height:'auto' }}/>
            </motion.div>
          </div>

          <div className="relative flex flex-col items-center" style={{ zIndex: 10 }}>

            <AnimatePresence>
              {phase === 'idle' && (
                <motion.div key="title"
                  className="text-center mb-8 px-4 w-screen"
                  style={{ maxWidth: '100vw' }}
                  initial={{ opacity:0, y:22 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-10, transition:{ duration:0.22 } }}
                  transition={{ delay:0.3, duration:0.9 }}>
                  <motion.p className="text-xs tracking-[0.35em] uppercase mb-3"
                    style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.42 }}>
                    Sebuah Undangan Istimewa
                  </motion.p>
                  <motion.h1
                    style={{ fontFamily:'var(--font-script)', fontSize:'clamp(2.2rem,7vw,4.2rem)', color:'var(--moss-dark)', lineHeight:1.1 }}
                    initial={{ opacity:0, y:22, filter:'blur(6px)' }}
                    animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                    transition={{ delay:0.52, duration:1, ease:[0.16,1,0.3,1] }}>
                    {weddingConfig.groom.nickname}
                    <motion.span
                      className="inline-block mx-2 italic"
                      style={{ fontFamily:'var(--font-display)', fontSize:'58%', color:'var(--sage)', verticalAlign:'middle' }}
                      initial={{ opacity:0, scale:0.3 }}
                      animate={{ opacity:1, scale:1 }}
                      transition={{ delay:0.82, type:'spring', stiffness:160 }}>
                      &amp;
                    </motion.span>
                    {weddingConfig.bride.nickname}
                  </motion.h1>
                  <motion.div className="flex justify-center mt-2 overflow-hidden"
                    initial={{ opacity:0 }} animate={{ opacity:1 }}
                    transition={{ delay:0.98, duration:0.8 }}>
                    <WcBrushStroke width={160} color="var(--sage)" opacity={0.5}/>
                  </motion.div>
                  <motion.p className="mt-2.5 text-sm italic"
                    style={{ color:'var(--text-muted)', fontFamily:'var(--font-body)' }}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.08 }}>
                    Mengundang kehadiran Anda di hari bahagia kami
                  </motion.p>
                  <motion.div className="flex justify-center mt-3 overflow-hidden"
                    initial={{ opacity:0 }} animate={{ opacity:1 }}
                    transition={{ delay:1.18, duration:0.8 }}>
                    <WcBranchRow width={180} color="var(--sage)"/>
                  </motion.div>
                  <motion.p className="mt-3 text-xs tracking-[0.28em] uppercase"
                    style={{ color:'var(--sage)', fontFamily:'var(--font-sans)' }}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.35 }}>
                    ↓ &nbsp; klik seal untuk membuka &nbsp; ↓
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative"
              style={{
                width: ENV_W,
                height: ENV_H,
                /* Scale down di mobile — max lebar layar dikurangi margin */
                transform: `scale(min(1, calc((100vw - 32px) / ${ENV_W})))`,
                transformOrigin: 'top center',
              }}
              animate={
                phase === 'idle'
                  ? { y:[0,-8,0], rotate:[-0.5,0.5,-0.5] }
                  : cardExpand
                  ? { opacity:0, scale:0.88, transition:{ duration:0.55, ease:'easeIn' } }
                  : {}
              }
              transition={ phase === 'idle' ? { duration:4.5, repeat:Infinity, ease:'easeInOut' } : {} }
            >
              <AnimatePresence>
                {cardRising && (
                  <motion.div key="card"
                    style={{
                      position: 'absolute', width: 262, left: (ENV_W - 262) / 2,
                      zIndex: 8, background: 'linear-gradient(165deg,#faf7f0 0%,#f2ead8 100%)',
                      border: '1px solid rgba(180,155,100,0.26)', borderRadius: '0.9rem',
                      boxShadow: '0 10px 38px rgba(44,62,45,0.18)', overflow: 'hidden',
                      transformOrigin: 'center center',
                    }}
                    initial={{ top: ENV_H * 0.18, y: ENV_H * 0.3, opacity: 0, scaleY: 0.35, scaleX: 0.85 }}
                    animate={
                      cardExpand
                        ? { top: ENV_H * 0.18, y: -(ENV_H * 0.68), scaleX: 1, scaleY: 1, opacity: 1 }
                        : { top: ENV_H * 0.18, y: -(ENV_H * 0.68), opacity: 1, scaleY: 1, scaleX: 1 }
                    }
                    transition={{ duration:0.82, ease:[0.16,1,0.3,1] }}>
                    <div className="absolute inset-0 pointer-events-none opacity-[0.14]"
                      style={{ backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(150,118,70,0.07) 3px,rgba(150,118,70,0.07) 4px)' }}/>
                    <div className="relative p-7 text-center">
                      <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                        transition={{ delay:0.18, type:'spring', stiffness:150 }}>
                        <WcFlower size={36} color="var(--sage)" opacity={0.9}/>
                      </motion.div>
                      <motion.p className="text-xs tracking-[0.38em] uppercase mt-3 mb-1"
                        style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)', fontSize:'0.58rem' }}
                        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28 }}>
                        Undangan Pernikahan
                      </motion.p>
                      <motion.div className="flex justify-center mb-2 overflow-hidden"
                        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.36, duration:0.6 }}>
                        <WcBranchRow width={175} color="var(--sage)"/>
                      </motion.div>
                      <motion.h2
                        style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.75rem,5vw,2.6rem)', color:'var(--moss-dark)', lineHeight:1.12 }}
                        initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
                        transition={{ delay:0.44, duration:0.65, ease:[0.16,1,0.3,1] }}>
                        {weddingConfig.groom.nickname}
                      </motion.h2>
                      <motion.p className="text-lg italic my-0.5"
                        style={{ fontFamily:'var(--font-display)', color:'var(--sage)' }}
                        initial={{ opacity:0, scale:0.4 }} animate={{ opacity:1, scale:1 }}
                        transition={{ delay:0.58, type:'spring', stiffness:160 }}>
                        &amp;
                      </motion.p>
                      <motion.h2
                        style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.75rem,5vw,2.6rem)', color:'var(--moss-dark)', lineHeight:1.12 }}
                        initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
                        transition={{ delay:0.68, duration:0.65, ease:[0.16,1,0.3,1] }}>
                        {weddingConfig.bride.nickname}
                      </motion.h2>
                      <motion.div className="flex justify-center mt-2 overflow-hidden"
                        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.78, duration:0.6 }}>
                        <WcBranchRow width={175} color="var(--sage)"/>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 pointer-events-none" style={{
                borderRadius: '9px',
                boxShadow: '0 16px 40px rgba(8,14,2,0.4), 0 6px 16px rgba(8,14,2,0.2)',
              }}/>

              <svg className="absolute inset-0 pointer-events-none"
                width={ENV_W} height={ENV_H} viewBox={`0 0 ${ENV_W} ${ENV_H}`}
                fill="none" style={{ zIndex:3, overflow:'visible' }}>
                <defs>
                  <clipPath id="envClip">
                    <rect x="0" y="0" width={ENV_W} height={ENV_H} rx="9"/>
                  </clipPath>
                </defs>
                <rect x="0" y="0" width={ENV_W} height={ENV_H} rx="9" fill="#7e9028"/>
                <path d={`M0 0 L${ENV_CX} ${ENV_H*0.58} L0 ${ENV_H} Z`} fill="#5a6a18" clipPath="url(#envClip)"/>
                <path d={`M${ENV_W} 0 L${ENV_CX} ${ENV_H*0.58} L${ENV_W} ${ENV_H} Z`} fill="#627218" clipPath="url(#envClip)"/>
                <path d={`M0 ${ENV_H} L${ENV_CX} ${ENV_H*0.65} L${ENV_W} ${ENV_H} Z`} fill="#4e5e14" clipPath="url(#envClip)"/>
                <line x1="0" y1="0" x2={ENV_CX} y2={ENV_H*0.58} stroke="rgba(30,40,5,0.35)" strokeWidth="0.8"/>
                <line x1={ENV_W} y1="0" x2={ENV_CX} y2={ENV_H*0.58} stroke="rgba(30,40,5,0.35)" strokeWidth="0.8"/>
                <line x1="0" y1={ENV_H} x2={ENV_CX} y2={ENV_H*0.65} stroke="rgba(30,40,5,0.3)" strokeWidth="0.7"/>
                <line x1={ENV_W} y1={ENV_H} x2={ENV_CX} y2={ENV_H*0.65} stroke="rgba(30,40,5,0.3)" strokeWidth="0.7"/>
                <rect x="0" y="0" width={ENV_W} height={ENV_H} rx="9" fill="none" stroke="rgba(40,55,8,0.3)" strokeWidth="1"/>
              </svg>

              <div className="absolute inset-x-0 pointer-events-none"
                style={{ top:0, height: FLAP_TIP+14, zIndex: flapOpen ? 2 : 5, perspective:'800px' }}>
                <svg width={ENV_W} height={FLAP_TIP+14}
                  viewBox={`0 0 ${ENV_W} ${FLAP_TIP+14}`} fill="none"
                  style={{
                    display:'block', transformOrigin:'center top',
                    transform:`rotateX(${flapOpen ? -180 : 0}deg)`,
                    transition:'transform 0.95s cubic-bezier(0.76,0,0.24,1)',
                  }}>
                  <path d={`M0 0 L${ENV_W} 0 L${ENV_CX} ${FLAP_TIP} Z`} fill="#566016"/>
                  <path d={`M0 0 L${ENV_W} 0 L${ENV_CX} ${FLAP_TIP} Z`} fill="url(#flapShade)"/>
                  <defs>
                    <linearGradient id="flapShade" x1="0.5" y1="0" x2="0.5" y2="1">
                      <stop offset="0%"   stopColor="#8a9e2a" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#2a3408" stopOpacity="0.15"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="0" x2={ENV_CX} y2={FLAP_TIP} stroke="rgba(30,40,5,0.3)" strokeWidth="0.8"/>
                  <line x1={ENV_W} y1="0" x2={ENV_CX} y2={FLAP_TIP} stroke="rgba(30,40,5,0.3)" strokeWidth="0.8"/>
                </svg>
              </div>

              <div className="absolute"
                style={{ top: FLAP_TIP - 41, left: '50%', transform: 'translateX(-50%)', zIndex: flapOpen ? 1 : 7 }}>
                <WaxStamp phase={phase} onClick={go}/>
              </div>

            </motion.div>
          </div>

          <AnimatePresence>
            {cardExpand && (
              <motion.div key="expand-overlay"
                className="fixed inset-0 flex items-center justify-center overflow-hidden"
                style={{ zIndex: 9998 }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.4 }}>
                <motion.div
                  className="absolute overflow-hidden"
                  style={{ background: 'linear-gradient(165deg,#faf7f0 0%,#f2ead8 100%)', transformOrigin: 'center center' }}
                  initial={{ width:'270px', height:'auto', borderRadius:'0.9rem', scale:0.5, opacity:0 }}
                  animate={{ width:'100vw', height:'100vh', borderRadius:'0px', scale:1, opacity:1 }}
                  transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}>
                  <div className="absolute inset-0 pointer-events-none opacity-[0.12]"
                    style={{ backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(150,118,70,0.07) 3px,rgba(150,118,70,0.07) 4px)' }}/>
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -left-20 opacity-30">
                      <WcBlob size={400} color="var(--sage-pale)" opacity={0.8}/>
                    </div>
                    <div className="absolute -bottom-20 -right-20 opacity-25">
                      <WcBlob size={380} color="var(--petal)" opacity={0.8} rotate={20}/>
                    </div>
                  </div>
                  <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
                    <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                      transition={{ delay:0.3, type:'spring', stiffness:130 }}>
                      <WcFlower size={52} color="var(--sage)" opacity={0.9}/>
                    </motion.div>
                    <motion.p className="text-xs tracking-[0.42em] uppercase mt-5 mb-1"
                      style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}
                      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}>
                      Undangan Pernikahan
                    </motion.p>
                    <motion.div className="flex justify-center mb-4 overflow-hidden"
                      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.48, duration:0.7 }}>
                      <WcBranchRow width={260} color="var(--sage)"/>
                    </motion.div>
                    <motion.h1
                      style={{ fontFamily:'var(--font-script)', fontSize:'clamp(3.5rem,10vw,7rem)', color:'var(--moss-dark)', lineHeight:1.1 }}
                      initial={{ opacity:0, y:28, filter:'blur(8px)' }}
                      animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                      transition={{ delay:0.56, duration:0.85, ease:[0.16,1,0.3,1] }}>
                      {weddingConfig.groom.nickname}
                    </motion.h1>
                    <motion.p className="text-3xl italic my-2"
                      style={{ fontFamily:'var(--font-display)', color:'var(--sage)' }}
                      initial={{ opacity:0, scale:0.4 }} animate={{ opacity:1, scale:1 }}
                      transition={{ delay:0.72, type:'spring', stiffness:140 }}>
                      &amp;
                    </motion.p>
                    <motion.h1
                      style={{ fontFamily:'var(--font-script)', fontSize:'clamp(3.5rem,10vw,7rem)', color:'var(--moss-dark)', lineHeight:1.1 }}
                      initial={{ opacity:0, y:28, filter:'blur(8px)' }}
                      animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                      transition={{ delay:0.84, duration:0.85, ease:[0.16,1,0.3,1] }}>
                      {weddingConfig.bride.nickname}
                    </motion.h1>
                    <motion.div className="flex justify-center mt-4 overflow-hidden"
                      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.96, duration:0.7 }}>
                      <WcBranchRow width={260} color="var(--sage)"/>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}