import { IPostSchedule, IGetSchedule } from "../types/schedule";
import axiosInstance from "./AxiosInstance";

export const getSchedules = async () => {
  const response = await axiosInstance.get("/chat");
  return response.data;
};

export const postSchedules = async (schedule: IPostSchedule) => {
  const response = await axiosInstance.post("/schedules", schedule);
  return response.data;
};

export const getShopSchedules = async (storeId: string) => {
  const response = await axiosInstance.get(`/schedules/${storeId}`);
  return response.data;
};

export const putSchedules = async (
  schedule: IGetSchedule, //인터페이스 수정?
  scheduleId: string
) => {
  const response = await axiosInstance.put(
    `/schedules/${scheduleId}`,
    schedule
  );
  return response.data;
};

export const deleteSchedules = async (scheduleId: string) => {
  const response = await axiosInstance.delete(`/schedules/${scheduleId}`);
  return response.data;
};
