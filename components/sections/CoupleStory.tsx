'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { weddingConfig } from '@/lib/config';
import { WcBranchRow, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import { FloCrn, FlorOne, FlorTwo, FlorThree, FlorFour } from '@/components/ui/IlustrationBG';

function TimelineItem({ item, index }: { item: typeof weddingConfig.story[0]; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div ref={ref}
      className={`relative flex items-start gap-6 mb-10 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:items-center`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'} md:max-w-[42%]`}>
        <div className="wc-card p-6 relative  group">
          {/* Corner flower aksen */}
          <div className={`absolute top-2 ${isLeft ? 'right-2' : 'left-2'} opacity-40 pointer-events-none`}>
            <FlorFour
              className="w-7 sm:w-9 md:w-11" style={{ aspectRatio:'1/1', height:'auto' }}
              rotate={isLeft ? 30 : -30}
            />
          </div>
          <div className="relative">
            <p className="text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: 'var(--sage)', fontFamily: 'var(--font-sans)' }}>
              {item.year}
            </p>
            <h3 className="text-xl mb-2"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
              {item.title}
            </h3>
            <div className={`flex ${isLeft ? 'justify-end' : 'justify-start'} my-2`}>
              <WcBrushStroke width={70} color="var(--sage)" opacity={0.4} />
            </div>
            <p className="text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Center node */}
      <motion.div className="flex-shrink-0 flex flex-col items-center z-10"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 180 }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl relative"
          style={{ background: 'var(--sage-mist)', border: '2px solid var(--sage-light)' }}>
          {item.icon}
          <motion.div className="absolute inset-0 rounded-full"
            style={{ border: '1px solid var(--sage-light)' }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.4 }}
          />
        </div>
      </motion.div>

      <div className="flex-1 hidden md:block md:max-w-[42%]" />
    </motion.div>
  );
}

export default function CoupleStory() {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineH = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="story" ref={sectionRef} className="section-pad relative "
      style={{ background: 'var(--bg-2)' }}>

      {/* Corner PNG */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-60">
        <FlorOne
          className="w-28 sm:w-40 md:w-52 lg:w-64" style={{ aspectRatio:'1/1', height:'auto' }}
          rotate={10}
        />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-50">
        <FlorTwo
          flip
          className="w-24 sm:w-36 md:w-48 lg:w-56" style={{ aspectRatio:'1/1', height:'auto' }}
          rotate={-15}
        />
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div ref={titleRef} className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <FloCrn
            className="w-10 sm:w-12 md:w-14 lg:w-16" style={{ aspectRatio:'1/1', height:'auto', margin:'0 auto' }}
            opacity={0.85}
          />
          <p className="text-xs tracking-[0.35em] uppercase mt-4 mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            Perjalanan Cinta Kami
          </p>
          <h2 className="text-sage-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
            Kisah Kita
          </h2>
          <div className="flex justify-center mt-3">
            <WcBranchRow width={280} color="var(--sage)" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block "
            style={{ background: 'var(--sage-pale)' }}>
            <motion.div className="w-full origin-top" style={{ height: lineH, background: 'var(--sage-light)' }} />
          </div>
          {weddingConfig.story.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

        <motion.div className="flex justify-center mt-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <WcBranchRow width={260} color="var(--sage)" />
        </motion.div>
      </div>
    </section>
  );
}