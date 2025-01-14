import styled from "styled-components";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';

const RegisterStore = () => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <RegisterStoreStyle>
      <h1>내 가게 등록하기</h1>
      <InputStyle>
        <InputBox id='storeNumber' title='사업자 번호' type='number' placeholder='사업자 번호를 입력해주세요' required={true} titleWidth={25} width={70} />
        <DropBoxStyle>
          <p>카테고리</p>
          <FormControl variant="standard" sx={{ m: 1, minWidth: '70%', margin: '0' }}>
            <InputLabel id="demo-simple-select-standard-label">업종</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={handleChange}
              label="category"
            >
              <MenuItem value={1}>음식점</MenuItem>
              <MenuItem value={2}>편의점</MenuItem>
              <MenuItem value={3}>판매/서비스</MenuItem>
              <MenuItem value={0}>기타</MenuItem>
            </Select>
          </FormControl>
        </DropBoxStyle>
        <InputBox id='storeName' title='가게 이름' type='text' placeholder='가게 이름을 입력해주세요' required={true} titleWidth={25} width={70} />
        <InputBox id='storePassword' title='비밀번호' type='password' placeholder='비밀번호를 입력해주세요' required={true} titleWidth={25} width={70} />
      </InputStyle>
      <Button message='등록하기' />
    </RegisterStoreStyle>
  );
}

export default RegisterStore;


const RegisterStoreStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 3.5rem - 4rem);
`

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 5.5rem 0 4rem;  
  gap: 1rem;
`

const DropBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;

  p {
    width: 25%;
    text-align: end;
  }
`