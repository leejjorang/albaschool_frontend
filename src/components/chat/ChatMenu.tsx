import styled from "styled-components";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ProfileBox from "./ProfileBox";

const ChatMenu = ({toggleMenu}: {toggleMenu: () => void}) => {
  return (
    <BackgroundStyle>
      <ChatMenuStyle>
        <MenuHeaderStyle>
          <p>참여 직원</p>
          <ClearOutlinedIcon onClick={toggleMenu} />
        </MenuHeaderStyle>
        <div>
          <ProfileBox name="이직원" my={true} />
          <ProfileBox name="김사장" profile="https://picsum.photos/id/49/200/300.jpg" />
          <ProfileBox name="이알바" />
          <ProfileBox name="김알바" />
        </div>
      </ChatMenuStyle>
    </BackgroundStyle>
  );
};

export default ChatMenu;


const BackgroundStyle = styled.div`
  position: fixed;
  top: 3.5rem;
  left: 0;
  right: 0;
  z-index: 20;
  height: calc(100vh - 3.4rem - 4rem);
  background-color: rgba(0, 0, 0, 0.4);
`

const ChatMenuStyle = styled.div`
  background-color: #ffffff;
  width: 70%;
  height: 100%;
  float: right;
`

const MenuHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem;
  border-bottom: 1px solid #CDCDCD;
`