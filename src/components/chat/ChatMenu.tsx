import styled from "styled-components";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ProfileBox from "./ProfileBox";
import { IChatMember } from "../../types/chat";
import { getUserInfo } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";

const ChatMenu = ({toggleMenu, members}: {toggleMenu: () => void; members: IChatMember[]}) => {
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"], 
    queryFn: () => getUserInfo(),
    initialData: [],
  });

  const chatMembers = members.filter((member) => (myInfo.id !== member.userId))

  return (
    <BackgroundStyle>
      <ChatMenuStyle>
        <MenuHeaderStyle>
          <h6>참여 직원</h6>
          <ClearOutlinedIcon onClick={toggleMenu} />
        </MenuHeaderStyle>
        <div>
          <ProfileBox name={myInfo.name} profile={myInfo.profile} my={true}/>
          {chatMembers.map((member) => (
            <ProfileBox key={member.userId} name={member.name} profile={member.profile} />
          ))}
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
  padding: 0.95rem 0.8rem;
  border-bottom: 1px solid #CDCDCD;
`