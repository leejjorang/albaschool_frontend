import styled from "styled-components";
import Bottom from "./Bottom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { connectSSE } from "../../services/sseService";
import { chatNotificationStore } from "../../stores/chatNotificationStore";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [unreadNotifications, setUnreadNotifications] = useState(false);
  const unreadMessages = chatNotificationStore((state) => state.unreadMessages);
  const setUnreadMessages = chatNotificationStore(
    (state) => state.setUnreadMessages
  );

  useEffect(() => {
    const eventSource = connectSSE({
      onInitialize: (data) => {
        console.log("Initialize Data:", data);
        //setUnreadNotifications(data);
      },
      onNotification: (data) => {
        console.log("New Notification:", data);
        //setUnreadNotifications(data);
      },
      onChatRoomInitialize: (data) => {
        console.log("Chat Room Initialize Data:", data);
        setUnreadMessages(data);
      },
      onChatNotification: (data) => {
        console.log("New Chat Notification:", data);
        setUnreadMessages(true);
      },
    });
    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <LayoutStyle>
      <Header />
      <MainStyle>{children}</MainStyle>
      <Bottom notification={true} />
    </LayoutStyle>
  );
};

export default Layout;

const LayoutStyle = styled.div`
  width: 100vw;
  height: 100vh;
`;
const MainStyle = styled.div`
  margin-top: 3.5rem;
  margin-bottom: 4rem;
`;
