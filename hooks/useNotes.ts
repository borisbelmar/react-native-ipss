import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import type { CreateNoteInput, Note, UpdateNoteInput } from "../types/note";

const STORAGE_KEY = "notes";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const data: Note[] = raw ? JSON.parse(raw) : [];
      setNotes(data);
    } catch {
      setError("No se pudieron cargar las notas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const persist = async (newNotes: Note[]) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const createNote = async (input: CreateNoteInput): Promise<void> => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    await persist([...notes, newNote]);
  };

  const updateNote = async (
    id: string,
    input: UpdateNoteInput,
  ): Promise<void> => {
    const updated = notes.map((n) => (n.id === id ? { ...n, ...input } : n));
    await persist(updated);
  };

  const deleteNote = async (id: string): Promise<void> => {
    await persist(notes.filter((n) => n.id !== id));
  };

  return {
    notes,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
  };
}
