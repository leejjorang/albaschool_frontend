import styled from "styled-components";
import AlertChat from "./AlertChat";
import YourChat from "./YourChat";
import MyChat from "./MyChat";

import { jwtDecode } from 'jwt-decode';
import { formatDate, formatTime } from "../../utils/time";
import { Messages } from '../../types/chat';
import React, { useEffect, useRef } from "react";

interface DecodedToken {
  id: string;
  name: string;
}

const ChatContainer = ({messages}: Messages) => {
  const token = import.meta.env.VITE_BACKEND_TOKEN;
  const decoded = jwtDecode<DecodedToken>(token);

  let lastDate = 0;

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    console.log(chatBoxRef.current?.scrollHeight);
  }, [messages]);

  return (
    <ChatBoxStyle ref={chatBoxRef}>
      {messages.map((message, i) => {
        const checkDate = lastDate !== formatDate(message.createdAt)[1];
        if(checkDate) {
          lastDate = Number(formatDate(message.createdAt)[1]);
        }

        return (
          <React.Fragment key={message.id || i}>
            {checkDate && (
              <AlertChat message={String(formatDate(message.createdAt)[0])} />
            )}
            {message.senderId === decoded.id ? (
              <MyChat message={message.content} time={formatTime(message.createdAt)} />
            ) : (
              <YourChat
                senderName={message.name}
                profile="https://picsum.photos/id/49/200/300.jpg"
                message={message.content}
                time={formatTime(message.createdAt)}
              />
            )}
          </React.Fragment>
        ) 
      })}
    </ChatBoxStyle>
  );
}

export default ChatContainer;


const ChatBoxStyle = styled.div`
  min-height: 72.5vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  top: 3.5rem;
  margin-bottom: 7rem;
  padding: 0.5rem 0;
  gap: 0.5rem;
  overflow-y: auto;
`