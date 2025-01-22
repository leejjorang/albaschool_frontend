import styled from "styled-components";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authService";
import { useAuthStore } from "../../stores/authStore";
import { useState } from "react";
import ToastPopup from "../../components/ToastPopup";

export interface LoginProps {
  email: string;
  password: string;
}

const commonTextFieldStyle = {
  width: "100%",
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },
};

const Login = () => {
  const {storeLogin} = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();
  const navigate = useNavigate();
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToastMessage("✅ 로그인 성공!");
      setShowToast(true);
      storeLogin(data.token); // 상태 변화

      setTimeout(() => {
        navigate('/');
      }, 800);
    },
    onError: (error) => {
      setToastMessage("아이디 또는 비밀번호를 확인해주세요.");
      setShowToast(true);
      console.error(error);
    }
  });

  const onSubmit = async (data: LoginProps) => {
    loginMutation.mutate(data);
  };

  return (
    <LoginStyle>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <h2>로그인</h2>
        <TextFieldWrapperStyle>
          <TextField
            fullWidth
            variant="standard"
            label="이메일"
            {...register("email", {
              required: "이메일을 입력하세요",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: "올바른 이메일 형식이 아닙니다",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              ...commonTextFieldStyle,
              marginBottom: 2,
            }}
          />
          <TextField
            fullWidth
            variant="standard"
            type="password"
            label="비밀번호"
            {...register("password", { required: "비밀번호를 입력하세요" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              ...commonTextFieldStyle,
            }}
          />
        </TextFieldWrapperStyle>
        <Button type="submit" message="로그인" width={56} />
      </FormStyle>
      <span>
        <p>계정이 없으신가요?</p>
        <Link to="/signup/role">회원가입</Link>
      </span>
      {showToast && (
        <ToastPopup
          message={toastMessage} 
          setToast={setShowToast} 
          position="top"
        />
      )}
    </LoginStyle>
  );
};

export default Login;

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 9rem);

  span {
    display: inline-flex;
    gap: 0.5em;
    margin-top: 1rem;

    a {
      cursor: pointer;
      text-decoration: none;
      color: #ffd400;

      &:hover: {
        text-decoration: underline;
      }
    }
  }
`;

const FormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  h2 {
    font-size: 2.3rem;
  }
`;

const TextFieldWrapperStyle = styled.div`
  width: 90%;
  margin: 4rem 0 4rem;
`;
