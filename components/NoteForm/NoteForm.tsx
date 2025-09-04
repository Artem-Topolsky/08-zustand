'use client';

import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { createNote, Tags } from '@/lib/api';
import toast from 'react-hot-toast';
import { FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface NoteFormProps {
  categories: Tags;
}

export default function NoteForm({ categories }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createNote(draft.title, draft.content, draft.tag);
      toast.success('Note created successfully!');
      clearDraft();

      queryClient.invalidateQueries({ queryKey: ['notes'], exact: false });

      router.push('/notes/filter/All');
    } catch {
      toast.error('Error creating note.');
    }
  };

  const handleCancel = () => router.back();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          required
          minLength={3}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          {categories
            .filter((c) => c !== 'All')
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
