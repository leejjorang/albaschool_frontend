import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { Input, InputBox } from "../../components/InputBox";
import { Button, NegativeButton } from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { checkPassword } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastPopup from "../../components/ToastPopup";

const UserEdit = () => {
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const validatePassword = useMutation({
    mutationFn: checkPassword,
    onSuccess: () => {
      setToastMessage("✅ 비밀번호 확인 완료!");
      setShowToast(true);
      setTimeout(() => {
        navigate("/user/changepwd");
      }, 800);
    },
    onError: () => {
      setToastMessage("❌ 비밀번호 확인 실패!");
      setShowToast(true);
    },
  });

  const handleValidatePassword = () => {
    validatePassword.mutate(password);
  };

  return (
    <div>
      <ProfileBoxStyle>
        <Avatar
          src="/broken-image.jpg"
          sx={{ width: "7.5rem", height: "7.5rem" }}
        />
        <ButtonBoxStyle>
          <Button message="사진 수정" width={35} />
          <NegativeButton message="사진 삭제" width={35} />
        </ButtonBoxStyle>
      </ProfileBoxStyle>

      <InputStyle>
        <InputBox
          id="id"
          title="아이디"
          type="email"
          placeholder="email123@email.com"
          disabled={true}
          titleWidth={18}
          width={75}
        />
        <InputBoxStyle>
          <p>비밀번호</p>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            width={55}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleValidatePassword}>변경</button>
        </InputBoxStyle>
        <InputBox
          id="name"
          title="이름"
          type="text"
          placeholder="홍길동"
          titleWidth={18}
          width={75}
        />
        <InputBox
          id="phone"
          title="전화번호"
          type="tel"
          placeholder="010-1234-5678"
          titleWidth={18}
          width={75}
        />
      </InputStyle>

      <ButtonBoxStyle>
        <Button message="로그아웃" width={35} />
        <NegativeButton message="회원탈퇴" width={35} />
      </ButtonBoxStyle>
      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
    </div>
  );
};

export default UserEdit;

const ProfileBoxStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3.5rem;
`;

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin: 2rem 0 4rem;
`;

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
    background-color: #faed7d;
    border: 1px solid #dbcdcd;
    border-radius: 10px;

    &:focus,
    &:hover {
      background-color: #ffd400;
    }
  }
`;

const ButtonBoxStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.7rem;
  width: 100%;
`;
