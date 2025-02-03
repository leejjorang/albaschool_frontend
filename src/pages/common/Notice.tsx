import styled from "styled-components";
import NoticeCard from "../../components/NoticeCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getNotifications, putRead } from "../../services/NotificationService";
import { chatListTime } from "../../utils/chatListTime";
import { INotification } from "../../types/notification";
import { chatNotificationStore } from "../../stores/chatNotificationStore";
import { utcToKtc } from "../../utils/utcToKtc";

const Notice = () => {
  const setUnreadNotifications = chatNotificationStore(
    (state) => state.setUnreadNotifications
  );
  const mutation = useMutation({
    mutationFn: putRead,
    onSuccess: (data) => {
      console.log("Update successful:", data);
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
  useEffect(() => {
    mutation.mutate();
    setUnreadNotifications(false);
  }, []);
  const { data } = useQuery<INotification[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  return (
    <ChatListStyle>
      {data?.map((notice) => (
        <NoticeCard
          key={notice.id}
          storeName={notice.title}
          message={notice.content}
          time={chatListTime(notice.createdAt)}
        />
      ))}
    </ChatListStyle>
  );
};

export default Notice;

const ChatListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`;
