import Input from '@mui/joy/Input';
import styled from "styled-components";

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const RegisterStore = () => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

    return (
        <RegisterStoreStyle>
            <h1 style={{marginBottom: '3rem'}}>내 가게 등록하기</h1>
            <InputBoxStyle>
              <p>사업자 번호</p>
              <Input
                disabled={false}
                placeholder="사업자 번호를 입력해주세요"
                variant="outlined"
                sx={{ overflowY: 'hidden', width: '55%' }}
              />
            </InputBoxStyle>

            <InputBoxStyle>
              <p>카테고리</p>
              <FormControl variant="standard" sx={{ m: 1, minWidth: '55%' }}>
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
            </InputBoxStyle>

            <InputBoxStyle>
              <p>가게 이름</p>
              <Input
                disabled={false}
                placeholder="가게 이름를 입력해주세요"
                variant="outlined"
                sx={{ overflowY: 'hidden', width: '55%' }}
              />
            </InputBoxStyle>

            <InputBoxStyle>
              <p>입장 비밀번호</p>
              <Input
                disabled={false}
                placeholder="비밀번호를 설정해주세요"
                variant="outlined"
                sx={{ overflowY: 'hidden', width: '55%' }}
              />
            </InputBoxStyle>
            <ButtonStyle>등록하기</ButtonStyle>
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

const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.6rem;
  width: 100%;
  gap: 0.8rem;

  p {
    width: 26%;
    text-align: end;
  }
`

const ButtonStyle = styled.button`
  background-color: #FAED7D;
  border: 1px solid #DBCDCD;
  border-radius: 15px;
  padding: 0.7rem 1.1rem;
  margin: 2rem 0;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FFD400;
  }
` 