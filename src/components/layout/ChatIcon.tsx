import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Badge } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { chatNotificationStore } from "../../stores/chatNotificationStore";
import { chatIconStore } from "../../stores/chatIconStore";

const shakeAnimation = keyframes`
  0% { transform: rotate(0); }
  25% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0); }
`;

const ShakingIcon = styled(ChatOutlinedIcon)<{ $shake: boolean }>`
  animation: ${({ $shake }) => ($shake ? shakeAnimation : "none")} 0.6s
    ease-in-out;
`;

const ChatIcon = () => {
  const unreadMessages = chatNotificationStore((state) => state.unreadMessages);
  const shake = chatIconStore((state) => state.shake);
  const setShake = chatIconStore((state) => state.setShake);

  useEffect(() => {
    if (shake) {
      const timeout = setTimeout(() => setShake(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [shake, setShake]);

  return (
    <Badge
      variant="dot"
      color="error"
      invisible={!unreadMessages}
      sx={{ overflow: "hidden" }}
    >
      <ShakingIcon fontSize="large" $shake={shake} />
    </Badge>
  );
};

export default ChatIcon;
