import axiosInstance from "./AxiosInstance";

export const getEdulist = async (storeId: string) => {
  const response = await axiosInstance.get(`/stores/${storeId}/edu`);
  return response.data;
};

export const getPost = async (storeId: string, eduId: string) => {
  const response = await axiosInstance.get(`/stores/${storeId}/edu/${eduId}`);
  return response.data;
}
export const posting = async (storeId: string,formData: FormData) => {
  const response = await axiosInstance.post(`/stores/${storeId}/edu`, formData);
  return response.data;
};

export const editPost = async (
  storeId: string,
  eduId: string,
  formData: FormData
) => {
  const response = await axiosInstance.put(`/stores/${storeId}/edu/${eduId}`, formData);
  return response.data;
};

export const deletePost = async (storeId: string, eduId: string) => {
  const response = await axiosInstance.delete(`/stores/${storeId}/edu/${eduId}`);
  return response.data;
};