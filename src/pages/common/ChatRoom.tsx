import styled from 'styled-components';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChatContainer from '../../components/chat/ChatContainer';
import ChatMenu from '../../components/chat/ChatMenu';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { io, Socket } from "socket.io-client";
import { getMessages } from '../../services/chatService';
import { Message } from '../../types/chat';

import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  name: string;
}

const ChatRoom = () => {
  const roomId = useParams().id;
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName="Unknown Store", headCount=0 } = location.state || {};
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const socketRef = useRef<Socket>();

  const token = import.meta.env.VITE_BACKEND_TOKEN;
  const decoded = jwtDecode<DecodedToken>(token);


  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_BACKEND_URL,
      {
        path: '/socket.io/',
        transports: ['websocket'],
        auth: {
        token: `Bearer ${import.meta.env.VITE_BACKEND_TOKEN}`
      }}
    );

    const socket = socketRef.current;
    
    socket.on("connect", () => {
      console.log("연결 완료", socket.id);
    });
    
    socket.on("message", (newMessage) => {
      setMessages(PrevMessages => [...PrevMessages, newMessage]);
    })

    const fetchMessages = async () => {
      if (roomId) {
        const fetchedMessages = await getMessages(roomId);
        setMessages(fetchedMessages.chatRoomDetail.messages);
      }
    }

    fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, [roomId])

  const sendMessage = () => {
    if(!inputMessage.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", { content: inputMessage, roomId: roomId}, (response: Message) => {
      //setMessages((prevMessages) => [...prevMessages, response]);

      console.log(response);
    });
    setMessages((prevMessages) => [...prevMessages, {
      content: inputMessage,
      createdAt: new Date().toISOString(),
      id: 'id',
      name: decoded.name,
      senderId: decoded.id
    }]);
    setInputMessage("");
  }

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  const goToChatList = () => {
    navigate('/chats');
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

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
          <h6>{storeName}</h6>
          <h6 style={{color: '#7E7E7E'}}>{headCount}</h6>
        </span>
        <MenuOutlinedIcon sx={{ fontSize: 28 }} onClick={toggleMenu} />
      </ChatRoomHeaderStyle>
      <ChatContainer messages={messages} />
      <ChatInputBoxStyle>
        <textarea
          id="message" 
          rows={1}
          onInput={autoResize}
          value={inputMessage}
          onChange={inputChange}
        >
        </textarea>
        <button onClick={sendMessage}>전송</button>
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