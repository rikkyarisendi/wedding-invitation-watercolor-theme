'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';
import { weddingConfig } from '@/lib/config';
import { WcBranchRow, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import { FloCrn, FlorOne, FlorFive, FlorSeven } from '@/components/ui/IlustrationBG';

export default function RSVPForm() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const formRef     = useRef(null);
  const formInView  = useInView(formRef, { once: true, margin: '-40px' });

  const [form, setForm]           = useState({ name: '', phone: '', attendance: 'attend', guests: 1, message: '' });
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const set = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.phone) { toast.error('Nama dan nomor wajib diisi.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setSubmitted(true); toast.success('Konfirmasi terkirim!'); }
      else toast.error('Gagal mengirim, coba lagi.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', background: 'transparent',
    borderBottom: '1px solid var(--border)', padding: '0.5rem 0', outline: 'none',
    color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  } as React.CSSProperties;

  const labelStyle = {
    display: 'block', fontSize: '0.68rem', letterSpacing: '0.2em',
    textTransform: 'uppercase' as const, marginBottom: '0.4rem',
    color: 'var(--sage)', fontFamily: 'var(--font-sans)',
  };

  return (
    <section id="rsvp" className="section-pad relative ">

      {/* Corner PNG */}
      <div className="absolute -top-8 -left-8 pointer-events-none opacity-50">
        <FlorOne
          className="w-20 sm:w-28 md:w-36 lg:w-44" style={{ aspectRatio:'1/1', height:'auto' }}
          rotate={15}
        />
      </div>
      <div className="absolute -bottom-20 -right-8 pointer-events-none opacity-55" style={{ zIndex: 20 }}>
        <FlorFive
          flip
          className="w-28 sm:w-36 md:w-44 lg:w-52" style={{ aspectRatio:'1/1', height:'auto' }}
          rotate={-15}
        />
      </div>
      <div className="absolute -bottom-20 -left-8 pointer-events-none opacity-45" style={{ zIndex: 20 }}>
        <FlorOne
          className="w-24 sm:w-32 md:w-40 lg:w-48" style={{ aspectRatio:'1/1', height:'auto' }}
          rotate={10} flip
        />
      </div>

      <div className="max-w-2xl mx-auto relative">
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <FloCrn
            className="w-9 sm:w-11 md:w-12 lg:w-14" style={{ aspectRatio:'1/1', height:'auto', margin:'0 auto' }}
            opacity={0.85}
          />
          <p className="text-xs tracking-[0.35em] uppercase mt-4 mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            Mohon konfirmasi sebelum {formatDate(weddingConfig.event.reception.date)}
          </p>
          <h2 className="text-sage-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.8rem, 7vw, 4.5rem)' }}>
            RSVP
          </h2>
          <div className="flex justify-center mt-3">
            <WcBranchRow width={240} color="var(--sage)" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.8, type: 'spring' }}
              className="wc-card p-14 text-center relative ">
              {/* Corner flower success */}
              <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
                <FlorSeven
                  className="w-8 sm:w-10 md:w-12 lg:w-14" style={{ aspectRatio:'1/1', height:'auto' }}
                  rotate={20}
                />
              </div>
              <div className="relative">
                <motion.div className="flex justify-center mb-4"
                  animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
                  <FloCrn
                    className="w-10 sm:w-12 md:w-14 lg:w-16" style={{ aspectRatio:'1/1', height:'auto', margin:'0 auto' }}
                    opacity={0.9}
                  />
                </motion.div>
                <h3 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-script)', color: 'var(--moss-dark)' }}>
                  Terima Kasih!
                </h3>
                <WcBrushStroke width={120} color="var(--sage)" opacity={0.4} />
                <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                  Konfirmasi Anda telah kami terima. Kami tidak sabar bertemu Anda!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" ref={formRef} className="wc-card p-8 relative "
              initial={{ opacity: 0, y: 40 }} animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

              {/* Corner flower form */}
              <div className="absolute top-3 right-3 opacity-25 pointer-events-none">
                <FlorSeven
                  className="w-7 sm:w-9 md:w-10 lg:w-11" style={{ aspectRatio:'1/1', height:'auto' }}
                  rotate={25}
                />
              </div>

              <div className="relative space-y-6">
                <div>
                  <label style={labelStyle}>Nama Lengkap *</label>
                  <input value={form.name} onChange={(e) => set('name', e.target.value)}
                    placeholder="Masukkan nama Anda" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nomor WhatsApp *</label>
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    placeholder="08xxxxxxxxxx" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Kehadiran *</label>
                  <div className="flex gap-3 mt-1">
                    {[{ val: 'attend', label: '✓  Hadir' }, { val: 'notAttend', label: '✗  Tidak Hadir' }].map(({ val, label }) => (
                      <motion.button key={val} whileTap={{ scale: 0.97 }}
                        onClick={() => set('attendance', val)}
                        className="flex-1 py-2.5 text-xs tracking-wider uppercase rounded-full transition-all duration-300"
                        style={{
                          fontFamily: 'var(--font-sans)', border: '1px solid',
                          borderColor: form.attendance === val ? 'var(--moss)' : 'var(--border)',
                          background:  form.attendance === val ? 'var(--moss)' : 'transparent',
                          color:       form.attendance === val ? 'white' : 'var(--text-muted)',
                        }}>
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {form.attendance === 'attend' && (
                    <motion.div key="guests"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}
                      className="">
                      <label style={labelStyle}>Jumlah Tamu</label>
                      <select value={form.guests} onChange={(e) => set('guests', Number(e.target.value))} style={inputStyle}>
                        {[1,2,3,4].map((n) => (
                          <option key={n} value={n} style={{ background: 'var(--bg)' }}>{n} orang</option>
                        ))}
                      </select>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label style={labelStyle}>Ucapan & Doa (Opsional)</label>
                  <textarea value={form.message} onChange={(e) => set('message', e.target.value)}
                    placeholder="Tuliskan doa dan ucapan untuk pengantin..."
                    rows={3} style={{ ...inputStyle, resize: 'none' }} />
                </div>

                <motion.button onClick={handleSubmit} disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(74,124,89,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase rounded-full disabled:opacity-50 transition-all"
                  style={{ background: 'var(--moss)', color: 'white', fontFamily: 'var(--font-sans)' }}>
                  {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}