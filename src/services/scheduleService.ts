import { IPostSchedule, IPutSchedule } from "../types/schedule";
import axiosInstance from "./AxiosInstance";
import { AxiosError } from "axios";

export const getSchedules = async () => {
  const response = await axiosInstance.get("/schedules");
  return response.data;
};

export const postSchedules = async (
  storeId: string,
  schedule: IPostSchedule
) => {
  const response = await axiosInstance.post(`/schedules/${storeId}`, schedule);
  return response.data;
};

export const getShopSchedules = async (storeId: string) => {
  try {
    const response = await axiosInstance.get(`/schedules/${storeId}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return []; // 스케줄이 없는 경우 빈 배열 반환
    }
    throw error;
  }
};

export const putSchedules = async (
  scheduleId: string,
  schedule: IPutSchedule
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
