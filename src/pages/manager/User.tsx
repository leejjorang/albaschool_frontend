import styled from "styled-components";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import UserProfile from "../../components/user/UserProfile";
import { ManagerStoreCard, ManagerStaffCard } from "../../components/user/Card";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/authService";
import {
  deleteStoreMembers,
  getStore,
  getStoreMembers,
} from "../../services/storeService";
import { IStore } from "../../types/store";
import { useEffect,useState } from "react";
import ToastPopup from "../../components/ToastPopup";

interface staffProps {
  id: string;
  name: string;
  contact: string;
}

const User = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
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
  });

  const [category, setCategory] = React.useState("");
  useEffect(() => {
    if (stores && stores.length > 0 && !category) {
      setCategory(stores[0].id);
    }
  }, [stores]);

  // 내 가게의 직원 조회
  const { data: staffs } = useQuery({
    queryKey: ["staffs", category], // category 를 포함
    queryFn: () => getStoreMembers(category),
    enabled: !!category, // category 가 있을 때만 쿼리 실행
    initialData: [],
  });
  
  // 직원 삭제
  const deleteMember = useMutation({
    mutationFn: (data:{userId: string; storeId: string;}) =>
      deleteStoreMembers(data.userId, data.storeId),
    onSuccess: () => {
      setToastMessage("✅ 직원 삭제 완료!");
      setShowToast(true);
    },
    onError: () => {
      setToastMessage("❌ 직원 삭제 실패!");
      setShowToast(true);
    },
  }); 

  const handleDelete = (userId: string) => {
    deleteMember.mutate({ 
      userId, 
      storeId: category 
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <UserProfile userName={userData?.name} />
      <WorkplaceBoxStyle>
        <span>
          <h2>가게 관리</h2>
          <Link to={"/store/register/manager"}>
            <ControlPointIcon />
          </Link>
        </span>
        <CardBoxStyle>
          {stores?.map((data: IStore) => (
            <ManagerStoreCard
              key={data.id}
              storeName={data.title}
              storeCode={data.id}
              openTime = {data.openTime}
              closeTime={data.closeTime}
            />
          ))}
        </CardBoxStyle>
      </WorkplaceBoxStyle>
      <StaffBoxStyle>
        <span>
          <h2>직원 관리</h2>
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: "55%", margin: "0" }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              가게명
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={handleChange}
              label="category"
            >
              {stores?.map((data: IStore) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </span>
        <CardBoxStyle>
          {staffs?.map((data: staffProps) => (
            <ManagerStaffCard
              key={data.id}
              staffName={data.name}
              staffPhone={data.contact}
              onDelete={() => handleDelete(data.id)}
            />
          ))}
        </CardBoxStyle>
        {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
      </StaffBoxStyle>
    </div>
  );
};

export default User;

const WorkplaceBoxStyle = styled.div`
  margin: 1rem 1.5rem;

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

const StaffBoxStyle = styled.div`
  margin: 1.5rem 1.5rem;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const CardBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  align-items: center;
`;
