import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import Chat from "./Chat";

interface YourChatProps {
  senderName: string;
  profile?: string;
  message: string;
  time: string;
}

const YourChat: React.FC<YourChatProps> = ({senderName, profile, message, time}) => {
  return (
    <YourChatStyle>
      <Avatar alt={senderName} src={profile} />
      <div>
        <p>{senderName}</p>
        <Chat sender="your" message={message} time={time} />
      </div>
    </YourChatStyle>
  );
}

export default YourChat;


const YourChatStyle = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-left: 0.5rem;
`