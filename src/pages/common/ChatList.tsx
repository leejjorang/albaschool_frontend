import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatListBox from "../../components/chat/ChatListBox";
import { io, Socket } from "socket.io-client";
import { IChatRoom } from "../../types/chat";
import { getToken } from "../../stores/authStore";
import { chatNotificationStore } from "../../stores/chatNotificationStore";

const ChatList = () => {
  const [displayData, setDisplayData] = useState<IChatRoom[]>([]);
  const socketRef = useRef<Socket>();
  const token = getToken();
  const setUnreadMessages = chatNotificationStore(
    (state) => state.setUnreadMessages
  );

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
      path: "/socket.io/",
      transports: ["websocket"],
      auth: {
        token: `Bearer ${token}`,
      },
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("연결 완료", socket.id);
    });

    socket.on("initialize", (initialData) => {
      setDisplayData(initialData.data);
    });

    socket.on("chatLists", (updatedChatLists) => {
      setDisplayData(updatedChatLists.data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socketRef, token]);

  useEffect(() => {
    setUnreadMessages(false);
  }, [setUnreadMessages]);

  return (
    <ChatListStyle>
      {displayData.map((message) => (
        <ChatListBox
          key={message.id}
          id={message.id}
          storeName={message.title}
          headCount={message.memberCount}
          lastMessage={message.lastMessage || "메세지가 없습니다."}
          time="오전 11:00"
          badge={message.notReadCount}
        />
      ))}
    </ChatListStyle>
  );
};

export default ChatList;

const ChatListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`;
