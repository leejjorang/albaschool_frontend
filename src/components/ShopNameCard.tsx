import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ShopCardProps {
  storeName: string;
  storeLink: string;
  storeId: string;
}

const ShopNameCard: React.FC<ShopCardProps> = ({storeName, storeLink, storeId}) => {
  const navigate = useNavigate();
  const goToStoreEdu = () => {
    navigate(`${storeLink}`, {state: { storeName, storeId }});
  }
  return (
    <ShopCardStyle onClick={goToStoreEdu}>
      <p>{storeName}</p>
    </ShopCardStyle>
  );
};

export default ShopNameCard;


const ShopCardStyle = styled.div`
  border: 1px solid #000000;
  width: 93%;
  padding: 1.1rem 1rem;
  border-radius: 10px;

  p {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }

  &:focus, &:hover {
    background-color: #FFD400;
  }
`