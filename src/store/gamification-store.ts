import { create } from "zustand";
import { getUserBadgeById } from "../data/badge/fetch-requests";

type GamificationContent = {
  title: string;
  description: string;
  imageUrl: string;
};

type BadgeById = {
  title: string;
  description: string;
  imageUrl: string;
  assignedAt: string;
};

type GamificationState = {
  isLoading: boolean;
  showGamificationModal: boolean;
  modalContent: GamificationContent | null;
  badge: BadgeById | null;
};

type GamificationActions = {
  onOpenGamificationModal: (content: GamificationContent | null) => void;
  closeGamificationModal: () => void;
  loadBadgeById: (id: string) => Promise<void>;
};

export const useGamificationStore = create<
  GamificationState & GamificationActions
>((set) => ({
  isLoading: false,
  showGamificationModal: false,
  modalContent: null,
  badge: null,
  onOpenGamificationModal: (content) =>
    set({ showGamificationModal: true, modalContent: content }),
  closeGamificationModal: () =>
    set({ showGamificationModal: false, modalContent: null }),
  loadBadgeById: async (id: string) => {
    set({ isLoading: true });
    try {
      const badge = await getUserBadgeById(id);
      set({ badge: badge });
    } catch (error) {
      console.error("Failed to get user badges", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
