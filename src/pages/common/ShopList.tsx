import styled from "styled-components";
import ShopNameCard from "../../components/ShopNameCard";
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../services/storeService";
import { IStore } from "../../types/store";
import StoreIsEmpty from "../../components/StoreIsEmpty";

const ShopList = () => {
  const role = localStorage.getItem("role");
  // 내가 속한 가게 조회
  const {
    data: stores,
    isLoading: storesLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
    retry:false
  });

  if (storesLoading) return <div>가게 정보를 불러오는 중...</div>;
  if (!stores?.length) return <StoreIsEmpty />;

  return (
    <ShopListStyle>
      {stores?.map((data: IStore) => (
        <ShopNameCard
          key={data.id}
          storeName={data.title}
          storeLink={`/edulist/${role}`}
          storeId={data.id}
        />
      ))}
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
`;
