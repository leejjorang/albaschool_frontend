import styled from "styled-components";

import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const Bottom = () => {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomStyle>
      <BottomNavigation sx={{ width: '100%', backgroundColor: '#FFD400' }} value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="스케줄"
          value="schedule"
          icon={<HomeOutlinedIcon fontSize="large" />}
          sx={{'&.Mui-selected': { color: '#FF6F00' }}}
        />
        <BottomNavigationAction
          label="가게"
          value="store"
          icon={<StorefrontIcon fontSize="large" />}
          sx={{'&.Mui-selected': { color: '#FF6F00' }}}
        />
        <BottomNavigationAction
          label="채팅"
          value="chat"
          icon={<ChatOutlinedIcon fontSize="large" />}
          sx={{'&.Mui-selected': { color: '#FF6F00' }}}
        />
        <BottomNavigationAction 
          label="마이페이지" 
          value="mypage" 
          icon={<PersonOutlineOutlinedIcon fontSize="large" />} 
          sx={{'&.Mui-selected': { color: '#FF6F00' }}}
        />
      </BottomNavigation>
    </BottomStyle>
  );
}

export default Bottom;


const BottomStyle = styled.div`
  background-color: #FFD400;
  padding: 0.2rem;
  position: fixed;
  bottom: 0;
  width: 100%
`
