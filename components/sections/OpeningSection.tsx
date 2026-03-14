'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/lib/config';
import { WcBranchRow, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import {
  FloBot, FloTop, FloCtr, FloCrn, FloMid,
  FlorOne, FlorTwo, FlorThree, FlorFour, FlorFive, FlorSix, FlorSeven,
} from '@/components/ui/IlustrationBG';

function FadeUp({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity:0, y:36 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.9, delay, ease:[0.16,1,0.3,1] }}>
      {children}
    </motion.div>
  );
}

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

export default function OpeningSection() {
  const coupleRef    = useRef(null);
  const coupleInView = useInView(coupleRef, { once: true, margin:'-60px' });

  return (
    <section className="section-pad relative overflow-hidden">

      {/* ── Dekorasi pojok section ── */}
      <motion.div className="absolute -top-8 -left-8 pointer-events-none"
        initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
        transition={{ duration:1 }} viewport={{ once:true }}>
        <FloatingFlower delay={0}>
          <FloTop opacity={0.88} rotate={15} className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56"/>
        </FloatingFlower>
      </motion.div>
      <motion.div className="absolute -top-8 -right-8 pointer-events-none"
        initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
        transition={{ duration:1, delay:0.1 }} viewport={{ once:true }}>
        <FloatingFlower delay={0.8}>
          <FloBot opacity={0.85} flip rotate={-10} className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56"/>
        </FloatingFlower>
      </motion.div>
      <motion.div className="absolute -bottom-6 -left-6 pointer-events-none"
        initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
        transition={{ duration:1, delay:0.15 }} viewport={{ once:true }}>
        <FloatingFlower delay={1.2}>
          <FloCrn opacity={0.8} rotate={-20} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"/>
        </FloatingFlower>
      </motion.div>
      <motion.div className="absolute -bottom-6 -right-6 pointer-events-none"
        initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
        transition={{ duration:1, delay:0.2 }} viewport={{ once:true }}>
        <FloatingFlower delay={0.4}>
          <FloCrn opacity={0.8} flip rotate={20} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"/>
        </FloatingFlower>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">

        {/* ── Bismillah ── */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-4xl md:text-5xl mb-6 leading-loose"
              style={{ fontFamily:'Georgia, serif', color:'var(--moss)', direction:'rtl' }}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <div className="flex justify-center">
              <WcBranchRow width={260} color="var(--sage)"/>
            </div>
          </div>
        </FadeUp>

        {/* ── Quran verse card ── */}
        <FadeUp delay={0.1}>
          <div className="wc-card p-8 md:p-12 text-center mb-14 relative overflow-hidden">
            {/* Bunga di pojok dalam card — z rendah, di belakang teks */}
            <div className="absolute top-0 left-0 pointer-events-none opacity-40">
              <FlorOne rotate={-20} className="w-28 h-28 sm:w-32 sm:h-32"/>
            </div>
            <div className="absolute top-0 right-0 pointer-events-none opacity-40">
              <FlorTwo flip rotate={20} className="w-28 h-28 sm:w-32 sm:h-32"/>
            </div>
            <div className="absolute bottom-0 left-0 pointer-events-none opacity-30">
              <FlorThree rotate={30} className="w-20 h-20 sm:w-24 sm:h-24"/>
            </div>
            <div className="absolute bottom-0 right-0 pointer-events-none opacity-30">
              <FlorThree flip rotate={-30} className="w-20 h-20 sm:w-24 sm:h-24"/>
            </div>

            <div className="relative z-10">
              <p className="text-lg md:text-xl italic leading-relaxed mb-5"
                style={{ fontFamily:'var(--font-body)', color:'var(--text)' }}>
                "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
                untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
                dan Dia menjadikan di antaramu rasa kasih dan sayang."
              </p>
              <div className="flex justify-center">
                <WcBrushStroke width={120} color="var(--sage)" opacity={0.4}/>
              </div>
              <p className="mt-3 text-sm tracking-widest"
                style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}>
                QS. Ar-Rum: 21
              </p>
            </div>
          </div>
        </FadeUp>

        {/* ── Intro text ── */}
        <FadeUp delay={0.15}>
          <p className="text-center text-base md:text-lg leading-relaxed italic"
            style={{ color:'var(--text-muted)', fontFamily:'var(--font-body)', maxWidth:'540px', margin:'0 auto 3.5rem' }}>
            Dengan memohon rahmat dan ridho Allah SWT serta restu kedua orang tua,
            kami bermaksud menyelenggarakan pernikahan kami.
          </p>
        </FadeUp>

        {/* ── Couple cards ── */}
        <div ref={coupleRef} className="grid md:grid-cols-2 gap-20 mt-6">
          {[
            { ...weddingConfig.groom, role:'Mempelai Pria' },
            { ...weddingConfig.bride, role:'Mempelai Wanita' },
          ].map((person, i) => (
            <motion.div key={i}
              className="relative"
              style={{ isolation: 'isolate' }}
              initial={{ opacity:0, x: i===0 ? -50 : 50, filter:'blur(6px)' }}
              animate={coupleInView ? { opacity:1, x:0, filter:'blur(0px)' } : {}}
              transition={{ duration:1, delay:i*0.15, ease:[0.16,1,0.3,1] }}>

              {/* ── Bunga mengambang DI LUAR card ── posisi absolut di atas card */}
              {/* Kiri atas */}
              <div className="absolute pointer-events-none"
                style={{ top: -40, left: -40, zIndex: 20 }}>
                <FloatingFlower delay={i*0.8}>
                  <FloCtr
                    opacity={0.9}
                    rotate={i===0 ? -25 : 155}
                    flip={i===1}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
                  />
                </FloatingFlower>
              </div>

              {/* Kanan bawah */}
              <div className="absolute pointer-events-none"
                style={{ bottom: -40, right: -40, zIndex: 20 }}>
                <FloatingFlower delay={i*0.8+1.5}>
                  <FloMid
                    opacity={0.85}
                    rotate={i===0 ? 155 : -25}
                    flip={i===0}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                  />
                </FloatingFlower>
              </div>

              {/* ── Card — z-10 agar di atas shadow tapi di bawah bunga ── */}
              <div className="wc-card p-8 text-center relative" style={{ zIndex: 10 }}>

                {/* Foto — solid, tidak ada overlay apapun */}
                <div className="relative mx-auto mb-5"
                  style={{ width:140, height:140 }}>
                  <motion.div
                    className="w-full h-full rounded-full overflow-hidden"
                    whileHover={{ scale:1.04 }}
                    transition={{ duration:0.4 }}>
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover"
                      style={{ borderRadius:'50%' }}
                    />
                  </motion.div>
                  {/* Ring border */}
                  <div className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border:'2px solid var(--border)' }}/>
                </div>

                <p className="text-xs tracking-[0.2em] uppercase mb-1"
                  style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}>
                  {person.role}
                </p>
                <h2 className="mb-1"
                  style={{ fontFamily:'var(--font-script)', fontSize:'2.2rem', color:'var(--moss-dark)' }}>
                  {person.nickname}
                </h2>
                <div className="flex justify-center my-2">
                  <WcBrushStroke width={80} color="var(--sage)" opacity={0.4}/>
                </div>
                <p className="text-base mb-2"
                  style={{ fontFamily:'var(--font-body)', color:'var(--text)' }}>
                  {person.fullName}
                </p>
                <p className="text-xs leading-relaxed"
                  style={{ color:'var(--text-muted)', fontFamily:'var(--font-sans)' }}>
                  {person.parents}
                </p>
                {person.instagram && (
                  <p className="mt-2 text-xs"
                    style={{ color:'var(--sage)', fontFamily:'var(--font-sans)' }}>
                    {person.instagram}
                  </p>
                )}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom ornament */}
        <FadeUp delay={0.3}>
          <div className="flex flex-col items-center mt-24 gap-3">
            <FloatingFlower delay={0}>
              <FloCtr opacity={0.7} className="w-48 h-20 sm:w-56 sm:h-24 md:w-72 md:h-28"/>
            </FloatingFlower>
            <WcBranchRow width={300} color="var(--sage)"/>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
