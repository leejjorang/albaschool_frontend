import Input from '@mui/joy/Input';
import styled from 'styled-components';

const RegisterStore = () => {
  return (
      <RegisterStoreStyle>
          <h1 style={{marginBottom: '3rem'}}>가게 등록하기</h1>
          <InputBoxStyle>
            <p>가게 코드</p>
            <Input
              disabled={false}
              placeholder="가게 코드를 입력해주세요"
              variant="outlined"
              sx={{ overflowY: 'hidden', width: '60%' }}
            />
          </InputBoxStyle>
          <InputBoxStyle>
            <p>비밀번호</p>
            <Input
              disabled={false}
              placeholder="비밀번호를 입력해주세요"
              variant="outlined"
              sx={{ overflowY: 'hidden', width: '60%' }}
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
  width: 90%;
  gap: 0.8rem;

  p {
    width: 20%;
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