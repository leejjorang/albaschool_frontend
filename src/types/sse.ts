interface Notification {
  id: string;
  content: string;
  title: string;
  target: string;
  isChecked: boolean;
  createdAt: string;
}

interface ChatNotification {
  id: string;
  title: string;
  lastMessage: string;
  notReadCount: number;
  memberCount: number;
}

export interface SSEState {
  initializeData: Notification[];
  notifications: Notification[];
  chatRoomInitializeData: ChatNotification[];
  chatNotifications: ChatNotification[];
  setInitializeData: (data: Notification[]) => void;
  addNotification: (data: Notification) => void;
  setChatRoomInitializeData: (data: ChatNotification[]) => void;
  addChatNotification: (data: ChatNotification[]) => void;
  eventSource: EventSource | null;
  setEventSource: (source: EventSource | null) => void;
  clearEventSource: () => void;
}
