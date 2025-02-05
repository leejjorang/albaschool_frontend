import { UpdateStoreProps } from "../pages/manager/UpdateStore";
import axiosInstance from "./AxiosInstance";

export const getStores = async () => {
  const response = await axiosInstance.get("/stores");
  return response.data;
};

export const validateBizRegistrationNum = async (bizRegistrationNum: string) => {
  const response = await axiosInstance.post("/validate/biz-registration-number", {bizRegistrationNum});
  return response.data;
}

export const createStoreManager = async (storeData: {
  title: string;
  location: string;
  contact: string;
  password: string;
  openTime: string;
  closeTime: string;
  bizRegistrationNum: string;
  type:string;
}) => {
  const response = await axiosInstance.post("/stores", storeData);
  return response.data;
};

export const createStoreStaff = async (storeId: string, password: string) => {
  const response = await axiosInstance.post(`/stores/${storeId}/members`, {
    password,
  });
  return response.data;
};

export const getStore = async () => {
  try {
    const response = await axiosInstance.get("/stores/me");
    return response.data;
  } catch (error) {
    console.error("getStore API Error:", error);
    // 추가적인 오류 처리 (예: 사용자에게 오류 메시지 표시)
    throw error; // 또는 return Promise.reject(error);
  }
};

export const getStoreById = async(storeId: string) => {
  const response = await axiosInstance.get(`/stores/${storeId}`);
  return response.data;
}

export const editStore = async(storeId: string, data:UpdateStoreProps) => {
  const response = await axiosInstance.put(`/stores/${storeId}`,data);
  return response.data;
}

export const deleteStore = async(storeId: string) => {
  const response = await axiosInstance.delete(`/stores/${storeId}`);
  return response.data;
}

export const getStoreMembers = async (storeId: string) => {
  const response = await axiosInstance.get(`/stores/${storeId}/members`);
  return response.data;
};

export const deleteStoreMembers = async (userId: string, storeId: string) => {
  const response = await axiosInstance.delete(`/stores/${storeId}/members/${userId}`);
  return response.data;
}
