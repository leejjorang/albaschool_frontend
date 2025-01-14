import styled from 'styled-components';
import { InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';

const RegisterStore = () => {
  return (
    <RegisterStoreStyle>
      <h1>가게 등록하기</h1>
      <InputStyle>
        <InputBox id='storeCode' title='가게 코드' type='text' placeholder='가게 코드를 입력해주세요' required={true} titleWidth={25} width={70} />
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
  margin: 4rem 0 3rem;  
  gap: 1rem;
`