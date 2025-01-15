import styled from 'styled-components';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChatContainer from '../../components/chat/ChatContainer';
import ChatMenu from '../../components/chat/ChatMenu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const navigate = useNavigate();
  const goToChatList = () => {
    navigate('/chats');
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const storeTitle: string = '솥뚜껑 삼겹살';
  const headCount: number = 7;

  const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  return (
    <div>
      <ChatRoomHeaderStyle>
        {menuOpen && <ChatMenu toggleMenu={toggleMenu} />}

        <ArrowBackIosOutlinedIcon onClick={goToChatList}/>
        <span>
          <h6>{storeTitle}</h6>
          <h6 style={{color: '#7E7E7E'}}>{headCount}</h6>
        </span>
        <MenuOutlinedIcon sx={{ fontSize: 28 }} onClick={toggleMenu} />
      </ChatRoomHeaderStyle>
      <ChatContainer />
      <ChatInputBoxStyle>
        <textarea
          id="message" 
          rows={1}
          onInput={autoResize}
        >
        </textarea>
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
    align-items: flex-end;
    gap: 0.5rem;
  }

  h6 {
    font-size: 1.2rem;
    font-weight: 100;
  }
`

const ChatInputBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  padding: 0.5rem 0.6rem;
  border-top: 1px solid #CDCDCD;
  background-color: #ffffff;
  width: 100%;
  bottom: 3.9rem;

  textarea {
    resize: none;
    border: 1px solid #CDCDCD;
    border-radius: 10px;
    padding: 0.55rem 0.8rem;
    font-size: 1.1rem;
    width: 81%;
    overflow-y: hidden;
    max-height: 4.4rem;
  }

  button {
    font-size: 1rem;
    padding: 0.55rem 1rem;
    background-color: #FAED7D;
    border: 1px solid #CDCDCD;
    border-radius: 10px;

    &:focus, &:hover {
      background-color: #FFD400;
    }
  }
`