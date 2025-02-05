import { Box } from "@mui/material";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEdulist } from "../services/educationService";
import { AxiosError } from "axios";

interface eduProps {
  id: string;
  title: string;
  createdAt: string;
}

interface FormProps {
  type: "staff" | "business";
}

function EduListForm({ type }: FormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, storeId } = location.state;
  const role = localStorage.getItem('role');

  // 교육페이지 목록 조회
  const {
    data: edulists,
    error: edulistsError,
    isLoading: edulistsLoading,
  } = useQuery({
    queryKey: ["edulists", storeId],
    queryFn: async () => {
      try {
        return await getEdulist(storeId);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            // 빈 배열 반환
            return [];
          }
          throw error; 
        }
        throw error;
      }
    },
    enabled: !!storeId,
    initialData: [],
    retry: false, // 에러 발생 시 재시도하지 않음
  });

  return (
    <EduListStyle>
      <Box
        sx={{
          width: "100%",
          padding: "10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "21px"
          }}
        >
          <ArrowBackIosIcon
            sx={{
              fontSize: "30px",
              cursor: "pointer",
              "&:hover": {
                color: "#FFD400",
              },
            }}
            onClick={() => navigate("/shoplist")}
          />
          {storeName}
        </Box>
        {type === "business" && (
          <ControlPointIcon
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#FFD400",
              },
            }}
            onClick={() => navigate("/post/manager", {
              state: { storeName, storeId }
            })}
          />
        )}
      </Box>
      {edulistsLoading && <div>글 목록을 불러오는 중...</div>}
      {!edulistsLoading && edulistsError && (
        <div>글 목록을 가져오는 데 문제가 발생했습니다</div>
      )}
      {!edulistsLoading && !edulistsError && edulists.length === 0 && (
        <div>작성된 글이 없습니다</div>
      )}
      {edulists &&
        edulists.map((data: eduProps) => (
          <Box
            key={data.id}
            sx={{
              width: "100%",
              padding: 2,
              border: "1px solid #cdcdcd",
              borderRadius: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "#fcfcfc",
              marginBottom: 1,
            }}
            onClick={() => navigate(`/edupost/${role}`, {
              state: { storeName: storeName, storeId: storeId, eduId:data.id }
            })}
          >
            <span style={{fontSize: "1.1rem"}}>{data.title}</span>
          </Box>
        ))}
    </EduListStyle>
  );
}
const EduListStyle = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
`;
export default EduListForm;
