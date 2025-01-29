interface Notification {
  id: string;
  content: string;
  title: string;
  target: string;
  isChecked: boolean;
  createdAt: string;
}

interface UnreadChats {
  isNewMessage: boolean;
}

interface UnreadNotifications {
  hasUnreadNotification: boolean;
}

export interface NotificationsSSE {
  onInitialize?: (data: boolean) => void;
  onNotification?: (data: boolean) => void;
  onChatRoomInitialize?: (data: boolean) => void;
  onChatNotification?: (data: boolean) => void;
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
