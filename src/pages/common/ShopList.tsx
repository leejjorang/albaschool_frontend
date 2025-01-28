import styled from "styled-components";
import ShopNameCard from "../../components/ShopNameCard";
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../services/storeService";
import { IStore } from "../../types/store";

const ShopList = () => {
  const role = localStorage.getItem("role");
  // 내가 속한 가게 조회
  const {
    data: stores,
    error: storesError,
    isLoading: storesLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
  });

  if (storesLoading) return <div>가게 정보를 불러오는 중...</div>;
  if (storesError) return <div>가게를 조회하는 데 문제가 발생했습니다</div>;
  if (!stores?.length) return <div>소속된 가게가 없습니다</div>;

  return (
    <ShopListStyle>
      {stores?.map((data: IStore) => (
        <ShopNameCard
          key={data.id}
          storeName={data.title}
          storeLink={`/edulist/${role}`}
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
