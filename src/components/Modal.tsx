import { IoClose } from "react-icons/io5";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlayStyle onClick={onClose}>
      <ModalStyle onClick={(e) => e.stopPropagation()}>
        <ModalCloseStyle onClick={onClose}>
          <IoClose />
        </ModalCloseStyle>
        {children}
      </ModalStyle>
    </ModalOverlayStyle>
  );
};

const ModalOverlayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalStyle = styled.div`
  width: 45%;
  font-size: 17px;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: inset;
  padding: 30px;
  position: relative;
`;
const ModalCloseStyle = styled.div`
  position: absolute;
  cursor: pointer;
  width: 40px;
  height: 40px;
  right:-8px;
  top: 8px;
`;

export default Modal;
