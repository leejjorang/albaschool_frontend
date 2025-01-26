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
}) => {
  const response = await axiosInstance.post("/stores", storeData);
  return response.data;
};

export const createStoreStaff = async (storeId: string, password: string) => {
  const response = await axiosInstance.post(`/stores/${storeId}/members`, {password});
  return response.data;
};