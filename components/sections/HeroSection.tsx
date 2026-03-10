'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/lib/config';
import { formatDate } from '@/lib/utils';
import { WcBlob, WcLeaf, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Background image with watercolor overlay ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image src="/images/hero-bg.jpg" alt="Hero" fill className="object-cover" priority />
        {/* Watercolor wash overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(238,245,238,0.55) 0%, rgba(212,232,213,0.45) 40%, var(--bg) 100%)' }}/>
        {/* Green tint */}
        <div className="absolute inset-0" style={{ background: 'rgba(122,158,126,0.2)', mixBlendMode: 'multiply' }}/>
      </motion.div>

      {/* ── Watercolor blobs — decorative background shapes ── */}
      <div className="absolute top-0 left-0 pointer-events-none" style={{ transform: 'translate(-30%, -20%)' }}>
        <WcBlob size={500} color="var(--sage-pale)" opacity={0.5} rotate={-15} />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: 'translate(20%, 15%)' }}>
        <WcBlob size={450} color="var(--petal)" opacity={0.4} rotate={25} />
      </div>

      {/* ── Corner leaf decorations ── */}
      <motion.div className="absolute top-8 left-8 pointer-events-none"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}>
        <WcLeaf size={70} color="var(--sage)" opacity={0.5} rotate={-55} />
      </motion.div>
      <motion.div className="absolute top-8 right-8 pointer-events-none"
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 1 }}>
        <WcLeaf size={65} color="var(--moss)" opacity={0.4} rotate={55} />
      </motion.div>
      <motion.div className="absolute bottom-20 left-6 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
        <WcLeaf size={50} color="var(--sage)" opacity={0.35} rotate={30} />
      </motion.div>
      <motion.div className="absolute bottom-20 right-6 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}>
        <WcLeaf size={50} color="var(--moss)" opacity={0.35} rotate={-30} />
      </motion.div>

      {/* ── Main content ── */}
      <motion.div className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: contentY, opacity }}>

        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-8"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          The Wedding of
        </motion.p>

        {/* Groom name */}
        <motion.h1
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(4rem, 12vw, 8rem)', color: 'var(--moss-dark)', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {weddingConfig.groom.nickname}
        </motion.h1>

        {/* Brush stroke divider */}
        <motion.div className="flex justify-center my-3"
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}>
          <WcBrushStroke width={220} color="var(--sage)" opacity={0.6} />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(4rem, 12vw, 8rem)', color: 'var(--moss-dark)', lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.0, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {weddingConfig.bride.nickname}
        </motion.h1>

        {/* Date pill */}
        <motion.div
          className="inline-flex flex-col items-center gap-2 px-8 py-4 mt-10 rounded-full"
          style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', border: '1px solid var(--border)' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            {formatDate(weddingConfig.event.akad.date)}
          </p>
          <div className="w-16 h-px" style={{ background: 'var(--sage-light)' }} />
          <p className="text-xs" style={{ color: 'var(--moss)', fontFamily: 'var(--font-sans)' }}>
            {weddingConfig.event.akad.venue}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <motion.div
            animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: 'var(--sage-light)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: 'var(--sage)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
