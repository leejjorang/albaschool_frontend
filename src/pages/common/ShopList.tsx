import styled from "styled-components";
import ShopNameCard from "../../components/ShopNameCard";

const ShopList = () => {
  const role = localStorage.getItem('role');
  return (
    <ShopListStyle>
      <ShopNameCard storeName="솥뚜껑 삼겹살" storeLink={`/edulist/${role}`} />
      <ShopNameCard storeName="서브웨이" storeLink={`/edulist/${role}`} />
      <ShopNameCard storeName="CU 편의점" storeLink={`/edulist/${role}`} />
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
