import { create } from "zustand";
import { LoadingState } from "../interfaces";

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: () => set((prev) => ({ isLoading: !prev.isLoading })),
}));
