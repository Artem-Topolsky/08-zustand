import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes, getCategories, Tags } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

interface NotesFilterProps {
  params: Promise<{ slug: Tags }>;
}

export const dynamicParams = false;
export const revalidate = 900;

const descriptions: Record<string, string> = {
  All: 'All your notes in one place.',
  Work: 'Notes for your work projects.',
  Todo: 'Track your tasks and to-dos.',
  Personal: 'Your personal notes, safely stored.',
  Meeting: 'Meeting notes and summaries.',
  Shopping: 'Your shopping lists organized.',
};

export async function generateMetadata({
  params,
}: NotesFilterProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] || 'All';

  return {
    title: `NoteHub – ${category} Notes`,
    description: descriptions[category] || 'Browse your notes in NoteHub.',
    openGraph: {
      title: `NoteHub – ${category} Notes`,
      description: descriptions[category] || 'Browse your notes in NoteHub.',
      url: `https://08-zustand-puce-seven.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub – ${category} Notes`,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
  };
}

export const generateStaticParams = async () => {
  const categories = getCategories;
  return categories.map((category) => ({ slug: [category] }));
};

export default async function NotesFilter({ params }: NotesFilterProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const categories = getCategories;
  const category = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, category }],
    queryFn: () => fetchNotes('', 1, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient categories={categories} category={category} />
    </HydrationBoundary>
  );
}
