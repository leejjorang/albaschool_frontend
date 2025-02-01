import styled from "styled-components";
import Bottom from "./Bottom";
import Header from "./Header";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connectSSE } from "../../services/sseService";
import { chatNotificationStore } from "../../stores/chatNotificationStore";
import { chatIconStore } from "../../stores/chatIconStore";
import { useLocation } from "react-router-dom";
import { useChatScrollStore } from "../../stores/chatScrollStore";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [unreadNotifications, setUnreadNotifications] = useState(false);
  const unreadMessages = chatNotificationStore((state) => state.unreadMessages);
  const setUnreadMessages = chatNotificationStore(
    (state) => state.setUnreadMessages
  );
  const setShake = chatIconStore((state) => state.setShake);
  // const isConnectedRef = useRef(false);

  const isNewMessage = useChatScrollStore((state) => state.isNewMessage);
  const scrollContainerRef = useRef<HTMLDivElement>(null); //채팅방 스크롤 컨트롤
  const isChatRoom = location.pathname.startsWith("/chats/");
  const scrollToBottom = () => {
    if (isChatRoom && scrollContainerRef.current) {
      setTimeout(() => {
        console.log(
          "Set scrollTop to:",
          scrollContainerRef.current!.scrollHeight
        );
        scrollContainerRef.current!.scrollTop =
          scrollContainerRef.current!.scrollHeight;
        console.log("scrollTop after:", scrollContainerRef.current!.scrollTop);
      }, 0);
    }
  };
  // // useEffect(() => {
  // //   scrollToBottom();
  // // }, [location.pathname, children]);
  // useLayoutEffect(() => {
  //   scrollToBottom();
  // }, [location.pathname, children]);
  useEffect(() => {
    if (isNewMessage) {
      scrollToBottom();
      const timeout = setTimeout(() => {
        useChatScrollStore.setState({ isNewMessage: false });
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [isNewMessage]);

  useEffect(() => {
    // if (isConnectedRef.current) return;
    // isConnectedRef.current = true;

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
        //if (location.pathname.startsWith("/chats/")) return;
        console.log("New Chat Notification:", data);
        setUnreadMessages(true);
        setShake(true);
      },
    });
    return () => {
      // isConnectedRef.current = false;
      eventSource.close();
    };
  }, []);
  return (
    <LayoutStyle ref={scrollContainerRef}>
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
  overflow-y: auto;
`;
const MainStyle = styled.div`
  margin-top: 3.5rem;
  margin-bottom: 4rem;
`;
