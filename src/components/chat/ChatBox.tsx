import styled from "styled-components";
import AlertChat from "./AlertChat";
import YourChat from "./YourChat";
import MyChat from "./MyChat";

const ChatBox = () => {
  return (
    <ChatBoxStyle>
      <AlertChat message="2025년 1월 14일" />
      <YourChat 
        senderName="김사장" 
        profile="https://picsum.photos/id/49/200/300.jpg"
        message="안녕"
        time="오전 11:00"
      />
      <YourChat 
        senderName="이알바" 
        message="안녕하세요 처음뵙겠습니다! 잘 부탁드립니다~"
        time="오전 11:00"
      />
      <MyChat message="안녕하세요" time="오전 11:03" />
      <MyChat message="안녕하세요 긴 텍스트 테스트용으로 길게 작성" time="오전 11:03" />
    </ChatBoxStyle>
  );
}

export default ChatBox;


const ChatBoxStyle = styled.div`
  min-height: 73.1vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 3.4rem 0 3.3rem;
  padding: 0.5rem 0;
  gap: 0.5rem;
`