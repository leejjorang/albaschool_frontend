import styled from "styled-components";
import NoticeCard from "../../components/NoticeCard";

const Notice = () => {
  return (
    <ChatListStyle>
      <NoticeCard id={1} storeName="솥뚜껑 삼겹살" message="김알바님이 추가되었습니다." time="3분전" />
      <NoticeCard id={1} storeName="서브웨이" message="이알바님이 추가되었습니다." time="3분전" />
    </ChatListStyle>
  );
};

export default Notice;

const ChatListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`