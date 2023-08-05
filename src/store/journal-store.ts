import { create } from "zustand";
import { getUserJournals } from "../data/journal/fetch-requests";
import { AllUserJournals } from "../utils/types/types";

export type JournalState = {
  userJournals: AllUserJournals;
  isLoading: boolean;
  dataUpdated: boolean;
};

type JournalActions = {
  setUserJournals: (journals: AllUserJournals) => void;
  loadUserJournals: () => Promise<void>;
  setDataUpdated: (updated: boolean) => void;
};

export const useJournalStore = create<JournalState & JournalActions>((set) => ({
  userJournals: [],
  isLoading: false,
  dataUpdated: false,
  setUserJournals: (journals) => set({ userJournals: journals }),
  setDataUpdated: (updated) => set({ dataUpdated: updated }),
  loadUserJournals: async () => {
    set({ isLoading: true });
    try {
      const journals = await getUserJournals();
      set({ userJournals: journals, dataUpdated: false });
    } catch (error) {
      console.error("Failed to get user journals", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
