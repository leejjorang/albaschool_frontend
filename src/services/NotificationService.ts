import axiosInstance from "./AxiosInstance";

export const getNotifications = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

export const putRead = async () => {
  const response = await axiosInstance.put("/notifications/read");
  return response.data;
};
