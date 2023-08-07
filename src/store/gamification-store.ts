import { create } from "zustand";

type GamificationContent = {
  title: string;
  description: string;
  imageUrl: string;
};

type GamificationState = {
  showGamificationModal: boolean;
  modalContent: GamificationContent | null;
};

type GamificationActions = {
  onOpenGamificationModal: (content: GamificationContent | null) => void;
  closeGamificationModal: () => void;
};

export const useGamificationStore = create<
  GamificationState & GamificationActions
>((set) => ({
  showGamificationModal: false,
  modalContent: null,
  onOpenGamificationModal: (content) =>
    set({ showGamificationModal: true, modalContent: content }),
  closeGamificationModal: () =>
    set({ showGamificationModal: false, modalContent: null }),
}));
