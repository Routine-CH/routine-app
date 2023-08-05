import { create } from "zustand";
import { useUserNote } from "../hooks/notes/use-user-note";
import { AllUserNotes } from "../utils/types/types";

export type NotesState = {
  userNotes: AllUserNotes;
  isLoading: boolean;
  dataUpdated: boolean;
};

type NotesAction = {
  setUserNotes: (notes: AllUserNotes) => void;
  loadUserNotes: () => Promise<void>;
  setDataUpdated: (updated: boolean) => void;
};

export const useNotesStore = create<NotesState & NotesAction>((set) => ({
  userNotes: [],
  isLoading: false,
  dataUpdated: false,
  setUserNotes: (notes) => set({ userNotes: notes }),
  setDataUpdated: (updated) => set({ dataUpdated: updated }),
  loadUserNotes: async () => {
    set({ isLoading: true });
    try {
      const notes = await useUserNote();
      set({ userNotes: notes, dataUpdated: false });
    } catch (error) {
      console.error("Failed to get user notes", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
