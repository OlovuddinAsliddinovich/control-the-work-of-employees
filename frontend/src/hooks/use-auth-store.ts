import { create } from "zustand";
import { UserType } from "../interfaces";

interface AuthState {
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  setLoggedIn: (status) => set({ loggedIn: status }),
  user: null,
  setUser: (user) => set({ user }),
}));
