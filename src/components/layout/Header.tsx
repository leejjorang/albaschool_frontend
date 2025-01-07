import styled from "styled-components";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from "react";

const Header = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected); //클릭 시 색 변경
  };

  return (
    <HeaderStyle>
      <Title>알바스쿨</Title>
      <NotificationsNoneIcon fontSize="large" sx={{ color: isSelected ? '#FF6F00' : 'rgba(0, 0, 0, 0.6)' }} onClick={handleClick}/>
    </HeaderStyle>
  )
}

export default Header;


const HeaderStyle = styled.div`
  background-color: #FFD400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.9rem;
  position: fixed;
  width: 100%;
`

const Title = styled.h1`
  @font-face {
    font-family: 'HakgyoansimDunggeunmisoTTF-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  font-family: 'HakgyoansimDunggeunmisoTTF-B';
  font-size: 1.6rem;
`