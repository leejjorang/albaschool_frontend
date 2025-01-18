import styled from "styled-components";
import ChatListBox from "../../components/chat/ChatListBox";
import { useEffect, useState } from "react";

import { EventSourcePolyfill } from "event-source-polyfill";

interface MessageData {
  id: string;
  title: string;
  lastMessage: string;
  notReadCount: number;
  memberCount: number;
}

const ChatList = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const token = import.meta.env.VITE_BACKEND_TOKEN;

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_BACKEND_URL}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    eventSource.addEventListener("chatRoomInitialize", (event) => {
      try {
        const jsonData: MessageData[] = JSON.parse((event as MessageEvent).data);
        setMessages(jsonData); // 데이터 덮어쓰기
      } catch (error) {
        console.error("JSON 파싱 실패:", error);
      }
    });

    return () => {
      eventSource.close();
    };

  }, [token]);

  return (
    <ChatListStyle>
      {messages.map((message) => {
        return <ChatListBox key={message.id} id={message.id} storeName={message.title} headCount={message.memberCount} lastMessage={message.lastMessage||'메세지가 없습니다.'} time="오전 11:00" />
      })}
    </ChatListStyle>
  );
}

export default ChatList;


const ChatListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`