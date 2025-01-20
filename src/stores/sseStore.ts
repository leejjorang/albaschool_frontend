import { create } from "zustand";
import { SSEState } from "../types/sse";

export const useSSEStore = create<SSEState>((set) => ({
  initializeData: [],
  notifications: [],
  chatRoomInitializeData: [],
  chatNotifications: [],
  eventSource: null,
  setInitializeData: (data) => set(() => ({ initializeData: data })),
  addNotification: (data) =>
    set((state) => ({ notifications: [data, ...state.notifications] })),
  setChatRoomInitializeData: (data) =>
    set(() => ({ chatRoomInitializeData: data })),
  addChatNotification: (data) =>
    set((state) => ({
      chatNotifications: [...data, ...state.chatNotifications],
    })),
  setEventSource: (source) => set(() => ({ eventSource: source })),
  clearEventSource: () => set(() => ({ eventSource: null })),
}));
