import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveIcon from '@mui/icons-material/Remove';

interface StordCardProps {
  storeName: string;
  storeCode: string;
}

interface StaffCardProps {
  staffName: string;
  staffPhone: string;
}

export const StoreCard: React.FC<StordCardProps> = ({storeName, storeCode}) => {
  return (
    <CardStyle>
      <span>
        <p>{storeName}</p>
        <p style={{color: '#7E7E7E'}}>{storeCode}</p>
      </span>
      <EditOutlinedIcon />
      <RemoveIcon sx={{ color: 'red' }}/>
    </CardStyle>
  )
}

export const StaffCard: React.FC<StaffCardProps> = ({staffName, staffPhone}) => {
  return (
    <CardStyle>
      <p style={{width: '26%'}}>{staffName}</p>
      <p>{staffPhone}</p>
      <RemoveIcon sx={{ color: 'red' }}/>
    </CardStyle>
  )
}


const CardStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F6F6F6;
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  width: 100%;
  padding: 0.9rem 0.8rem;
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