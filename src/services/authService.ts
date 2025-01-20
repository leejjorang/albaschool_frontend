import { BusinessSignUpProps, SignUpProps } from "../components/SignUpForm";
import axiosInstance from "./AxiosInstance";

export const validateEmail = async (email: string) => {
  const response = await axiosInstance.post("/auth/email" , {
    email: email
  });
  return response.data;
};

export const checkCode = async (email: string, code: string) => { 
  const response = await axiosInstance.post("/auth/email" , {
    email: email,
    code: code
  });

  return response.data;
}

export const signupStaff = async (data: SignUpProps) => {
  const response = await axiosInstance.post("/auth/register",{
    name: data.name,
    email: data.email,
    role: "staff",
    password: data.password,
    contact:data.phone
  });

  return response.data;
}

export const signupManager = async (data: BusinessSignUpProps) => {
  const response = await axiosInstance.post("/auth/register",{
    name: data.name,
    email: data.email,
    role: "manager",
    password: data.password,
    contact:data.phone
  });

  return response.data;
}