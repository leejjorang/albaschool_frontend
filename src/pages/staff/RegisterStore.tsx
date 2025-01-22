import styled from 'styled-components';
import { InputBox } from '../../components/InputBox';
import { Button } from '../../components/Button';
import { createStoreStaff } from '../../services/storeService';

const RegisterStore = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const storeId = formData.get('storeId') as string;
    const password = formData.get('password') as string;

    try{
      await createStoreStaff(storeId, password); 
      alert("가게에 추가되었습니다.");
    } catch(error) {
      alert("가게 추가에 실패했습니다.")
      console.log(error);
    }
  }

  return (
    <RegisterStoreStyle onSubmit={onSubmit}>
      <h2>가게 등록하기</h2>
      <InputStyle>
        <InputBox name='storeId' title='가게 코드' type='text' placeholder='가게 코드를 입력해주세요' required={true} titleWidth={25} width={70} />
        <InputBox name='password' title='비밀번호' type='password' placeholder='비밀번호를 입력해주세요' required={true} titleWidth={25} width={70} />
      </InputStyle>
      <Button message='등록하기'/>
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