'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';
import { WcBranchRow, WcBrushStroke } from '@/components/ui/WatercolorOrnaments';
import { FloCrn, FlorTwo, FlorThree, FlorSix } from '@/components/ui/IlustrationBG';

interface Wish { id: string; name: string; message: string; createdAt: string; }

export default function Wishes() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [wishes, setWishes]   = useState<Wish[]>([]);
  const [form, setForm]       = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(false);

  const fetchWishes = async () => {
    try { const r = await fetch('/api/wishes'); const d = await r.json(); if (d.wishes) setWishes(d.wishes); }
    catch {}
  };
  useEffect(() => { fetchWishes(); const t = setInterval(fetchWishes, 30000); return () => clearInterval(t); }, []);

  const submit = async () => {
    if (!form.name || !form.message) { toast.error('Nama dan pesan wajib diisi.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/wishes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setForm({ name: '', message: '' }); toast.success('Ucapan terkirim!'); fetchWishes(); }
      else toast.error('Gagal mengirim.');
    } catch { toast.error('Terjadi kesalahan.'); }
    finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', background: 'transparent',
    borderBottom: '1px solid var(--border)', padding: '0.5rem 0', outline: 'none',
    color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  } as React.CSSProperties;

  return (
    <section id="wishes" className="section-pad relative overflow-hidden"
      style={{ background: 'var(--bg-2)' }}>

      {/* Corner PNG */}
      <div className="absolute -bottom-8 -right-8 pointer-events-none opacity-50">
        <FlorTwo
          flip
          style={{ width: 'clamp(90px, 12vw, 180px)', aspectRatio: '1/1', height: 'auto' }}
          rotate={-15}
        />
      </div>
      <div className="absolute -top-8 -left-8 pointer-events-none opacity-45">
        <FlorThree
          style={{ width: 'clamp(90px, 12vw, 180px)', aspectRatio: '1/1', height: 'auto' }}
          rotate={10}
        />
      </div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div ref={titleRef} className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <FloCrn
            style={{ width: 'clamp(36px, 5vw, 52px)', aspectRatio: '1/1', height: 'auto', margin: '0 auto' }}
            opacity={0.85}
          />
          <p className="text-xs tracking-[0.35em] uppercase mt-4 mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            Kirimkan Doa Terbaik
          </p>
          <h2 className="text-sage-gradient"
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.8rem, 7vw, 4.5rem)' }}>
            Ucapan & Doa
          </h2>
          <div className="flex justify-center mt-3">
            <WcBranchRow width={240} color="var(--sage)" />
          </div>
        </motion.div>

        {/* Input */}
        <motion.div className="wc-card p-8 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }} animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}>
          <div className="absolute top-3 right-3 opacity-25 pointer-events-none">
            <FlorSix
              style={{ width: 'clamp(28px, 3.5vw, 44px)', aspectRatio: '1/1', height: 'auto' }}
              rotate={20}
            />
          </div>
          <div className="space-y-4">
            <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Nama Anda" style={inputStyle} />
            <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              placeholder="Tuliskan ucapan dan doa..." rows={3} style={{ ...inputStyle, resize: 'none' }} />
            <motion.button onClick={submit} disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(74,124,89,0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-xs tracking-[0.2em] uppercase disabled:opacity-50"
              style={{ background: 'var(--moss)', color: 'white', fontFamily: 'var(--font-sans)' }}>
              <Heart className="w-3 h-3" />
              {loading ? 'Mengirim...' : 'Kirim Ucapan'}
            </motion.button>
          </div>
        </motion.div>

        {/* Wish feed */}
        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {wishes.length === 0 ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-10 italic"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
                Jadilah yang pertama memberikan ucapan!
              </motion.p>
            ) : wishes.map((wish, i) => (
              <motion.div key={wish.id} className="wc-card p-5 relative overflow-hidden"
                initial={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                layout>
                <div className="relative flex items-start gap-3 mb-2">
                  <motion.div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'var(--sage-pale)', color: 'var(--moss)', fontFamily: 'var(--font-sans)' }}
                    whileHover={{ scale: 1.1 }}>
                    {wish.name.charAt(0).toUpperCase()}
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>{wish.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                      {new Date(wish.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <Heart className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: 'var(--sage)' }} />
                </div>
                <p className="pl-12 text-sm italic leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '1rem' }}>
                  "{wish.message}"
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
