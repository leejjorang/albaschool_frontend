import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { fixPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ToastPopup from "../../components/ToastPopup";
import { Button } from "../../components/Button";

interface ChangePwdProps {
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

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const changePassword = useMutation({
    mutationFn: fixPassword,
    onSuccess: () => {
      setToastMessage("✅ 비밀번호 변경 완료!");
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
      }, 800);
    },
    onError: () => {
      setToastMessage("❌ 비밀번호 변경 실패!");
      setShowToast(true);
    },
  });

  const onSubmit = async (data: ChangePwdProps) => {
    changePassword.mutate(data.newPassword);
  };

  const newPwd = watch("newPassword"); // newPassword 필드의 값을 실시간으로 감시

  return (
    <ChangePwdStyle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>비밀번호 변경</h2>
        <TextFieldWrapperStyle>
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
            }}
          />
        </TextFieldWrapperStyle>
        <Button type="submit" message="변경" width={56} />
      </StyledForm>
      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
    </ChangePwdStyle>
  );
}
const ChangePwdStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 7.5rem);

  h2 {
    font-size: 2rem;
  }
`;

const TextFieldWrapperStyle = styled.div`
  width: 90%;
  margin: 3rem 0;
`;

export default ChangePwd;
