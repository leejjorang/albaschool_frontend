import styled from "styled-components";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import UserProfile from "../../components/user/UserProfile";
import { StaffStoreCard } from "../../components/user/Card";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../services/authService";
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../services/storeService";
import { IStore } from "../../types/store";

const User = () => {
  // 사용자 정보 가져오기
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserInfo,
  });

  // 내가 속한 가게 조회
  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
    retry: false,
  });

  return (
    <div>
      <UserProfile userName={userData?.name} profile={userData?.profile} />
      <WorkplaceBoxStyle>
        <span>
          <h2>나의 근무지</h2>
          <Link to={"/store/register/staff"}>
            <ControlPointIcon />
          </Link>
        </span>
        <CardBoxStyle>
          {stores?.length === 0 ? (
            <div style={{ color: "#5F6368" }}>가게를 추가해주세요 😊</div>
          ) : (
            stores?.map((data: IStore) => (
              <StaffStoreCard key={data.id} storeName={data.title} />
            ))
          )}
        </CardBoxStyle>
      </WorkplaceBoxStyle>
    </div>
  );
};

export default User;

const WorkplaceBoxStyle = styled.div`
  margin: 1rem 1.5rem;

  h2 {
    font-size: 1.35rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  a {
    display: flex;
    color: #000000;
  }
`;

const CardBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;
