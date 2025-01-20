import { useState, useEffect } from "react";
import styled from "styled-components";
import ChatListBox from "../../components/chat/ChatListBox";
import { useSSEStore } from "../../stores/sseStore";

const ChatList = () => {
  const chatRoomInitializeData = useSSEStore(
    (state) => state.chatRoomInitializeData
  );
  const chatNotifications = useSSEStore((state) => state.chatNotifications);
  const roomNum = chatRoomInitializeData.length;

  const [displayData, setDisplayData] = useState(
    chatNotifications.length > 0
      ? chatNotifications.slice(0, roomNum)
      : chatRoomInitializeData
  );

  useEffect(() => {
    if (chatNotifications.length > 0) {
      setDisplayData(chatNotifications.slice(0, roomNum));
    }
  }, [chatNotifications, roomNum]);

  return (
    <ChatListStyle>
      {displayData.map((message) => {
        return (
          <ChatListBox
            key={message.id}
            id={message.id}
            storeName={message.title}
            headCount={message.memberCount}
            lastMessage={message.lastMessage || "메세지가 없습니다."}
            time="오전 11:00"
            badge={message.notReadCount}
          />
        );
      })}
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
