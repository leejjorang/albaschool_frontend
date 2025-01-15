import styled from "styled-components";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

interface LoginProps {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async () => {
    //백엔드에 데이터 전송
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
              marginBottom: 2
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
              ...commonTextFieldStyle
            }}
          />
        </TextFieldWrapperStyle>
        <Button type="submit" message="로그인" width={56} />
      </FormStyle>
      <span>
        <p>계정이 없으신가요?</p>
        <Link to='/signup/staff'>회원가입</Link>
      </span>
    </LoginStyle>
  );
}

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
      color: #FFD400;

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
`