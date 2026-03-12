'use client';
import Image from 'next/image';

// ╔══════════════════════════════════════════════════════════════════╗
// ║  IllustrationBG.tsx                                             ║
// ║  Wrapper komponen untuk aset PNG ilustrasi dari public/images/  ║
// ║                                                                 ║
// ║  Cara pakai:                                                    ║
// ║    import { FloTop, FloBot, FloCtr, FloCrn, FloMid, FlorOne, FlorTwo, FlorThree, FlorFour, FlorFive, FlorSix, FlorSeven } from '@/components/ui/IlustrationBG' ║
// ║                                                                 ║
// ║  Props semua komponen:                                          ║
// ║    size     — lebar dalam px (height auto mengikuti aspect ratio)║
// ║    opacity  — 0 sampai 1                                        ║
// ║    rotate   — derajat rotasi                                    ║
// ║    className — tambahan class Tailwind jika perlu               ║
// ║    style    — inline style tambahan                             ║
// ╚══════════════════════════════════════════════════════════════════╝

interface IllustProps {
  size?:      number;
  opacity?:   number;
  rotate?:    number;
  flip?:      boolean;  // cermin horizontal scaleX(-1)
  className?: string;
  style?:     React.CSSProperties;
}

// Helper — wrapper styling konsisten untuk semua komponen
function IllustWrapper({
  src, alt, size = 80, opacity = 1, rotate = 0, flip = false, className = '', style = {},
}: IllustProps & { src: string; alt: string }) {
  const transforms = [
    rotate !== 0 ? `rotate(${rotate}deg)` : '',
    flip         ? 'scaleX(-1)'           : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      style={{
        width:      size,
        height:     size,
        position:   'relative',
        opacity,
        transform:  transforms || undefined,
        flexShrink: 0,
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        // Matikan draggable agar tidak mengganggu interaksi
        draggable={false}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// FLOWER — green series (flower-1 s/d flower-5)
// ─────────────────────────────────────────────────────────────────

/** flower-1.png — OpeningGate bottom */
export function FloBot(props: IllustProps) {
  return <IllustWrapper src="/images/flower-1.png" alt="flower bottom" size={320} {...props} />;
}

/** flower-2.png — OpeningGate top */
export function FloTop(props: IllustProps) {
  return <IllustWrapper src="/images/flower-2.png" alt="flower top" size={320} {...props} />;
}

/** flower-3.png — center */
export function FloCtr(props: IllustProps) {
  return <IllustWrapper src="/images/flower-3.png" alt="flower center" size={320} {...props} />;
}

/** flower-4.png — corner */
export function FloCrn(props: IllustProps) {
  return <IllustWrapper src="/images/flower-4.png" alt="flower corner" size={320} {...props} />;
}

/** flower-5.png — mid */
export function FloMid(props: IllustProps) {
  return <IllustWrapper src="/images/flower-5.png" alt="flower mid" size={320} {...props} />;
}

// ─────────────────────────────────────────────────────────────────
// FLOWER — orange/or series (flower-or-1 s/d flower-or-7)
// ─────────────────────────────────────────────────────────────────

/** flower-or-1.png */
export function FlorOne(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-1.png" alt="flower or 1" size={320} {...props} />;
}

/** flower-or-2.png */
export function FlorTwo(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-2.png" alt="flower or 2" size={320} {...props} />;
}

/** flower-or-3.png */
export function FlorThree(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-3.png" alt="flower or 3" size={320} {...props} />;
}

/** flower-or-4.png */
export function FlorFour(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-4.png" alt="flower or 4" size={320} {...props} />;
}

/** flower-or-5.png */
export function FlorFive(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-5.png" alt="flower or 5" size={320} {...props} />;
}

/** flower-or-6.png */
export function FlorSix(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-6.png" alt="flower or 6" size={320} {...props} />;
}

/** flower-or-7.png */
export function FlorSeven(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-7.png" alt="flower or 7" size={320} {...props} />;
}

// ─────────────────────────────────────────────────────────────────
// Tambah komponen baru di sini:
// /** nama-file.png */
// export function NamaKomponen(props: IllustProps) {
//   return <IllustWrapper src="/images/nama-file.png" alt="deskripsi" size={320} {...props} />;
// }
// ─────────────────────────────────────────────────────────────────
