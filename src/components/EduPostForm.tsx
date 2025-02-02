import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/educationService";
import DOMPurify from "dompurify";

// interface postProps {
//   title: string;
//   content: string;
// }

interface FormProps {
  type: "staff" | "business";
}

function EduPostForm({ type }: FormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, storeId, eduId } = location.state;
  const role = localStorage.getItem('role');

  const {
    data: edupost,
    error: edupostError,
    isLoading: edulpostLoading,
  } = useQuery({
    queryKey: ["edupost", storeId, eduId],
    queryFn: ()=> getPost(storeId, eduId),
    enabled: !!storeId && !!eduId,
  });

  const sanitizedHtml = DOMPurify.sanitize(edupost?.content);

  return (
    <EduPostStyle>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom:1
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
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
            onClick={() => navigate(`/edulist/${role}`, {
              state: { storeName: storeName, storeId: storeId}
            })}
          />
          {storeName}
        </Box>
        {type === "business" && (
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              marginRight: "20px",
              color: "black",
              background: "#E9E9E9",
              "&:hover": {
                backgroundColor: "#B9B9B9",
              },
            }}
          >
            삭제
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              color: "black",
              background: "#FAED7D",
              "&:hover": {
                backgroundColor: "#FFD400",
              },
            }}
          >
            수정
          </Button>
        </Box>
        )}
      </Box>
      {edulpostLoading && <div>글 목록을 불러오는 중...</div>}
      {!edulpostLoading && edupostError && (
        <div>글 목록을 가져오는 데 문제가 발생했습니다</div>
      )}
      {!edulpostLoading && !edupostError && edupost.length === 0 && (
        <div>작성된 글이 없습니다</div>
      )}
      <Box
        sx={{
          backgroundColor: "#f7f6f6",
          border: "1px solid #dbcdcd",
          borderRadius: "20px",
          padding: "15px",
          margin:"0 10px"
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {edupost?.title}
        </p>
        <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </Box>
    </EduPostStyle>
  );
}
const EduPostStyle = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px auto;

  
  img {
    width: 100%;
    height: auto; /* 비율 유지하며 높이를 자동 조정 */
    object-fit: contain; /* 컨테이너 안에 맞게 비율 유지 */
    margin-bottom: 10px; /* 이미지 아래 여백 추가 */
  }

  ol,
  ul {
    list-style-type: decimal; /* 숫자 리스트 */
    padding-left: 20px; /* 왼쪽 여백 추가 */
    margin-left: 0;
    font-size: 16px; /* 리스트 글자 크기 조정 */
    line-height: 1.5; /* 줄 간격 조정 */
  }
`;
export default EduPostForm;
