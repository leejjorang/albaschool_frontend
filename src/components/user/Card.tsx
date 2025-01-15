import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveIcon from '@mui/icons-material/Remove';

interface storeCardProps {
  storeName: string;
}

interface managerStoreCardProps extends storeCardProps {
  storeCode: string;
}

interface StaffCardProps {
  staffName: string;
  staffPhone: string;
}

export const StaffStoreCard: React.FC<storeCardProps> = ({storeName}) => {
  return (
    <StaffCardStyle>
      <p>{storeName}</p>
    </StaffCardStyle>
  )
}

export const ManagerStoreCard: React.FC<managerStoreCardProps> = ({storeName, storeCode}) => {
  return (
    <ManagerCardStyle>
      <span>
        <p>{storeName}</p>
        <p style={{color: '#7E7E7E'}}>{storeCode}</p>
      </span>
      <EditOutlinedIcon />
      <RemoveIcon sx={{ color: 'red' }}/>
    </ManagerCardStyle>
  )
}

export const ManagerStaffCard: React.FC<StaffCardProps> = ({staffName, staffPhone}) => {
  return (
    <ManagerCardStyle>
      <p style={{width: '26%'}}>{staffName}</p>
      <p>{staffPhone}</p>
      <RemoveIcon sx={{ color: 'red' }}/>
    </ManagerCardStyle>
  )
}

const StaffCardStyle = styled.div`
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  width: 100%;
  padding: 0.8rem 0.8rem;
  font-size: 1.3rem;
  text-align: center;

  &:focus, &:hover { 
    background-color: #FAED7D;
  }
`

const ManagerCardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  width: 100%;
  padding: 0.8rem 0.8rem;
  font-size: 1.3rem;

  &:focus, &:hover { 
    background-color: #FAED7D;
  }

  span {
    display: inline-flex;
    gap: 0.5rem;
    width: 80%;
  }
`