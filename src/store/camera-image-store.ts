import { create } from "zustand";
import { Image } from "../utils/types/types";

export type ImageState = {
  images: Image[];
  addImage: (image: Image) => void;
  removeImage: (imageUri: string) => void;
  resetImages: () => void;
};

export const useStore = create<ImageState>((set) => ({
  images: [],
  addImage: (image) =>
    set((state: ImageState) => {
      if (state.images.length < 4) {
        return { images: [...state.images, image] };
      } else {
        return state;
      }
    }),
  removeImage: (imageUri) =>
    set((state: ImageState) => ({
      images: state.images.filter((image) => image.uri !== imageUri),
    })),
  resetImages: () => set({ images: [] }),
}));
