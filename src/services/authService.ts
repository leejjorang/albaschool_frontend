import { SignUpProps } from "../components/SignUpForm";
import { LoginProps } from "../pages/common/Login";
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

export const login= async (data: LoginProps) => {
  const response = await axiosInstance.post("/auth/login",{
    email: data.email,
    password: data.password
  });

  return response.data;
}

export const checkPassword = async (data: string) => {
  const response = await axiosInstance.post("/auth/checkPassword",{
    password: data
  });

  return response.data;
}

export const fixPassword = async(data: string) => {
  const response = await axiosInstance.put("/auth/fixPassword",{
    password: data
  });

  return response.data;
}

export const getUserInfo = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}