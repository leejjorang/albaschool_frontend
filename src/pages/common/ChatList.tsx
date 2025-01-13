import styled from "styled-components";
import ChatListBox from "../../components/chat/ChatListBox";

const ChatList = () => {
  return (
    <ChatListStyle>
      <ChatListBox id={1} storeName="솥뚜껑 삼겹살" headCount={7} lastMessage="오늘도 화이팅!" time="오전 11:00" />
      <ChatListBox id={2} storeName="서브웨이" headCount={5} lastMessage="청소 깨끗이 부탁드립니다." time="오전 11:03" badge={5} />
      <ChatListBox id={3} storeName="CU 편의점" headCount={3} lastMessage="마감 잘 해주세요. 저번부터 청소가 미흡하네요." time="오후 12:01" badge={1} />
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