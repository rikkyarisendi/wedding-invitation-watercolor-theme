'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/lib/config';
import { formatDate } from '@/lib/utils';
import { WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import {
  FloTop, FloBot, FloCrn, FloMid,
  FlorOne, FlorTwo, FlorThree, FlorFour,
} from '@/components/ui/IlustrationBG';

function FloatingFlower({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div className={className}
      animate={{ y:[0,-10,0], rotate:[-3,3,-3] }}
      transition={{ duration:5+delay, repeat:Infinity, ease:'easeInOut', delay }}>
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background image ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image src="/images/hero-bg.jpg" alt="Hero" fill className="object-cover" priority />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(238,245,238,0.55) 0%, rgba(212,232,213,0.45) 40%, var(--bg) 100%)' }}/>
      </motion.div>

      {/* ── PNG corner decorations ── */}

      {/* Top left */}
      <motion.div className="absolute top-0 left-0 pointer-events-none"
        initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:0.8, duration:1 }}>
        <FloatingFlower delay={0}>
          <FloTop opacity={0.88} className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64"/>
        </FloatingFlower>
      </motion.div>

      {/* Top right */}
      <motion.div className="absolute top-0 right-0 pointer-events-none"
        initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:0.9, duration:1 }}>
        <FloatingFlower delay={0.8}>
          <FloTop flip opacity={0.85} className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64"/>
        </FloatingFlower>
      </motion.div>

      {/* Bottom left */}
      <motion.div className="absolute bottom-0 left-0 pointer-events-none"
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:1.0, duration:1 }}>
        <FloatingFlower delay={1.2}>
          <FloBot opacity={0.82} className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60"/>
        </FloatingFlower>
      </motion.div>

      {/* Bottom right */}
      <motion.div className="absolute bottom-0 right-0 pointer-events-none"
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:1.1, duration:1 }}>
        <FloatingFlower delay={0.4}>
          <FloBot flip opacity={0.82} className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60"/>
        </FloatingFlower>
      </motion.div>

      {/* Mid left accent */}
      <motion.div className="absolute left-0 top-1/3 pointer-events-none"
        initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:1.3, duration:1 }}>
        <FloatingFlower delay={1.8}>
          <FlorOne opacity={0.55} className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36"/>
        </FloatingFlower>
      </motion.div>

      {/* Mid right accent */}
      <motion.div className="absolute right-0 top-1/3 pointer-events-none"
        initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:1.4, duration:1 }}>
        <FloatingFlower delay={1.0}>
          <FlorTwo flip opacity={0.55} className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36"/>
        </FloatingFlower>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: contentY, opacity }}>

        <motion.p className="text-xs tracking-[0.45em] uppercase mb-8"
          style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3, duration:0.9 }}>
          The Wedding of
        </motion.p>

        <motion.h1
          style={{ fontFamily:'var(--font-script)', fontSize:'clamp(4rem,12vw,8rem)', color:'var(--moss-dark)', lineHeight:1.1 }}
          initial={{ opacity:0, y:40, filter:'blur(8px)' }}
          animate={{ opacity:1, y:0, filter:'blur(0px)' }}
          transition={{ delay:0.5, duration:1.1, ease:[0.16,1,0.3,1] }}>
          {weddingConfig.groom.nickname}
        </motion.h1>

        <motion.div className="flex justify-center my-3"
          initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
          transition={{ delay:0.9, duration:0.9 }}>
          <WcBrushStroke width={220} color="var(--sage)" opacity={0.6}/>
        </motion.div>

        <motion.h1
          style={{ fontFamily:'var(--font-script)', fontSize:'clamp(4rem,12vw,8rem)', color:'var(--moss-dark)', lineHeight:1.1 }}
          initial={{ opacity:0, y:40, filter:'blur(8px)' }}
          animate={{ opacity:1, y:0, filter:'blur(0px)' }}
          transition={{ delay:1.0, duration:1.1, ease:[0.16,1,0.3,1] }}>
          {weddingConfig.bride.nickname}
        </motion.h1>

        <motion.div
          className="inline-flex flex-col items-center gap-2 px-8 py-4 mt-10 rounded-full"
          style={{ background:'rgba(255,255,255,0.65)', backdropFilter:'blur(12px)', border:'1px solid var(--border)' }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:1.3, duration:0.8 }}>
          <p className="text-xs tracking-[0.2em] uppercase"
            style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}>
            {formatDate(weddingConfig.event.akad.date)}
          </p>
          <div className="w-16 h-px" style={{ background:'var(--sage-light)' }}/>
          <p className="text-xs" style={{ color:'var(--moss)', fontFamily:'var(--font-sans)' }}>
            {weddingConfig.event.akad.venue}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2, duration:1 }}>
          <motion.div
            animate={{ y:[0,9,0] }} transition={{ repeat:Infinity, duration:2.2, ease:'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor:'var(--sage-light)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background:'var(--sage)' }}/>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
