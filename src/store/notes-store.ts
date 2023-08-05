import { create } from "zustand";
import { getUserNotes } from "../data/note/fetch-request";
import { AllUserNotes, UserNotes } from "../utils/types/types";

export type NotesState = {
  userNotes: AllUserNotes;
  isLoading: boolean;
  dataUpdated: boolean;
};

type NotesAction = {
  setUserNotes: (notes: AllUserNotes) => void;
  loadUserNotes: () => Promise<void>;
  setDataUpdated: (updated: boolean) => void;
  getNoteById: (id: string) => UserNotes | undefined;
};

export const useNotesStore = create<NotesState & NotesAction>((set, get) => ({
  userNotes: [],
  isLoading: false,
  dataUpdated: false,
  setUserNotes: (notes) => set({ userNotes: notes }),
  setDataUpdated: (updated) => set({ dataUpdated: updated }),
  loadUserNotes: async () => {
    set({ isLoading: true });
    try {
      const notes = await getUserNotes();
      set({ userNotes: notes, dataUpdated: false });
    } catch (error) {
      console.error("Failed to get user notes", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getNoteById: (id: string) => {
    const notes = get().userNotes;
    return notes.find((note) => note.id === id);
  },
}));
