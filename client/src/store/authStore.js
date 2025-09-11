import { create } from "zustand";

export const authStore = create((set) => ({
  authUser: null,
  setAuthUser: (user) => set({ authUser: user }),
}));
