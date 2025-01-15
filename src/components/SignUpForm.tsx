import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "./Button";

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
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <h2>회원가입</h2>
        
        <InputWrapperStyler>
          <InputBoxStyle>
            <div>
              <p>이메일</p>
              <input style={{width: '50%'}}
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
              <button>인증</button>
            </div>
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </InputBoxStyle>

          <InputBoxStyle>
            <div>
              <p></p>
              <input style={{width: '50%'}}
                className="inputBox"
                type="text"
                {...register("verification", {
                  required: "인증번호를 입력하세요",
                })}
                placeholder="인증번호 입력"
              />
              <button>확인</button>
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
              <p>비밀번호 확인</p>
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
                placeholder="010-1234-5678"
              />
            </div>
            {errors.phone && (
              <p className="error-text">{errors.phone.message}</p>
            )}
          </InputBoxStyle>

          {type === "business" && (
            <InputBoxStyle>
              <div>
                <p>사업자번호</p>
                <input
                  className="inputBox"
                  type="text"
                  {...register("businessNum", {
                    required: "사업자번호를 입력하세요",
                  })}
                />
              </div>
              {errors.businessNum && (
                <p className="error-text">{errors.businessNum.message}</p>
              )}
            </InputBoxStyle>
          )}
        </InputWrapperStyler>
        <Button type="submit" message="회원가입" width={40} />
      </FormStyle>
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

  h2 {
    font-size: 2.3rem;
  }
`;

const InputWrapperStyler = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 2.5rem;
`

const InputBoxStyle = styled.div`
  width: 100%;
  margin-bottom: 0.8rem;
  
  p {
    color: red;
    margin-left: 6.5rem;
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
      border: 1px solid #CDCDCD;
      padding: 0.6rem 0.5rem;
      font-size: 0.9rem;

      &:focus {
        outline: none;
        border: 1px solid #ffd400;
      }
    }

    button {
      font-size: 0.9rem;
      padding: 0.5rem 0.8rem;
      background-color: #FAED7D;
      border: 1px solid #DBCDCD;
      border-radius: 10px;

      &:focus, &:hover {
        background-color: #FFD400;
      }
    }
  }

`




export default SignUpForm;
