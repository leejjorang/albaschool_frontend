import { EventSourcePolyfill } from "event-source-polyfill";
import { getToken } from "../stores/authStore";
import { NotificationsSSE } from "../types/sse";

export const connectSSE = ({
  onInitialize,
  onNotification,
  onChatRoomInitialize,
  onChatNotification,
}: NotificationsSSE) => {
  const token = getToken();
  const url = `${import.meta.env.VITE_BACKEND_URL}/sse`;

  const eventSource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  eventSource.addEventListener("initialize", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("Initialize event data:", parsedData.hasUnreadNotification);
    onInitialize?.(parsedData.hasUnreadNotification);
  });

  eventSource.addEventListener("notification", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("Notification event data:", parsedData.hasUnreadNotification);
    onNotification?.(parsedData.hasUnreadNotification);
  });

  eventSource.addEventListener("chatRoomInitialize", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("ChatRoomInitialize event data:", parsedData);
    onChatRoomInitialize?.(parsedData);
  });

  eventSource.addEventListener("chatNotification", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("ChatNotification event data:", parsedData);
    onChatNotification?.(parsedData);
  });

  eventSource.addEventListener("error", (error) => {
    console.error("SSE Error:", error);
    eventSource.close();
  });

  return eventSource;
};
