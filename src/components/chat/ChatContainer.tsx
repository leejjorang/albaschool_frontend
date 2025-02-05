import styled from "styled-components";
import AlertChat from "./AlertChat";
import YourChat from "./YourChat";
import MyChat from "./MyChat";

import { jwtDecode } from "jwt-decode";
import { formatDate, formatTime } from "../../utils/time";
import { IChatMember, Message } from "../../types/chat";
import React from "react";
import { getToken } from "../../stores/authStore";

interface DecodedToken {
  id: string;
  name: string;
}

const ChatContainer = ({ messages, members }: {messages: Message[]; members: IChatMember[]}) => {
  const token = getToken();
  const decoded = jwtDecode<DecodedToken>(token as string);

  let lastDate = 0;

  return (
    <ChatBoxStyle>
      {messages.map((message, i) => {
        const checkDate = lastDate !== formatDate(message.createdAt)[1];
        if (checkDate) {
          lastDate = Number(formatDate(message.createdAt)[1]);
        }

        const sender = members.find((member) => member.userId === message.senderId);

        return (
          <React.Fragment key={message.id || i}>
            {checkDate && (
              <AlertChat message={String(formatDate(message.createdAt)[0])} />
            )}
            {message.senderId === decoded.id ? (
              <MyChat
                message={message.content}
                time={formatTime(message.createdAt)}
              />
            ) : (
              <YourChat
                senderName={message.name}
                profile={sender?.profile}
                message={message.content}
                time={formatTime(message.createdAt)}
              />
            )}
          </React.Fragment>
        );
      })}
    </ChatBoxStyle>
  );
};

export default ChatContainer;

const ChatBoxStyle = styled.div`
  min-height: 74vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  top: 3.5rem;
  margin-bottom: 7rem;
  padding: 0.5rem 0;
  gap: 0.5rem;
`;
