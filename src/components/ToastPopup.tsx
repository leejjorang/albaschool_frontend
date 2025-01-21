import { useEffect } from "react";
import styled, { keyframes } from 'styled-components';

function ToastPopup({
  message,
  setToast,
  position,
}: {
  message: string;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  position: "top" | "bottom";
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    },3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);
  return (
    <ToastPopupStyle $position={position}>
      <ToastMessage>{message}</ToastMessage>
    </ToastPopupStyle>
  );
}

interface ToastProps {
  $position: "top" | "bottom";
}
const ToastPopupStyle = styled.div<ToastProps>`
  position: fixed;
  z-index: 20;
  display: flex;
  height: 2.5rem;
  width: 80%;
  max-width: 73rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color:#FAF4C0;
  opacity: 90%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);

  ${props => props.$position === "top" ? `
    top: 4rem;
  ` : `
    bottom: 6rem;
  `}
  animation: ${(props) =>
      props.$position === "top" ? toastTopAnimation : toastBottomAnimation}
    0.3s ease-in-out;
`;

const ToastMessage = styled.p`
  font-size: 1rem;
  color: black;
`;

const toastTopAnimation = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const toastBottomAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export default ToastPopup;
