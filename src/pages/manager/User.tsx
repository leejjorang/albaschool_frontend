import styled from 'styled-components';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import UserProfile from '../../components/user/UserProfile';
import { ManagerStoreCard, ManagerStaffCard } from '../../components/user/Card';
import { Link } from 'react-router-dom';

const User = () => {
  const [category, setCategory] = React.useState('');
  
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <UserProfile userName='홍길동' />
      <WorkplaceBoxStyle>
        <span>
          <h2>가게 관리</h2>
          <Link to={'/store/register/manager'}><ControlPointIcon /></Link>
        </span>
        <CardBoxStyle>
          <ManagerStoreCard storeName='솥뚜껑 삼겹살' storeCode='1Q22WA' />
          <ManagerStoreCard storeName='서브웨이' storeCode='2D3CA2' />
          <ManagerStoreCard storeName='CU 편의점' storeCode='3QWER12' />
        </CardBoxStyle>
      </WorkplaceBoxStyle>
      <StaffBoxStyle>
        <span>
          <h2>직원 관리</h2>
          <FormControl variant="standard" sx={{ m: 1, minWidth: '55%', margin: '0'}}>
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
        </span>
        <CardBoxStyle>
          <ManagerStaffCard staffName='김알바' staffPhone='010-1234-5678' />
          <ManagerStaffCard staffName='이알바' staffPhone='010-1234-5678' />
          <ManagerStaffCard staffName='김새로이' staffPhone='010-1234-5678' />
        </CardBoxStyle>
      </StaffBoxStyle>
    </div>
  );
};

export default User;


const WorkplaceBoxStyle = styled.div`
  margin: 1rem 1.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  a {
    display: flex;
    color: #000000;
  }
`

const StaffBoxStyle = styled.div`
  margin: 1.5rem 1.5rem;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
` 

const CardBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  align-items: center;
`
