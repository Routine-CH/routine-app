import { create } from "zustand";

type ImageState = {
  images: string[];
  addImage: (imageUri: string) => void;
  removeImage: (imageUri: string) => void;
  resetImages: () => void;
};

export const useStore = create<ImageState>((set) => ({
  images: [],
  addImage: (imageUri) =>
    set((state) => {
      if (state.images.length < 4) {
        return { images: [...state.images, imageUri] };
      } else {
        return state;
      }
    }),
  removeImage: (imageUri) =>
    set((state) => ({
      images: state.images.filter((image) => image !== imageUri),
    })),
  resetImages: () => set({ images: [] }),
}));
