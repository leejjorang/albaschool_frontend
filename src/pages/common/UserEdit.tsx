import Avatar from '@mui/material/Avatar';
import Input from '@mui/joy/Input';
import styled from 'styled-components';

const UserEdit = () => {
  return (
    <div>
      <ProfileBoxStyle>
        <Avatar src="/broken-image.jpg" sx={{ width: '7.5rem', height: '7.5rem' }}/>
        <span>
          <ButtonStyle>사진 수정</ButtonStyle>
          <ButtonStyle style={{backgroundColor: '#B9B9B9'}}>사진 삭제</ButtonStyle>
        </span>
      </ProfileBoxStyle>

      <div>
        <InputBoxStyle>
          <p>아이디</p>
          <Input
            disabled={true}
            placeholder="email123@email.com"
            variant="outlined"
            sx={{ overflowY: 'hidden', width: '67%' }}
          />
        </InputBoxStyle>
        <InputBoxStyle>
          <p>비밀번호</p>
          <Input
            disabled={false}
            placeholder="비밀번호를 입력해주세요"
            variant="outlined"
            sx={{ overflowY: 'hidden', width: '50%' }}
          />
          <MiniButtonStyle>변경</MiniButtonStyle>
        </InputBoxStyle>
        <InputBoxStyle>
          <p>이름</p>
          <Input
            disabled={true}
            placeholder="김알바"
            variant="outlined"
            sx={{ overflowY: 'hidden', width: '67%' }}
          />
        </InputBoxStyle>
        <InputBoxStyle>
          <p>전화번호</p>
          <Input
            disabled={false}
            placeholder="010-1234-5678"
            variant="outlined"
            sx={{ overflowY: 'hidden', width: '67%' }}
          />
        </InputBoxStyle>
      </div>

      <ButtonBoxStyle>
        <ButtonStyle>로그아웃</ButtonStyle>
        <ButtonStyle style={{backgroundColor: '#B9B9B9'}}>회원탈퇴</ButtonStyle>
      </ButtonBoxStyle>
    </div>
  );
}

export default UserEdit;

const ProfileBoxStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
  margin: 4rem 0 3rem 0;
`

const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.2rem 0;
  width: 100%;
  gap: 0.8rem;

  p {
    width: 16%;
    text-align: end;
  }
`

const MiniButtonStyle = styled.button`
  font-size: 1rem;
  padding: 0.4rem 0.6rem;
  background-color: #FAED7D;
  border: 1px solid #DBCDCD;
  border-radius: 10px;

  &:focus, &:hover {
    background-color: #FFD400;
  }
`

const ButtonStyle = styled.button`
  background-color: #FAED7D;
  border: 1px solid #DBCDCD;
  border-radius: 15px;
  padding: 0.7rem 1.1rem;
  margin: 0 0.5rem;
  text-align: center;
  font-size: 1.2rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FFD400;
  }
` 

const ButtonBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
`