import styled from "styled-components";

const ChatList = () => {
  return (
    <ChatListStyle>
      <ChatBoxStyle>
        <div>
          <span>
            <h2>솥뚜껑 삼겹살</h2>  
            <h2 style={{color: '#7E7E7E'}}>7</h2>
          </span>
          <p style={{color: '#565656'}}>오늘도 화이팅!</p>
        </div>
        <TextBoxStyle>
          <p>오전 11:00</p>
        </TextBoxStyle>
      </ChatBoxStyle>

      <ChatBoxStyle>
        <div>
          <span>
            <h2>서브웨이</h2>  
            <h2 style={{color: '#7E7E7E'}}>7</h2>
          </span>
          <p style={{color: '#565656'}}>오늘도 화이팅!</p>
        </div>
        <TextBoxStyle>
          <p>오전 11:00</p>
          <BadgeStyle>1</BadgeStyle>
        </TextBoxStyle>
      </ChatBoxStyle>
      <ChatBoxStyle>
        <div>
          <span>
            <h2>CU 편의점</h2>  
            <h2 style={{color: '#7E7E7E'}}>7</h2>
          </span>
          <p style={{color: '#565656'}}>오늘도 화이팅!</p>
        </div>
        <TextBoxStyle>
          <p>오전 11:00</p>
          <BadgeStyle>3</BadgeStyle>
        </TextBoxStyle>
      </ChatBoxStyle>
    </ChatListStyle>
  );
}

export default ChatList;

const ChatListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`

const ChatBoxStyle = styled.div`
  border: 1px solid #DBCDCD;
  background-color: #F7F6F6;
  width: 93%;
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  border-radius: 10px;

  span {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }

  &:focus, &:hover {
    background-color: #FFD400;
  }
`

const TextBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`

const BadgeStyle = styled.div`
  background-color: #FFD400;
  color: white;
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`