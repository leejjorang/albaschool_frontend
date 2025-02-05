import styled from 'styled-components';
import { InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';
import { createStoreStaff } from '../../services/storeService';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import ToastPopup from '../../components/ToastPopup';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface createStoreStaffProps {
  storeId: string;
  password: string;
}

const RegisterStore = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<createStoreStaffProps>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: createStoreStaffProps) => {
    const {storeId, password} = data;

    try {
      await createStoreStaff(storeId, password); 
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
      <h2>근무지 등록하기</h2>
      <InputStyle>
        <InputBox 
          name='storeId' 
          title='가게 코드' 
          type='text' 
          placeholder='가게 코드를 입력해주세요' 
          required={true} 
          titleWidth={25} 
          width={70} 
          register={register('storeId', {
            pattern: {
              value: /^[^ㄱ-ㅎ가-힣]{8}$/,
              message: '한글을 제외한 8글자만 입력 가능합니다.'
            }
          })}
        />
        {errors.storeId && errors.storeId.message && <ErrorText>{errors.storeId.message.toString()}</ErrorText>}
        <InputBox 
          name='password' 
          title='비밀번호' 
          type='password' 
          placeholder='비밀번호를 입력해주세요' 
          required={true} 
          titleWidth={25} 
          width={70}
          margin='1rem 0 0 0'
          register={register('password')}
        />
      </InputStyle>
      <Button message='등록하기'/>

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

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 4rem 0 3rem;
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;