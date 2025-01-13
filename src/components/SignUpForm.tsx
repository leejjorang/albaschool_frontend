import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface SignUpProps {   // 알바생
  email: string;
  verification: string;
  phone: string;
  password: string;
  checkPassword: string;
  name: string;
}

export interface BusinessSignUpProps extends SignUpProps {   // 사업자
  businessNum: string;
}

type SignUpType = "staff" | "business";
interface SignUpFormProps {
  type: SignUpType;
}

function SignUpForm({ type }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BusinessSignUpProps>();

  const password = watch("password");

  const onSubmit = async (data: BusinessSignUpProps | SignUpProps) => {
    if (type === "business") {
      // 사업자 회원가입 처리
      const businessData = data as BusinessSignUpProps;
    } else {
      // 일반 회원가입 처리
      const staffData = data as SignUpProps;
    }
  };

  return (
    <SignUpFormStyle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            width: "fit-content",
            margin: "20px auto",
            marginBottom: "1rem",
          }}
        >
          회원가입
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography className="title">이메일</Typography>
            <input
              className="inputBox"
              type="text"
              {...register("email", {
                required: "이메일을 입력하세요",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "올바른 이메일 형식이 아닙니다",
                },
              })}
              placeholder="abc@naver.com"
            />
            <Button
              size="small"
              variant="contained"
              sx={{
                marginRight: 1,
                height: "35px",
                color: "black",
                background: "#FAED7D",
                "&:hover": {
                  backgroundColor: "#FFD400",
                },
              }}
            >
              인증
            </Button>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography className="title"></Typography>
            <input
              className="inputBox"
              type="text"
              {...register("verification", {
                required: "인증번호를 입력하세요",
              })}
              placeholder="인증번호 입력"
            />
            <Button
              size="small"
              variant="contained"
              sx={{
                marginRight: 1,
                height: "35px",
                color: "black",
                background: "#FAED7D",
                "&:hover": {
                  backgroundColor: "#FFD400",
                },
              }}
            >
              확인
            </Button>
            {errors.verification && (
              <p className="error-text">{errors.verification.message}</p>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography className="title">비밀번호</Typography>
            <input
              className="inputBox"
              type="password"
              {...register("password", { required: "비밀번호를 입력하세요" })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography className="title">비밀번호 확인</Typography>
            <input
              className="inputBox"
              type="password"
              {...register("checkPassword", {
                required: "비밀번호를 확인하세요",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다",
              })}
            />
            {errors.checkPassword && (
              <p className="error-text">{errors.checkPassword.message}</p>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography className="title">이름</Typography>
            <input
              className="inputBox"
              type="text"
              {...register("name", { required: "이름을 입력하세요" })}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography className="title">전화번호</Typography>
            <input
              className="inputBox"
              type="text"
              {...register("phone", { required: "전화번호를 입력하세요" })}
              placeholder="010-1234-5678"
            />
            {errors.phone && (
              <p className="error-text">{errors.phone.message}</p>
            )}
          </Box>

          {type === "business" && (
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Typography className="title">사업자번호</Typography>
              <input
                className="inputBox"
                type="text"
                {...register("businessNum", {
                  required: "사업자번호를 입력하세요",
                })}
              />
              {errors.businessNum && (
                <p className="error-text">{errors.businessNum.message}</p>
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            marginTop: 3,
            width: "100%",
            display: "flex",
            justifyItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "0 auto",
              marginBottom: 3,
              color: "black",
              background: "#FAED7D",
              "&:hover": {
                backgroundColor: "#FFD400",
              },
            }}
          >
            회원가입
          </Button>
        </Box>
      </StyledForm>
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

  .title {
    min-width: 140px; // 최소 너비 설정
    text-align: center;
  }

  .inputBox {
    width: 100%; // 부모 요소 기준으로 너비 설정
    max-width: 220px;
    height: 35px;
    border-radius: 10px;
    background-color: #f7f6f6;
    border: 1px solid #dbcdcd;
    margin-bottom: 16px;
    margin-right: 10px;
    padding: 10px;

    &:focus {
      outline: none;
      border: 2px solid #ffd400;
    }
  }

  .error-text {
    color: red;
    font-size: 10px;
    position: absolute;
    bottom: 0;
    left:55%;
    transform: translateX(-40%);
    margin-bottom: 2px;
  }

  .MuiBox-root {
    position: relative;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
export default SignUpForm;
