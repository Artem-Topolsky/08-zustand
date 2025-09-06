import NoteForm from '@/components/NoteForm/NoteForm';
import { getCategories } from '@/lib/api';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NoteHub - Create Note',
  description: 'Create and save your new note quickly and easily.',
  openGraph: {
    title: 'NoteHub - Create Note',
    description: 'Create and save your new note quickly and easily.',
    url: 'https://08-zustand-puce-seven.vercel.app/notes/action/create',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create a new note on NoteHub',
      },
    ],
    type: 'article',
  },
};

const CreateNote = async () => {
  const categories = await getCategories();

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm categories={categories} />
      </div>
    </main>
  );
};

export default CreateNote;
