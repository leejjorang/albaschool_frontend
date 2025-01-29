import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Badge } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

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

interface ChatIconProps {
  notification: boolean;
}

const ChatIcon = ({ notification }: ChatIconProps) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (notification) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }, [notification]);

  return (
    <Badge variant="dot" color="error" invisible={!notification}>
      <ShakingIcon fontSize="large" $shake={shake} />
    </Badge>
  );
};

export default ChatIcon;
