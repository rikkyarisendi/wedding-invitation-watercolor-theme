import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { weddingConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `${weddingConfig.groom.nickname} & ${weddingConfig.bride.nickname} — ${weddingConfig.hashtag}`,
  description: `Undangan Pernikahan ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Toaster position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: 'Jost, sans-serif',
              background: 'var(--cream)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
            },
          }}
        />
      </body>
    </html>
  );
}
