import { create } from "zustand";

interface ChatState {
  unreadMessages: boolean;
  setUnreadMessages: (status: boolean) => void;
}

export const chatNotificationStore = create<ChatState>((set) => ({
  unreadMessages: false,
  setUnreadMessages: (status) => set({ unreadMessages: status }),
}));
