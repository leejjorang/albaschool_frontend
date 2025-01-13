import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface ChangePwdProps {
  password: string;
  newPassword: string;
  checkPassword: string;
}

const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
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

function ChangePwd() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePwdProps>();

  const onSubmit = async () => {
    //백엔드에 데이터 전송
  };

  const newPwd = watch("newPassword"); // newPassword 필드의 값을 실시간으로 감시

  return (
    <ChangePwdStyle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            width: "fit-content",
            margin: "0 auto",
            marginBottom: "50px",
          }}
        >
          비밀번호 변경
        </Typography>
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
            marginBottom: 2,
          }}
        />
        <TextField
          fullWidth
          variant="standard"
          type="password"
          label="새 비밀번호"
          {...register("newPassword", {
            required: "새로운 비밀번호를 입력하세요",
          })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          sx={{
            ...commonTextFieldStyle,
            marginBottom: 2,
          }}
        />
        <TextField
          fullWidth
          variant="standard"
          type="password"
          label="새 비밀번호 확인"
          {...register("checkPassword", {
            required: "비밀번호를 확인하세요",
            validate: (value) =>
              value === newPwd || "비밀번호가 일치하지 않습니다",
          })}
          error={!!errors.checkPassword}
          helperText={errors.checkPassword?.message}
          sx={{
            ...commonTextFieldStyle,
            marginBottom: 2,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "40%",
            marginTop: 3,
            color: "black",
            background: "#FAED7D",
            "&:hover": {
              backgroundColor: "#FFD400",
            },
          }}
        >
          변경
        </Button>
      </StyledForm>
    </ChangePwdStyle>
  );
}
const ChangePwdStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 8rem);
`;

export default ChangePwd;
