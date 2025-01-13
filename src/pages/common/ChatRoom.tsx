import styled from 'styled-components';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Textarea from '@mui/joy/Textarea';
import ChatBox from '../../components/chat/ChatBox';
import ChatMenu from '../../components/chat/ChatMenu';
import { useState } from 'react';

const ChatRoom = () => {
  const storeTitle: string = '솥뚜껑 삼겹살';
  const headCount: number = 7;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <div>
      <ChatRoomHeaderStyle>
        {menuOpen && <ChatMenu toggleMenu={toggleMenu} />}

        <ArrowBackIosOutlinedIcon />
        <span>
          <p>{storeTitle}</p>
          <p style={{color: '#7E7E7E'}}>{headCount}</p>
        </span>
        <MenuOutlinedIcon sx={{ fontSize: 28 }} onClick={toggleMenu} />
      </ChatRoomHeaderStyle>
      <ChatBox />
      <ChatInputBoxStyle>
        <Textarea 
          name="Outlined"
          variant="outlined" 
          maxRows={3}
          sx={{ overflowY: 'hidden', width: '81%' }}
        />
        <button>전송</button>
      </ChatInputBoxStyle>
    </div>
  );
}

export default ChatRoom;


const ChatRoomHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0.8rem;
  border-bottom: 1px solid #CDCDCD;
  background-color: #ffffff;
  width: 100%;
  z-index: 10;
  
  span {
    display: inline-flex;
    gap: 0.5rem;
  }

  p {
    font-size: 1.4rem;
  }
`

const ChatInputBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0.5rem 0.6rem;
  border-top: 1px solid #CDCDCD;
  background-color: #ffffff;
  width: 100%;
  bottom: 3.9rem;

  button {
    font-size: 1.1rem;
    padding: 0.55rem 0.8rem;
    background-color: #FAED7D;
    border: 1px solid #CDCDCD;
    border-radius: 10px;

    &:focus, &:hover {
      background-color: #FFD400;
    }
  }
`