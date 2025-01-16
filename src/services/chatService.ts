import axiosInstance from "./AxiosInstance";

export const getRooms = async () => {
  const response = await axiosInstance.get("/chat");
  return response.data;
};

export const createRoom = async (roomData: {
  storeId: string;
  title: string;
}) => {
  const response = await axiosInstance.post("/chat", roomData);
  return response.data;
};

export const lastMessage = async (messageData: {
  chatRoomId: string;
  messageId: string;
}) => {
  const response = await axiosInstance.put("/chat/message/last", messageData);
  return response.data;
};

export const getMessages = async (id: string) => {
  const response = await axiosInstance.get(`/chat/${id}`);
  return response.data;
};
