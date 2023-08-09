import { create } from "zustand";
import { ToastType } from "../utils/types/enums";

type ToastMessageState = {
  isLoading: boolean;
  isVisible: boolean;
  message: string;
  type: ToastType;
};

type ToastMessageAction = {
  startLoading: () => void;
  stopLoading: () => void;
  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
};

export const useToastMessageStore = create<
  ToastMessageState & ToastMessageAction
>((set, get) => ({
  isLoading: false,
  isVisible: false,
  message: "",
  type: ToastType.info,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => {
    set((state) => {
      if (state.isVisible) {
        setTimeout(() => set({ isVisible: true }), 1000);
      }
      return { isLoading: false };
    });
  },
  showToast: (type, message) => set({ isVisible: true, type, message }),
  hideToast: () => set({ isVisible: false, message: "", type: ToastType.info }),
}));
