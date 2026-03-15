'use client';
import React from 'react';

// ╔══════════════════════════════════════════════════════════════╗
// ║  WatercolorOrnaments.tsx — Semua SVG watercolor ada di sini ║
// ║                                                              ║
// ║  Cari // 🎨 SVG: NamaKomponen untuk edit masing-masing      ║
// ║                                                              ║
// ║  Komponen:                                                   ║
// ║   1. WcBlob         — blob organik background watercolor    ║
// ║   2. WcLeaf         — daun botanical tunggal                ║
// ║   3. WcBranchRow    — ranting dengan daun berulang          ║
// ║   4. WcSplatter     — cipratan cat air                      ║
// ║   5. WcFlower       — bunga sederhana                       ║
// ║   6. WcBrushStroke  — sapuan kuas horizontal                ║
// ║   7. WcCircle       — lingkaran organik tidak sempurna      ║
// ╚══════════════════════════════════════════════════════════════╝


// ─────────────────────────────────────────────────────────────────
// 1. WC BLOB
//    Background blob organik — efek cat air menggenang
//    Ubah: path d= untuk reshape blob
//    Ubah: opacity untuk intensitas
//    Ubah: color untuk warna blob
// ─────────────────────────────────────────────────────────────────
export function WcBlob({ size = 400, color = 'var(--sage-pale)', opacity = 0.6, rotate = 0 }: {
  size?: number; color?: string; opacity?: number; rotate?: number;
}) {
  return (
    // 🎨 SVG: WcBlob — blob organik watercolor background
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none"
      style={{ opacity, transform: `rotate(${rotate}deg)`, filter: 'blur(2px)' }}>
      {/* Ganti d= untuk reshape blob — gunakan tool seperti blobmaker.app */}
      <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-1C87,14.3,81.4,28.6,73.1,41.1C64.8,53.6,53.7,64.3,40.5,71.5C27.3,78.7,13.7,82.3,-0.5,83.1C-14.6,83.9,-29.2,81.7,-42.3,75.5C-55.4,69.2,-67,58.8,-74.8,45.8C-82.7,32.7,-86.8,16.4,-85.5,0.8C-84.2,-14.8,-77.5,-29.6,-68.5,-42.6C-59.5,-55.7,-48.2,-67,-35.1,-74.4C-22,-81.8,-11,-85.3,1.9,-88.3C14.8,-91.4,30.6,-83.7,44.7,-76.4Z"
        fill={color} transform="translate(100 100)" />
      {/* Inner lighter blob untuk depth effect */}
      <path d="M30,-52C39.4,-47.3,47.5,-39.5,52.8,-29.9C58.2,-20.4,60.9,-9.2,59.8,1.5C58.8,12.3,54,24.5,47.1,35.1C40.2,45.7,31.1,54.7,20.1,59.7C9.1,64.7,-3.8,65.7,-15.7,62C-27.6,58.3,-38.4,49.9,-46.8,39.2C-55.2,28.5,-61.1,15.6,-62.2,2.1C-63.3,-11.4,-59.6,-25.4,-52.1,-36.7C-44.6,-48,-33.4,-56.7,-21.4,-61.1C-9.3,-65.5,3.5,-65.7,15.5,-62.1C27.5,-58.5,20.6,-56.7,30,-52Z"
        fill={color} fillOpacity="0.4" transform="translate(100 100)" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 2. WC LEAF
//    Daun botanical tunggal
//    Ubah: path untuk bentuk daun (M = mulai, C = kurva bezier)
//    Ubah: strokeWidth untuk ketebalan garis
//    Ubah: rotate untuk rotasi daun
// ─────────────────────────────────────────────────────────────────
export function WcLeaf({ size = 60, color = 'var(--sage)', opacity = 0.7, rotate = 0 }: {
  size?: number; color?: string; opacity?: number; rotate?: number;
}) {
  return (
    // 🎨 SVG: WcLeaf — daun botanical watercolor
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}>
      {/* Bentuk daun — C = cubic bezier: C controlPoint1 controlPoint2 endpoint */}
      <path d="M20 52 C20 52 2 38 2 22 C2 10 10 2 20 4 C30 2 38 10 38 22 C38 38 20 52 20 52 Z"
        fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8"/>
      {/* Tulang daun utama */}
      <path d="M20 52 C20 40 20 28 20 4" stroke={color} strokeWidth="0.6" opacity="0.6"/>
      {/* Tulang daun kiri — ganti angka untuk atur sudut & panjang */}
      <path d="M20 20 C16 16 12 14 8 14" stroke={color} strokeWidth="0.4" opacity="0.4"/>
      <path d="M20 28 C15 24 10 22 6 22" stroke={color} strokeWidth="0.4" opacity="0.4"/>
      <path d="M20 36 C16 32 12 31 8 31" stroke={color} strokeWidth="0.4" opacity="0.4"/>
      {/* Tulang daun kanan */}
      <path d="M20 20 C24 16 28 14 32 14" stroke={color} strokeWidth="0.4" opacity="0.4"/>
      <path d="M20 28 C25 24 30 22 34 22" stroke={color} strokeWidth="0.4" opacity="0.4"/>
      <path d="M20 36 C24 32 28 31 32 31" stroke={color} strokeWidth="0.4" opacity="0.4"/>
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 3. WC BRANCH ROW
//    Ranting dengan daun — dipakai sebagai divider section
//    Ubah: leafCount untuk jumlah daun
//    Ubah: width untuk total lebar
//    Ubah: color untuk warna ranting & daun
// ─────────────────────────────────────────────────────────────────
export function WcBranchRow({ width = 300, color = 'var(--sage)' }: {
  width?: number; color?: string;
}) {
  const cx = width / 2;
  return (
    // 🎨 SVG: WcBranchRow — ranting botanical divider
    <svg width={width} height={50} viewBox={`0 0 ${width} 50`} fill="none"
      style={{ display: 'block', overflow: 'hidden' }}>
      {/* Batang ranting kiri */}
      <path d={`M${cx} 25 C${cx-30} 25 ${cx-80} 22 ${cx-130} 25`}
        stroke={color} strokeWidth="0.8" opacity="0.5"/>
      {/* Batang ranting kanan */}
      <path d={`M${cx} 25 C${cx+30} 25 ${cx+80} 22 ${cx+130} 25`}
        stroke={color} strokeWidth="0.8" opacity="0.5"/>

      {/* Daun kiri — M = posisi dasar daun, C = bezier kurva daun */}
      {[
        { x: cx-45,  y: 25, rot: -30, s: 0.6 },
        { x: cx-80,  y: 24, rot: -20, s: 0.7 },
        { x: cx-110, y: 25, rot: -35, s: 0.55 },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.rot}) scale(${l.s})`}>
          <path d="M0 0 C-5 -8 -5 -16 0 -20 C5 -16 5 -8 0 0 Z"
            fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.6"/>
          <path d="M0 0 L0 -20" stroke={color} strokeWidth="0.4" opacity="0.4"/>
        </g>
      ))}

      {/* Daun kanan */}
      {[
        { x: cx+45,  y: 25, rot: 30,  s: 0.6 },
        { x: cx+80,  y: 24, rot: 20,  s: 0.7 },
        { x: cx+110, y: 25, rot: 35,  s: 0.55 },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.rot}) scale(${l.s})`}>
          <path d="M0 0 C-5 -8 -5 -16 0 -20 C5 -16 5 -8 0 0 Z"
            fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.6"/>
          <path d="M0 0 L0 -20" stroke={color} strokeWidth="0.4" opacity="0.4"/>
        </g>
      ))}

      {/* Bunga kecil di tengah */}
      {[-1,0,1].map((offset, i) => (
        <g key={i} transform={`translate(${cx + offset * 10}, 18)`}>
          {[0,72,144,216,288].map((angle, j) => (
            <ellipse key={j} cx="0" cy="-4" rx="1.5" ry="3"
              fill={color} fillOpacity="0.35"
              transform={`rotate(${angle})`}/>
          ))}
          <circle cx="0" cy="0" r="1.5" fill={color} fillOpacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 4. WC SPLATTER
//    Cipratan cat air tidak beraturan
//    Ubah: jumlah & radius circle untuk ukuran cipratan
//    Ubah: posisi cx/cy untuk sebaran titik
// ─────────────────────────────────────────────────────────────────
export function WcSplatter({ size = 120, color = 'var(--sage-light)', opacity = 0.4 }: {
  size?: number; color?: string; opacity?: number;
}) {
  // Posisi titik-titik cipratan — ubah cx/cy/r sesuka hati
  const dots = [
    { cx: 60, cy: 60, r: 18 }, { cx: 30, cy: 45, r: 8 },
    { cx: 85, cy: 35, r: 6  }, { cx: 20, cy: 75, r: 5 },
    { cx: 90, cy: 80, r: 10 }, { cx: 50, cy: 20, r: 4 },
    { cx: 70, cy: 90, r: 7  }, { cx: 15, cy: 55, r: 3 },
    { cx: 95, cy: 55, r: 5  }, { cx: 40, cy: 95, r: 4 },
  ];
  return (
    // 🎨 SVG: WcSplatter — cipratan cat air
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none"
      style={{ opacity, filter: 'blur(1.5px)' }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color} fillOpacity={0.6 - i * 0.04}/>
      ))}
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 5. WC FLOWER
//    Bunga watercolor sederhana
//    Ubah: petalCount untuk jumlah kelopak
//    Ubah: rx/ry ellips untuk proporsi kelopak
//    Ubah: r circle center untuk ukuran inti
// ─────────────────────────────────────────────────────────────────
export function WcFlower({ size = 60, color = 'var(--sage)', opacity = 0.7 }: {
  size?: number; color?: string; opacity?: number;
}) {
  const petals = 5;
  return (
    // 🎨 SVG: WcFlower — bunga watercolor
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      {Array.from({ length: petals }).map((_, i) => (
        // rx = lebar kelopak, ry = panjang kelopak, cy = jarak dari pusat
        <ellipse key={i} cx="30" cy="14" rx="5" ry="12"
          fill={color} fillOpacity="0.2"
          stroke={color} strokeWidth="0.5"
          transform={`rotate(${(360 / petals) * i} 30 30)`}/>
      ))}
      {/* Lingkaran tengah */}
      <circle cx="30" cy="30" r="7" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.6"/>
      <circle cx="30" cy="30" r="3.5" fill={color} fillOpacity="0.5"/>
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 6. WC BRUSH STROKE
//    Sapuan kuas horizontal — dipakai sebagai underline/divider
//    Ubah: path d= untuk bentuk sapuan
//    Ubah: strokeWidth untuk ketebalan kuas
// ─────────────────────────────────────────────────────────────────
export function WcBrushStroke({ width = 200, color = 'var(--sage-light)', opacity = 0.5 }: {
  width?: number; color?: string; opacity?: number;
}) {
  return (
    // 🎨 SVG: WcBrushStroke — sapuan kuas horizontal
    <svg width={width} height={16} viewBox={`0 0 ${width} 16`} fill="none" style={{ opacity, display: 'block', overflow: 'hidden' }}>
      {/* Sapuan utama — ganti Q control point untuk atur lengkung */}
      <path d={`M4 10 Q${width*0.25} 6 ${width*0.5} 9 Q${width*0.75} 12 ${width-4} 8`}
        stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.35"
        style={{ filter: 'blur(1px)' }}/>
      {/* Sapuan tipis di atas */}
      <path d={`M8 8 Q${width*0.3} 5 ${width*0.6} 7 Q${width*0.8} 9 ${width-6} 6`}
        stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────────
// 7. WC CIRCLE
//    Lingkaran organik tidak sempurna — frame foto / highlight
//    Ubah: path d= untuk mengatur ketidak-sempurnaan bentuk
//    Ubah: strokeWidth untuk ketebalan garis
// ─────────────────────────────────────────────────────────────────
export function WcCircle({ size = 160, color = 'var(--sage)', opacity = 0.4 }: {
  size?: number; color?: string; opacity?: number;
}) {
  return (
    // 🎨 SVG: WcCircle — lingkaran organik tidak sempurna
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      {/* Garis luar — organik, tidak sempurna, seperti kuas */}
      <path d="M50 5 C72 3 95 22 97 45 C99 68 82 92 58 96 C34 100 8 84 4 60 C0 36 16 8 40 5 C44 4.5 47 5.2 50 5 Z"
        fill={color} fillOpacity="0.08"
        stroke={color} strokeWidth="1.5"
        style={{ filter: 'blur(0.5px)' }}/>
      {/* Inner faint ring */}
      <path d="M50 12 C68 10 88 26 90 46 C92 66 77 86 56 90 C35 94 12 80 9 59 C6 38 20 14 42 12 C44.5 11.7 47 12 50 12 Z"
        stroke={color} strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}