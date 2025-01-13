import styled from "styled-components";

interface ChatProps {
  sender: "your" | "my";
  message: string;
  time: string;
}

const Chat: React.FC<ChatProps> = ({sender, message, time}) => {
  return (
    <ChatStyle className={sender}>
      <MessageStyle className={sender}>{message}</MessageStyle>
      <p style={{fontSize: '0.8rem'}}>{time}</p>
    </ChatStyle>
  );
}

export default Chat;


const ChatStyle = styled.span`
  display: flex;
  align-items: flex-end;
  gap: 0.3rem;

  &.your {
    flex-direction: row;
  }

  &.my {
    flex-direction: row-reverse;
    margin-right: 0.5rem;
  }
`

const MessageStyle = styled.p`
  border: 1px solid #CDCDCD;
  border-radius: 15px;
  padding: 0.7rem 1rem;
  max-width: 70%;
  word-wrap: break-word;

  &.your {
    background-color: #F3F3F3;
  }

  &.my {
    background-color: #FAED7D;
  }
`