import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { Input, InputBox } from '../../components/InputBox';
import { Button, NegativeButton } from '../../components/Button';

const UserEdit = () => {
  return (
    <div>
      <ProfileBoxStyle>
        <Avatar src="/broken-image.jpg" sx={{ width: '7.5rem', height: '7.5rem' }}/>
        <ButtonBoxStyle>
          <Button message="사진 수정" width={35}/>
          <NegativeButton message='사진 삭제' width={35} />        
        </ButtonBoxStyle>
      </ProfileBoxStyle>

      <InputStyle>
        <InputBox name='id' title='아이디' type='email' placeholder='email123@email.com' disabled={true} titleWidth={18} width={75} />
        <InputBoxStyle>
          <p>비밀번호</p>
          <Input name='password' type='password' placeholder='비밀번호를 입력해주세요' width={55} />
          <button>변경</button>
        </InputBoxStyle>
        <InputBox name='name' title='이름' type='text' placeholder='홍길동' titleWidth={18} width={75} />
        <InputBox name='phone' title='전화번호' type='tel' placeholder='010-1234-5678' titleWidth={18} width={75} />
      </InputStyle>

      <ButtonBoxStyle>
        <Button message="로그아웃" width={35} />
        <NegativeButton message='회원탈퇴' width={35} />      
      </ButtonBoxStyle>
    </div>
  );
}

export default UserEdit;


const ProfileBoxStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3.5rem;
`

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  gap: 1rem;
  margin: 2rem 0 4rem;
`

const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;

  p {
    width: 18%;
    text-align: end;
  }

  button {
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
    background-color: #FAED7D;
    border: 1px solid #DBCDCD;
    border-radius: 10px;

    &:focus, &:hover {
      background-color: #FFD400;
    }
  }
`

const ButtonBoxStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.7rem;
  width: 100%;
`