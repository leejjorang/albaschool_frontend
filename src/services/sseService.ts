import { EventSourcePolyfill } from "event-source-polyfill";
import { useSSEStore } from "../stores/sseStore";

export const connectSSE = () => {
  const token = import.meta.env.VITE_BACKEND_TOKEN;
  const url = `${import.meta.env.VITE_BACKEND_URL}/notifications`;

  const eventSource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {
    setInitializeData,
    addNotification,
    setChatRoomInitializeData,
    addChatNotification,
  } = useSSEStore.getState();

  eventSource.addEventListener("initialize", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("Initialize event data:", parsedData);
    setInitializeData(parsedData.data); //테스트해보고 수정
  });

  eventSource.addEventListener("notification", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("Notification event data:", parsedData);
    addNotification(parsedData);
  });

  eventSource.addEventListener("chatRoomInitialize", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("ChatRoomInitialize event data:", parsedData);
    setChatRoomInitializeData(parsedData);
  });

  eventSource.addEventListener("chatNotification", (event) => {
    const parsedData = JSON.parse((event as MessageEvent).data);
    console.log("ChatNotification event data:", parsedData);
    addChatNotification(parsedData);
  });

  eventSource.addEventListener("error", (error) => {
    console.error("SSE Error:", error);
    eventSource.close();
  });

  return eventSource;
};
