import styled from "styled-components";

interface StaffStordCardProps {
  storeName: string;
}

export const StoreCard: React.FC<StaffStordCardProps> = ({storeName}) => {
  return (
    <CardStyle>
      {storeName}
    </CardStyle>
  )
}


const CardStyle = styled.div`
  background-color: #F6F6F6;
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  width: 100%;
  padding: 0.9rem 0.8rem;
  font-size: 1.3rem;
  text-align: center;

  &:focus, &:hover { 
    background-color: #FAED7D;
  }
`