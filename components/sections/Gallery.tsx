'use client';
// Gallery
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { weddingConfig } from '@/lib/config';
import { WcBranchRow } from '@/components/ui/WatercolorOrnaments';
import { FloCrn, FlorOne, FlorTwo } from '@/components/ui/IlustrationBG';

export function Gallery() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const slides = weddingConfig.gallery.map((g) => ({ src: g.src }));
  const sizes  = ['row-span-2','','','row-span-2','',''];

  return (
    <section id="gallery" className="section-pad relative overflow-hidden"
      style={{ background: 'var(--bg-2)' }}>
      <div className="absolute top-0 right-0 pointer-events-none opacity-60" style={{ transform: 'translate(20%,-10%)' }}>
        <FlorOne style={{ width: 'clamp(100px, 14vw, 200px)', aspectRatio: '1/1', height: 'auto' }} opacity={0.4} rotate={15} />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <FloCrn style={{ width: 'clamp(36px, 5vw, 52px)', aspectRatio: '1/1', height: 'auto', margin: '0 auto' }} opacity={0.85} />
          <p className="text-xs tracking-[0.35em] uppercase mt-4 mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            Momen Berharga
          </p>
          <h2 className="text-sage-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.8rem, 7vw, 4.5rem)' }}>
            Galeri Foto
          </h2>
          <div className="flex justify-center mt-3"><WcBranchRow width={240} color="var(--sage)" /></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
          {weddingConfig.gallery.map((photo, index) => {
            const ref    = useRef(null);
            const inView = useInView(ref, { once: true, margin: '-40px' });
            return (
              <motion.div key={index} ref={ref}
                className={`relative cursor-pointer overflow-hidden group ${sizes[index] ?? ''}`}
                style={{ borderRadius: '1rem' }}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxIndex(index)}>
                <Image src={photo.src} alt={photo.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <motion.div className="absolute inset-0 flex items-end pb-4 justify-center"
                  initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  style={{ background: 'linear-gradient(to top, rgba(44,62,45,0.6) 0%, transparent 70%)' }}>
                  <WcBranchRow width={100} color="white" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        <Lightbox open={lightboxIndex >= 0} index={lightboxIndex} slides={slides}
          close={() => setLightboxIndex(-1)}
          styles={{ container: { backgroundColor: 'rgba(44,62,45,0.95)' } }} />
      </div>
    </section>
  );
}
