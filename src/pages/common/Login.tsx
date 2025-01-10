import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface LoginProps {
  email: string;
  password: string;
}

const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const commonTextFieldStyle = {
  width: "100%",
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFD400",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#FFD400",
  },
};

function Login() {
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
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ 
            fontWeight: "bold",
            marginBottom: 4
          }}
        >
          Login
        </Typography>
        
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
            marginBottom: 3,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            width:"40%",
            marginBottom: 3,
            color: "black",
            background: "#FAED7D",
            "&:hover": {
              backgroundColor: "#FFD400",
            },
          }}
        >
          로그인
        </Button>
      </StyledForm>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>계정이 없으신가요?</Typography>
        <Typography 
          component="span" 
          sx={{ 
            cursor: 'pointer',
            color: '#FFD400',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          회원가입
        </Typography>
      </Box>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 8rem);
`;

export default Login;
