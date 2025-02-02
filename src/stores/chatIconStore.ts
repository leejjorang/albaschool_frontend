import { create } from "zustand";

interface ChatIconState {
  shake: boolean;
  setShake: (status: boolean) => void;
}

export const chatIconStore = create<ChatIconState>((set) => ({
  shake: false,
  setShake: (status) => set({ shake: status }),
}));
