import styled from "styled-components";
import ShopNameCard from "../../components/ShopNameCard";

const ShopList = () => {
  return (
    <ShopListStyle>
      <ShopNameCard storeName="솥뚜껑 삼겹살" storeLink="/edulist/staff" />
      <ShopNameCard storeName="서브웨이" storeLink="/edulist/staff" />
      <ShopNameCard storeName="CU 편의점" storeLink="/edulist/manager" />
    </ShopListStyle>
  );
};

export default ShopList;


const ShopListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1rem;
`
