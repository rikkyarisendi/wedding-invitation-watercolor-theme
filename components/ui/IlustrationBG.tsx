'use client';
import Image from 'next/image';

interface IllustProps {
  size?:      number;
  opacity?:   number;
  rotate?:    number;
  flip?:      boolean;
  className?: string;
  style?:     React.CSSProperties;
}

// size diisi  -> ukuran fixed px, className diabaikan untuk width/height
// size kosong -> className (w-* h-* Tailwind) yang kontrol ukuran
function IllustWrapper({
  src, alt, size, opacity = 1, rotate = 0, flip = false, className = '', style = {},
}: IllustProps & { src: string; alt: string }) {
  const transforms = [
    rotate !== 0 ? `rotate(${rotate}deg)` : '',
    flip         ? 'scaleX(-1)'           : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      style={{
        width:      size !== undefined ? size : undefined,
        height:     size !== undefined ? size : undefined,
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
        width={500}
        height={500}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  );
}

// FLOWER green series
export function FloBot(props: IllustProps) {
  return <IllustWrapper src="/images/flower-1.png" alt="flower bottom" {...props} />;
}
export function FloTop(props: IllustProps) {
  return <IllustWrapper src="/images/flower-2.png" alt="flower top" {...props} />;
}
export function FloCtr(props: IllustProps) {
  return <IllustWrapper src="/images/flower-3.png" alt="flower center" {...props} />;
}
export function FloCrn(props: IllustProps) {
  return <IllustWrapper src="/images/flower-4.png" alt="flower corner" {...props} />;
}
export function FloMid(props: IllustProps) {
  return <IllustWrapper src="/images/flower-5.png" alt="flower mid" {...props} />;
}

// FLOWER orange series
export function FlorOne(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-1.png" alt="flower or 1" {...props} />;
}
export function FlorTwo(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-2.png" alt="flower or 2" {...props} />;
}
export function FlorThree(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-3.png" alt="flower or 3" {...props} />;
}
export function FlorFour(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-4.png" alt="flower or 4" {...props} />;
}
export function FlorFive(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-5.png" alt="flower or 5" {...props} />;
}
export function FlorSix(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-6.png" alt="flower or 6" {...props} />;
}
export function FlorSeven(props: IllustProps) {
  return <IllustWrapper src="/images/flower-or-7.png" alt="flower or 7" {...props} />;
}