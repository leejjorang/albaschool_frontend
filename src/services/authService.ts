import { BusinessSignUpProps, SignUpProps } from "../components/SignUpForm";
import axiosInstance from "./AxiosInstance";

export const sendCode = async (email: string) => {
  const response = await axiosInstance.post("/auth/email" , {
    email: email
  });
  return response.data;
};

export const validateEmail = async (email: string, code: string) => { 
  const response = await axiosInstance.post("/auth/email/verify" , {
    email: email,
    code: code
  });

  return response.data;
}

export const signUp = async (data: SignUpProps) => {
  const response = await axiosInstance.post("/auth/register",{
    name: data.name,
    email: data.email,
    password: data.password,
    contact:data.phone,
    role: data.role
  });

  return response.data;
}

// export const signupManager = async (data: BusinessSignUpProps) => {
//   const response = await axiosInstance.post("/auth/register",{
//     name: data.name,
//     email: data.email,
//     role: "manager",
//     password: data.password,
//     contact:data.phone
//   });

//   return response.data;
// }