import styled from "styled-components";
import Bottom from "./Bottom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { connectSSE } from "../../services/sseService";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [unreadChats, setUnreadChats] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(false);

  useEffect(() => {
    const eventSource = connectSSE({
      onInitialize: (data) => {
        console.log("Initialize Data:", data);
        setUnreadNotifications(data);
      },
      onNotification: (data) => {
        console.log("New Notification:", data);
        setUnreadNotifications(data);
      },
      onChatRoomInitialize: (data) => {
        console.log("Chat Room Initialize Data:", data);
        setUnreadChats(data);
      },
      onChatNotification: (data) => {
        console.log("New Chat Notification:", data);
        setUnreadChats(data);
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
      <Bottom unread={unreadChats} />
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
