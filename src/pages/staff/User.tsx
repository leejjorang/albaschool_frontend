import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState } from 'react';
import styled from 'styled-components';

const User = () => {
  const [userName, setUserName] = useState<string>("홍길동");


  return (
    <div>
      <ProfileBoxStyle>
        <Avatar src="/broken-image.jpg" sx={{ width: '6.5rem', height: '6.5rem' }}/>
        <div>
          <h2>{userName} 님</h2>
          <TextWrapperStyle>
            <SettingsIcon sx={{ color: '#5F6368' }}/>
            <p>회원 정보</p>
          </TextWrapperStyle>
        </div>
      </ProfileBoxStyle>

      <WorkplaceBoxStyle>
        <TextWrapperStyle>
          <h2>나의 근무지</h2>
          <ControlPointIcon />
        </TextWrapperStyle>
        <ButtonBoxStyle>
          <ButtonStyle>솥뚜껑 삼겹살</ButtonStyle>
          <ButtonStyle>서브웨이</ButtonStyle>
          <ButtonStyle>CU 편의점</ButtonStyle>
        </ButtonBoxStyle>
      </WorkplaceBoxStyle>

    </div>
  );
};

export default User;

const ProfileBoxStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
  }

  p {
    font-size: 1.3rem;
    color: #5F6368;
  }
`

const TextWrapperStyle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`

const WorkplaceBoxStyle = styled.div`
  margin: 3rem 1.5rem 1rem 1.5rem;
`

const ButtonBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  align-items: center;
`

const ButtonStyle = styled.button`
  background-color: #F7F6F6;
  border: 1px solid #DBCDCD;
  border-radius: 10px;
  width: 100%;
  padding: 0.9rem 0.5rem;
  font-size: 1.4rem;

  &:focus, &:hover { 
    background-color: #FAED7D;
  }
`