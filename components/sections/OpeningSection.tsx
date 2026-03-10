'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { weddingConfig } from '@/lib/config';
import { WcBlob, WcLeaf, WcBranchRow, WcFlower, WcCircle, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export default function OpeningSection() {
  const coupleRef  = useRef(null);
  const coupleInView = useInView(coupleRef, { once: true, margin: '-60px' });

  return (
    <section className="section-pad relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute -top-20 -right-20 pointer-events-none">
        <WcBlob size={400} color="var(--sage-pale)" opacity={0.35} rotate={20} />
      </div>
      <div className="absolute -bottom-20 -left-20 pointer-events-none">
        <WcBlob size={360} color="var(--petal)" opacity={0.3} rotate={-30} />
      </div>

      <div className="max-w-4xl mx-auto relative">

        {/* ── Bismillah ── */}
        <FadeUp>
          <div className="text-center mb-12">
            <p className="text-4xl md:text-5xl mb-6 leading-loose"
              style={{ fontFamily: 'Georgia, serif', color: 'var(--moss)', direction: 'rtl' }}>
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <div className="flex justify-center">
              <WcBranchRow width={260} color="var(--sage)" />
            </div>
          </div>
        </FadeUp>

        {/* ── Quran verse card ── */}
        <FadeUp delay={0.1}>
          <div className="wc-card p-8 md:p-12 text-center mb-14 relative overflow-hidden">
            {/* Corner flowers */}
            <div className="absolute top-3 left-3 opacity-30"><WcFlower size={28} color="var(--sage-light)" /></div>
            <div className="absolute top-3 right-3 opacity-30"><WcFlower size={28} color="var(--sage-light)" /></div>
            <div className="absolute bottom-3 left-3 opacity-30"><WcFlower size={24} color="var(--petal)" /></div>
            <div className="absolute bottom-3 right-3 opacity-30"><WcFlower size={24} color="var(--petal)" /></div>
            {/* Background blob */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <WcBlob size={380} color="var(--sage-pale)" opacity={1} />
            </div>
            <div className="relative">
              <p className="text-lg md:text-xl italic leading-relaxed mb-5"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text)', fontStyle: 'italic' }}>
                "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
                untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya,
                dan Dia menjadikan di antaramu rasa kasih dan sayang."
              </p>
              <WcBrushStroke width={120} color="var(--sage)" opacity={0.4} />
              <p className="mt-3 text-sm tracking-widest"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                QS. Ar-Rum: 21
              </p>
            </div>
          </div>
        </FadeUp>

        {/* ── Intro text ── */}
        <FadeUp delay={0.15}>
          <p className="text-center text-base md:text-lg leading-relaxed mb-14 italic"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', maxWidth: '540px', margin: '0 auto 3.5rem' }}>
            Dengan memohon rahmat dan ridho Allah SWT serta restu kedua orang tua,
            kami bermaksud menyelenggarakan pernikahan kami.
          </p>
        </FadeUp>

        {/* ── Couple cards ── */}
        <div ref={coupleRef} className="grid md:grid-cols-2 gap-8 mt-6">
          {[
            { ...weddingConfig.groom, role: 'Mempelai Pria' },
            { ...weddingConfig.bride, role: 'Mempelai Wanita' },
          ].map((person, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50, filter: 'blur(6px)' }}
              animate={coupleInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="wc-card p-8 text-center relative overflow-hidden group">
                {/* Card blob bg */}
                <div className="absolute inset-0 pointer-events-none opacity-30"
                  style={{ transform: i === 0 ? 'translate(-30%,-30%)' : 'translate(30%,-30%)' }}>
                  <WcBlob size={300} color={i === 0 ? 'var(--sage-pale)' : 'var(--petal)'} opacity={1} />
                </div>

                {/* Photo with watercolor circle frame */}
                <div className="relative mx-auto mb-5" style={{ width: 150, height: 150 }}>
                  {/* Organic circle frame */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: 'scale(1.15)' }}>
                    <WcCircle size={160} color="var(--sage)" opacity={0.5} />
                  </div>
                  {/* Rotating leaf ring */}
                  <motion.div className="absolute inset-0 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                    {[0,90,180,270].map((angle) => (
                      <div key={angle} className="absolute" style={{
                        top: `${50 - 52 * Math.cos(angle * Math.PI / 180)}%`,
                        left: `${50 + 52 * Math.sin(angle * Math.PI / 180)}%`,
                        transform: 'translate(-50%,-50%)',
                      }}>
                        <WcLeaf size={18} color="var(--sage)" opacity={0.5} rotate={angle} />
                      </div>
                    ))}
                  </motion.div>
                  <motion.div className="absolute inset-4 rounded-full overflow-hidden"
                    whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }}>
                    <Image src={person.photo} alt={person.name} fill className="object-cover" />
                  </motion.div>
                </div>

                <div className="relative">
                  <p className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                    {person.role}
                  </p>
                  <h2 className="mb-1"
                    style={{ fontFamily: 'var(--font-script)', fontSize: '2.2rem', color: 'var(--moss-dark)' }}>
                    {person.nickname}
                  </h2>
                  <div className="flex justify-center my-2">
                    <WcBrushStroke width={80} color="var(--sage)" opacity={0.4} />
                  </div>
                  <p className="text-base mb-2"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text)' }}>
                    {person.fullName}
                  </p>
                  <p className="text-xs leading-relaxed"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                    {person.parents}
                  </p>
                  {person.instagram && (
                    <p className="mt-2 text-xs" style={{ color: 'var(--sage)', fontFamily: 'var(--font-sans)' }}>
                      {person.instagram}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom ornament */}
        <FadeUp delay={0.3}>
          <div className="flex justify-center mt-12">
            <WcBranchRow width={300} color="var(--sage)" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
