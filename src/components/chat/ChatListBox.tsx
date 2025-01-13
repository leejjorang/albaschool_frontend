import styled from "styled-components";
import Badge from "../Badge";
import { useNavigate } from "react-router-dom";

interface ChatListBoxProps {
  id: number;
  storeName: string;
  headCount: number;
  lastMessage: string;
  time: string;
  badge?: number;
}

const ChatListBox: React.FC<ChatListBoxProps> = ({id, storeName, headCount, lastMessage, time, badge}) => {
  const navigate = useNavigate();
  const goToChatRoom = () => {
    navigate(`/chats/${id}`);
  }

  return (
    <ChatListBoxStyle onClick={goToChatRoom}>
      <div style={{maxWidth: '60%'}}>
        <span>
          <p>{storeName}</p>
          <p style={{color: '#7E7E7E'}}>{headCount}</p>
        </span>
        <p style={{color: '#565656'}}>{lastMessage}</p>
      </div>
      <TimeBadgeBoxStyle>
        <p>{time}</p>
        {badge && <Badge message={badge} />}
      </TimeBadgeBoxStyle>
    </ChatListBoxStyle>
  )
}

export default ChatListBox;


const ChatListBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #CDCDCD;
  width: 93%;
  padding: 0.7rem 1rem;
  border-radius: 10px;

  span {
    display: inline-flex;
    gap: 0.5rem;
    font-size: 1.4rem;
    margin-bottom: 0.3rem;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:focus, &:hover {
    background-color: #FFD400;
  }
`

const TimeBadgeBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`