import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "./Button";
import { useMutation } from "@tanstack/react-query";
import { sendCode, signUp, validateEmail } from "../services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastPopup from "./ToastPopup";

export interface SignUpProps {
  email: string;
  verification: string;
  phone: string;
  password: string;
  checkPassword: string;
  name: string;
  role: string;
}

type SignUpType = "staff" | "manager";
interface SignUpFormProps {
  type: SignUpType;
}

function SignUpForm({ type }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpProps>();

  const email = watch("email"); // 현재 입력된 이메일 값 감시
  const code = watch("verification"); // 현재 입력된 코드 감시
  const password = watch("password");
  const navigate = useNavigate();

  const role = type==="staff" ? "staff" : "manager";

  const [isCodeSent, setIsCodeSent] = useState(false); // 전송 버튼 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 인증 버튼 상태
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 이메일이 변경될 때만 초기화
  useEffect(() => {
    setIsCodeSent(false);
    setIsEmailVerified(false);
  }, [email]);

  const sendVerificationCode = useMutation({
    mutationFn: sendCode,
    onSuccess: (data) => {
      console.log(data);
      setToastMessage("인증번호 발송 완료!");
      setShowToast(true);
      setIsCodeSent(true);
    },
    onError: () => {
      setToastMessage("인증번호 발송 실패!");
      setShowToast(true);
      setIsCodeSent(false);
    },
  });

  const EmailValidation = useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      validateEmail(data.email, data.code),
    onSuccess: (data) => {
      console.log(data);
      setToastMessage("이메일 인증 완료!");
      setShowToast(true);
      setIsEmailVerified(true);
    },
    onError: () => {
      setToastMessage("이메일 인증 실패!");
      setShowToast(true);
      setIsEmailVerified(false);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpProps) =>
      signUp({
        ...data,
        role: role,
      }),
    onSuccess: () => {
      setToastMessage("회원가입 성공!");
      setShowToast(true);
      setTimeout(() => {
        navigate('/login');
      }, 800);
    },
    onError: (error) => {
      setToastMessage("회원가입 실패!");
      setShowToast(true);
      console.error(error);
    },
  });

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const handleSendingCode = () => {
    if (!email) {
      setToastMessage("이메일을 입력해주세요.");
      setShowToast(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setToastMessage("올바른 이메일 형식이 아닙니다.");
      setShowToast(true);
      return;
    }

    // 유효성 검사 통과 후 이메일 인증 요청
    sendVerificationCode.mutate(email);
  };

  const handleVerifyCode = () => {
    EmailValidation.mutate({
      email: email, // 현재 입력된 이메일
      code: code, // 사용자가 입력한 인증코드
    });
  };

  const onSubmit = async (data: SignUpProps) => {
    if (!isEmailVerified) {
      setToastMessage("이메일 인증이 필요합니다.");
      setShowToast(true);
      return;
    }

    signUpMutation.mutate(data);
  };

  return (
    <SignUpFormStyle>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <h2>회원가입</h2>

        <InputWrapperStyler>
          <InputBoxStyle>
            <div>
              <p>이메일</p>
              <input
                style={{ width: "50%" }}
                className="inputBox"
                type="text"
                {...register("email", {
                  required: "이메일을 입력하세요",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "올바른 이메일 형식이 아닙니다",
                  },
                })}
                placeholder="이메일을 입력해주세요"
              />
              <button
                type="button"
                onClick={handleSendingCode}
                disabled={
                  !email || sendVerificationCode.isPending || isCodeSent
                }
              >
                {sendVerificationCode.isPending
                  ? "전송중..."
                  : isCodeSent
                  ? "전송됨"
                  : "전송"}
              </button>
            </div>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </InputBoxStyle>

          <InputBoxStyle>
            <div>
              <p></p>
              <input
                style={{ width: "50%" }}
                className="inputBox"
                type="text"
                {...register("verification", {
                  required: "인증번호를 입력하세요",
                })}
                placeholder="인증번호 입력"
                disabled={!isCodeSent || email === "" || isEmailVerified}
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={!code || EmailValidation.isPending || isEmailVerified}
              >
                {EmailValidation.isPending
                  ? "인증중..."
                  : isEmailVerified
                  ? "인증됨"
                  : "인증"}
              </button>
            </div>
            {errors.verification && (
              <p className="error-text">{errors.verification.message}</p>
            )}
          </InputBoxStyle>

          <InputBoxStyle>
            <div>
              <p>비밀번호</p>
              <input
                className="inputBox"
                type="password"
                {...register("password", { required: "비밀번호를 입력하세요" })}
              />
            </div>
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </InputBoxStyle>

          <InputBoxStyle>
            <div>
              <p>
                비밀번호
                <br />
                확인
              </p>
              <input
                className="inputBox"
                type="password"
                {...register("checkPassword", {
                  required: "비밀번호를 확인하세요",
                  validate: (value) =>
                    value === password || "비밀번호가 일치하지 않습니다",
                })}
              />
            </div>
            {errors.checkPassword && (
              <p className="error-text">{errors.checkPassword.message}</p>
            )}
          </InputBoxStyle>

          <InputBoxStyle>
            <div>
              <p>이름</p>
              <input
                className="inputBox"
                type="text"
                {...register("name", { required: "이름을 입력하세요" })}
              />
            </div>
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </InputBoxStyle>

          <InputBoxStyle>
            <div>
              <p>전화번호</p>
              <input
                className="inputBox"
                type="text"
                {...register("phone", { required: "전화번호를 입력하세요" })}
                placeholder="'-'를 빼고 입력해주세요"
              />
            </div>
            {errors.phone && (
              <p className="error-text">{errors.phone.message}</p>
            )}
          </InputBoxStyle>
        </InputWrapperStyler>
        <Button type="submit" message="회원가입" width={40} />
      </FormStyle>
      {showToast && (
        <ToastPopup
          message={toastMessage} 
          setToast={setShowToast} 
          position="top"
        />
      )}
    </SignUpFormStyle>
  );
}

const SignUpFormStyle = styled.div`
  width: 100%;
  height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;

  h2 {
    font-size: 2.3rem;
  }
`;

const InputWrapperStyler = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 2.5rem;
`;

const InputBoxStyle = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;

  .error-text {
    color: red;
    position: absolute;
    left: 28%;
    padding-left: 0.8rem;
    margin-top: 0.2em;
    font-size: 0.8rem;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    p {
      color: #000000;
      width: 25%;
      text-align: right;
      margin-left: 0;
    }

    input {
      width: 70%;
      border-radius: 10px;
      border: 1px solid #cdcdcd;
      padding: 0.6rem 0.5rem;
      font-size: 0.9rem;

      &:focus {
        outline: none;
        border: 1px solid #ffd400;
      }
    }

    input:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.7;
    }

    button {
      font-size: 0.9rem;
      padding: 0.5rem 0.8rem;
      background-color: #faed7d;
      border: 1px solid #dbcdcd;
      border-radius: 10px;

      &:focus,
      &:hover {
        background-color: #ffd400;
      }
    }
  }
`;

export default SignUpForm;
