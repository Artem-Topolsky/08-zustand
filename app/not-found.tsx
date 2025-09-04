import type { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'NoteHub – Page Not Found',
  description: 'Sorry, the page you are looking for does not exist on NoteHub.',
  openGraph: {
    title: 'NoteHub – Page Not Found',
    description:
      'Sorry, the page you are looking for does not exist on NoteHub.',
    url: 'https://08-zustand-puce-seven.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 page preview',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
