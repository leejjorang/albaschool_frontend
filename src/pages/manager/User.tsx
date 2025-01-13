import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState } from 'react';
import styled from 'styled-components';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveIcon from '@mui/icons-material/Remove';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const User = () => {
  const [userName, setUserName] = useState<string>("홍길동");
  
  const [category, setCategory] = React.useState('');
  
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };


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
          <h2>가게 관리</h2>
          <ControlPointIcon />
        </TextWrapperStyle>
        <ButtonBoxStyle>
          <ButtonStyle>
            <BoxTextStyle>
              <span style={{display: 'inline-flex', gap: '0.5rem', width: '80%'}}>
                <p>솥뚜껑 삼겹살</p>
                <p style={{color: '#6C6C6C'}}>1Q22WA</p>
              </span>
              <EditOutlinedIcon />
              <RemoveIcon sx={{ color: 'red' }}/>
            </BoxTextStyle>
          </ButtonStyle>
          <ButtonStyle>
            <BoxTextStyle>
              <span style={{display: 'inline-flex', gap: '0.5rem', width: '80%'}}>
                <p>서브웨이</p>
                <p style={{color: '#6C6C6C'}}>1Q22WA</p>
              </span>
              <EditOutlinedIcon />
              <RemoveIcon sx={{ color: 'red' }}/>
            </BoxTextStyle>
          </ButtonStyle>
          <ButtonStyle>
            <BoxTextStyle>
              <span style={{display: 'inline-flex', gap: '0.5rem', width: '80%'}}>
                <p>CU 편의점</p>
                <p style={{color: '#6C6C6C'}}>1Q22WA</p>
              </span>
              <EditOutlinedIcon />
              <RemoveIcon sx={{ color: 'red' }}/>
            </BoxTextStyle>
          </ButtonStyle>
        </ButtonBoxStyle>
      </WorkplaceBoxStyle>

      <StaffBoxStyle>
        <BoxTextStyle>
          <h2>직원 관리</h2>
          
          <FormControl variant="standard" sx={{ m: 1, minWidth: '55%'}}>
            <InputLabel id="demo-simple-select-standard-label">가게명</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={handleChange}
              label="category"
            >
              <MenuItem value={1}>솥뚜껑 삼겹살</MenuItem>
              <MenuItem value={2}>서브웨이</MenuItem>
              <MenuItem value={3}>CU 편의점</MenuItem>
            </Select>
          </FormControl>
        </BoxTextStyle>

        <ButtonBoxStyle>
          <ButtonStyle>
            <BoxTextStyle>
              <p style={{width: '26%'}}>김알바</p>
              <p>010-1234-5678</p>
              <RemoveIcon sx={{ color: 'red' }}/>
            </BoxTextStyle>
          </ButtonStyle>
          <ButtonStyle>
            <BoxTextStyle>
              <p style={{width: '26%'}}>이알바</p>
              <p>010-1234-5678</p>
              <RemoveIcon sx={{ color: 'red' }}/>
            </BoxTextStyle>
          </ButtonStyle>
          <ButtonStyle>
            <BoxTextStyle>
              <p style={{width: '26%'}}>김민수</p>
              <p>010-1234-5678</p>
              <RemoveIcon sx={{ color: 'red' }}/>
            </BoxTextStyle>
          </ButtonStyle>
        </ButtonBoxStyle>
      </StaffBoxStyle>

    </div>
  );
};

export default User;

const ProfileBoxStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 1.5rem 3.5rem 1.5rem;

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

const BoxTextStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const WorkplaceBoxStyle = styled.div`
  margin: 1rem 1.5rem;
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

const StaffBoxStyle = styled.div`
  margin: 1rem 1.5rem;
` 
