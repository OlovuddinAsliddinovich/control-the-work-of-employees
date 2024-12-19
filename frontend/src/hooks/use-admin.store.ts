import { create } from "zustand";
import { AdminType } from "../interfaces";

interface AdminState {
  isAdmin: boolean;
  setIsAdmin: (status: boolean) => void;
  admin: AdminType | null;
  setAdmin: (admin: AdminType | null) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  setIsAdmin: (status) => set({ isAdmin: status }),

  admin: { username: "", password: "", role: "" },
  setAdmin: (admin) => set({ admin }),
}));
