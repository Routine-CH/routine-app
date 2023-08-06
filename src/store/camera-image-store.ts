import { create } from "zustand";
import { Image } from "../utils/types/types";

export type ImageState = {
  images: Image[];
};

type ImageActions = {
  addImage: (image: Image) => void;
  setImages: (newImages: Image[]) => void;
  removeImage: (imageUri: string | undefined) => void;
  removeExistingImage: (imageUri: string | undefined) => void;
  resetImages: () => void;
};

export const useImageStore = create<ImageState & ImageActions>((set) => ({
  images: [],
  setImages: (newImages: Image[]) => set({ images: newImages }),
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
  removeExistingImage: (imageUrl) =>
    set((state: ImageState) => ({
      images: state.images.filter((image) => image.imageUrl !== imageUrl),
    })),
  resetImages: () => set({ images: [] }),
}));
