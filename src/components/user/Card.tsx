import styled from "styled-components";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import Modal from "../Modal";
import { Button, NegativeButton } from "../Button";
import { useNavigate } from "react-router-dom";

interface storeCardProps {
  storeName: string;
}

interface managerStoreCardProps extends storeCardProps {
  storeCode: string;
  openTime?:string;
  closeTime?:string;
  onDelete: () => void;
}

interface StaffCardProps {
  staffName: string;
  staffPhone: string;
  onDelete: () => void;
}

export const StaffStoreCard: React.FC<storeCardProps> = ({ storeName }) => {
  return (
    <StaffCardStyle>
      <p>{storeName}</p>
    </StaffCardStyle>
  );
};

export const ManagerStoreCard: React.FC<managerStoreCardProps> = ({
  storeName,
  storeCode,
  openTime,
  closeTime,
  onDelete,
}) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/store/update/manager', {
      state: { storeName: storeName, storeId: storeCode , openTime: openTime , closeTime: closeTime}
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <ManagerCardStyle>
      <span>
        <p style={{ fontWeight: "600" }}>{storeName}</p>
        <p style={{ color: "#7E7E7E" }}>{storeCode}</p>
      </span>
      <EditOutlinedIcon sx={{ cursor: "pointer" }} onClick={handleEditClick}/>
      <RemoveIcon sx={{ color: "red" }} onClick={() => setIsOpen(true)}/>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>{storeName} 가게를 삭제하시겠습니까?</p>
        <ButtonStyle>
          <Button message="삭제" width={30} onClick={handleDelete} />
          <NegativeButton
            message="취소"
            width={30}
            onClick={() => setIsOpen(false)}
          />
        </ButtonStyle>
      </Modal>
    </ManagerCardStyle>
  );
};

export const ManagerStaffCard: React.FC<StaffCardProps> = ({
  staffName,
  staffPhone,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <ManagerCardStyle>
      <p style={{ width: "30%" }}>{staffName}</p>
      <p style={{ width: "55%" }}>{staffPhone}</p>
      <RemoveIcon
        sx={{ color: "red", cursor: "pointer" }}
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>{staffName} 직원을 삭제하시겠습니까?</p>
        <ButtonStyle>
          <Button message="삭제" width={30} onClick={handleDelete} />
          <NegativeButton
            message="취소"
            width={30}
            onClick={() => setIsOpen(false)}
          />
        </ButtonStyle>
      </Modal>
    </ManagerCardStyle>
  );
};

const StaffCardStyle = styled.div`
  border: 1px solid #cdcdcd;
  background-color: #fcfcfc;
  border-radius: 10px;
  width: 100%;
  padding: 1rem 0.8rem;
  font-size: 1.15rem;
  text-align: center;
`;

const ManagerCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #cdcdcd;
  background-color: #fcfcfc;
  border-radius: 10px;
  width: 100%;
  padding: 1rem 0.8rem;
  font-size: 1.3rem;

  span {
    display: inline-flex;
    gap: 0.5rem;
    width: 80%;
  }

  p {
    font-size: 1.15rem;
  }
`;

export const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;
