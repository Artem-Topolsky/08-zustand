import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub – Your Notes Manager',
  description:
    'NoteHub is a modern app for creating, saving, and managing your notes with ease.',
  openGraph: {
    title: 'NoteHub – Your Notes Manager',
    description:
      'NoteHub is a modern app for creating, saving, and managing your notes with ease.',
    url: 'https://08-zustand-puce-seven.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview image',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
      >
        <TanStackProvider>
          <div className="layout">
            <Header />
            <main className="main">
              {children}
              {modal}
            </main>
            <Footer />
          </div>
          <Toaster />
        </TanStackProvider>
      </body>
    </html>
  );
}
