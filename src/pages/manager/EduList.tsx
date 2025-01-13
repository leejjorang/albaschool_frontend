import { Box } from "@mui/material";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface eduProps {
  title: string;
  date: string;
}

// 임시 데이터
const list: eduProps[] = [
  { title: "🧾 포스 사용법", date: "2025-01-09" },
  { title: "🧹 매장 청소 및 정리 방법", date: "2025-01-08" },
];
const shopName = "솥뚜껑 삼겹살";

function EduList() {
  return (
    <EduListStyle>
      <Box
        sx={{
          width: "100%",
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
          />
          {shopName}
        </Box>

        <AddCircleIcon
          sx={{
            cursor: "pointer",
            color: "#FAED7D",
            "&:hover": {
              color: "#FFD400",
            },
          }}
        />
      </Box>
      {list.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            padding: 2,
            border: "1px solid #DBCDCD",
            borderRadius: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "#F7F6F6",
            marginBottom: 1,
          }}
        >
          <span style={{ fontWeight: "bold" }}>{item.title}</span>
          <span>{item.date}</span>
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
export default EduList;
