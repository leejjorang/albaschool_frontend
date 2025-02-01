import { create } from "zustand";

interface ChatScrollState {
  isNewMessage: boolean;
  triggerScroll: () => void;
}

export const useChatScrollStore = create<ChatScrollState>((set) => ({
  isNewMessage: false,
  triggerScroll: () => set({ isNewMessage: true }),
}));
