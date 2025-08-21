import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});


type Tags = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo" | undefined;
type SortBy = "created" | "updated" | undefined;


interface FetchNotes {
  notes: Note[];
  totalPages: number;
}

interface Error {
  message: string;
  error?: string;
}

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: Tags,
  sortBy?: SortBy
) => {
  const { data } = await api.get<FetchNotes>("notes", {
    params: { search, page, perPage, tag, sortBy },
  });
  return data;
};


export const createNote = async (title: string, content: string, tag: string) => {
  const { data } = await api.post<Note | Error>("notes", { title, content, tag });
  return data;
};


export const fetchNoteById = async (id: string) => {
  const { data } = await api.get<Note>(`notes/${id}`);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete<Note>(`notes/${id}`);
  return data;
};