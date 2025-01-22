import styled from "styled-components";
import * as React from 'react';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';
import TimePick from "../../components/schedule/TimePick";
import { createStoreManager } from "../../services/storeService";

const RegisterStore = () => {
  const [category, setCategory] = React.useState('');
  const [openTime, setOpenTime] = useState<string | null>(null);
  const [closeTime, setCloseTime] = useState<string | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const storeData = {
      title: formData.get('title') as string,
      location: '서울 용산구 한강대로 401',
      contact: '0212345678',
      password: formData.get('password') as string,
      openTime: openTime ?? "09:00",
      closeTime: closeTime ?? "21:00",
      bizRegistrationNum: formData.get('bizRegistrationNum') as string,
    }

    try{
      await createStoreManager(storeData);
      alert("가게가 생성되었습니다.");
    } catch(error) {
      alert("가게 생성에 실패했습니다.");
      console.log(error);
    }
  }


  return (
    <RegisterStoreStyle onSubmit={onSubmit}>
      <h2>내 가게 등록하기</h2>
      <InputStyle>
        <InputBox name='bizRegistrationNum' title='사업자 번호' type='text' placeholder='사업자 번호를 입력해주세요' required={true} titleWidth={25} width={70} />
        <InputBoxStyle>
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
        </InputBoxStyle>
        <InputBox name='title' title='가게 이름' type='text' placeholder='가게 이름을 입력해주세요' required={true} titleWidth={25} width={70} />
        <InputBox name='password' title='비밀번호' type='password' placeholder='비밀번호를 입력해주세요' required={true} titleWidth={25} width={70} />
        <InputBoxStyle>
          <p>오픈 시간</p>
          <TimePick onChange={(e) => setOpenTime(e)} />
        </InputBoxStyle>
        <InputBoxStyle>
          <p>마감 시간</p>
          <TimePick onChange={(e) => setCloseTime(e)} startTime={openTime as string} />
        </InputBoxStyle>
      </InputStyle>
      <Button message='등록하기' />
    </RegisterStoreStyle>
  );
}

export default RegisterStore;


const RegisterStoreStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7.5rem);

  h2 {
    font-size: 2rem;
  }
`

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 4rem 0 3rem;  
  gap: 1rem;
`

const InputBoxStyle = styled.div`
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