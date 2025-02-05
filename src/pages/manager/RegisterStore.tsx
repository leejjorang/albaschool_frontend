import styled from "styled-components";
import * as React from 'react';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Input, InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';
import TimePick from "../../components/schedule/TimePick";
import { validateBizRegistrationNum, createStoreManager } from "../../services/storeService";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ToastPopup from "../../components/ToastPopup";
import { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";

interface createstoreManagerProps {
  bizNum: string;
  category: string;
  title: string;
  password: string;
}


const RegisterStore = () => {
  const { register, handleSubmit, formState: {errors}, getValues, trigger } = useForm<createstoreManagerProps>();
  const [category, setCategory] = React.useState('');
  const [openTime, setOpenTime] = useState<string | null>(null);
  const [closeTime, setCloseTime] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isBizNumVerified, setIsBizNumVerified] = useState(false);
  const [secureBizNum, setSecureBizNum] = useState("");
  const navigate = useNavigate();

  const BizNumValidation = useMutation({
    mutationFn: (bizNum: string) =>  validateBizRegistrationNum(bizNum),
    onError: (error) => {
      if(error instanceof AxiosError) {
        if(error.response?.data?.message) {
          setToastMessage(`❌ ${error.response.data.message}`);
          setShowToast(true);
        } else {
          setToastMessage("❌ 사업자 번호 인증 실패!");
          setShowToast(true);
          console.log(error);
        }
      } else {
        setToastMessage("❌ 사업자 번호 인증 실패!");
        setShowToast(true);
        console.log(error);
      }
    },
    onSuccess: (data) => {
      setToastMessage("✅ 사업자 번호 인증 성공!");
      setShowToast(true);
      setIsBizNumVerified(true);
      setSecureBizNum(data.value);
    }
  })

  const handleVerifyBizNum = async () => {
    const isValid = await trigger('bizNum');
    if (!isValid) return; 

    const bizNum = getValues('bizNum');
    BizNumValidation.mutate(bizNum);
  }


  const onSubmit = async (data: createstoreManagerProps) => {
    if (!openTime) {
      setToastMessage("❌ 오픈 시간을 설정해주세요.");
      setShowToast(true);
      return;
    }

    if(!closeTime) {
      setToastMessage("❌ 마감 시간을 설정해주세요.");
      setShowToast(true);
      return;
    }

    if(!secureBizNum) {
      setToastMessage("❌ 사업자 번호를 인증해주세요.");
      setShowToast(true);
      return;
    }

    const {category, title, password} = data;
    const storeData = {
      title: title,
      location: '서울 용산구 한강대로 401',
      contact: '0212345678',
      password: password,
      openTime: openTime,
      closeTime: closeTime,
      bizRegistrationNum: secureBizNum,
      type: category
    }
    
    try {
      await createStoreManager(storeData);
      console.log(category);
      setToastMessage("✅ 가게 추가 완료!");
      setShowToast(true);

      setTimeout(() => {
        navigate('/shoplist');
      }, 800);
    } catch(error) {
      if(error instanceof AxiosError) {
        if(error.response?.data?.message) {
          setToastMessage(`❌ ${error.response.data.message}`);
          setShowToast(true);
        } else {
          setToastMessage("❌ 가게 추가 실패!");
          setShowToast(true);
          console.log(error);
        }
      } else {
        setToastMessage("❌ 가게 추가 실패!");
        setShowToast(true);
        console.log(error);
      }
    }
  }


  return (
    <RegisterStoreStyle onSubmit={handleSubmit(onSubmit)}>
      <h2>내 가게 등록하기</h2>
      <InputStyle>
        <InputBoxStyle>
          <p>사업자 번호</p>
          <Input 
            name='bizNum'
            type='text'
            disabled={isBizNumVerified}
            required={true}
            width={49}
            register={register('bizNum', {
              pattern: {
                value: /^[0-9]{10}$/,
                message: '사업자 번호는 10자리의 숫자입니다.'
              }
            })}
          />
          <ButtonStyle type="button" onClick={handleVerifyBizNum} disabled={isBizNumVerified}>
            인증
          </ButtonStyle>
        </InputBoxStyle>
        {errors.bizNum && errors.bizNum.message && <ErrorText>{errors.bizNum.message.toString()}</ErrorText>}

        <InputBoxStyle>
          <p>카테고리</p>
          <FormControl variant="standard" sx={{ m: 1, minWidth: '68%', margin: '0' }}>
            <InputLabel id="demo-simple-select-standard-label">업종</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              {...register('category', {
                required: '업종을 선택해주세요.',
                onChange: (e) => setCategory(e.target.value)
              })}
            >
              <MenuItem value={'음식점/카페'}>음식점/카페</MenuItem>
              <MenuItem value={'편의점/마트'}>편의점/마트</MenuItem>
              <MenuItem value={'판매/서비스'}>판매/서비스</MenuItem>
              <MenuItem value={'여가/엔터테인먼트'}>여가/엔터테인먼트</MenuItem>
              <MenuItem value={'교육/학원'}>교육/학원</MenuItem>
              <MenuItem value={'기타'}>기타</MenuItem>
            </Select>
          </FormControl>
        </InputBoxStyle>
        {errors.category && errors.category.message && <ErrorText>{errors.category.message.toString()}</ErrorText>}

        <InputBox 
          name='title' 
          title='가게 이름' 
          type='text' 
          placeholder='가게 이름을 입력해주세요' 
          required={true} 
          titleWidth={23} 
          width={68} 
          margin='1rem 0 0 0'
          register={register('title')}
        />
        <InputBox 
          name='password' 
          title='비밀번호' 
          type='password' 
          placeholder='비밀번호를 입력해주세요' 
          required={true} 
          titleWidth={23} 
          width={68} 
          margin='1rem 0 0 0'
          register={register('password')}
        />
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

      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
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

export const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 3rem 0 3rem;
`

export const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;
  margin-top: 1rem;

  p {
    width: 23%;
    text-align: end;
  }
`

const ButtonStyle = styled.button`
  font-size: 1rem;
  padding: 0.6rem 0.9rem;
  background-color: #faed7d;
  border: 1px solid #dbcdcd;
  border-radius: 10px;

  &:focus,
  &:hover {
    background-color: #ffd400;
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;