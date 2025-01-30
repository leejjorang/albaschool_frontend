export interface NotificationsSSE {
  onInitialize?: (data: boolean) => void;
  onNotification?: (data: boolean) => void;
  onChatRoomInitialize?: (data: boolean) => void;
  onChatNotification?: (data: boolean) => void;
}
