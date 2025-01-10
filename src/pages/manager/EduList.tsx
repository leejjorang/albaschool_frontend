import { Box, Button } from "@mui/material";
import styled from "styled-components";

interface eduProps {
  title: string;
  date: string;
}

// 임시 데이터
const list: eduProps[] = [
  { title: "🧾 포스 사용법", date: "2025-01-09" },
  { title: "🧹 매장 청소 및 정리 방법", date: "2025-01-08" },
];
function EduList() {
  return (
    <EduListStyle>
      <Box sx={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "flex-end", 
        marginBottom: 2
      }}>
        <Button
          variant="contained"
          sx={{
            width: "30%",
            color: "black",
            background: "#FAED7D",
            "&:hover": {
              backgroundColor: "#FFD400",
            },
          }}
        >
          작성하기
        </Button>
      </Box>
      {list.map((item, index) => (
        <Box key={index} sx={{
          width:"100%",
          padding:2,
          border:"1px solid #DBCDCD",
          borderRadius:3,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          cursor:"pointer",
          backgroundColor: "#F7F6F6",
          marginBottom: 1,
        }}>
          <span style={{fontWeight:"bold"}}>{item.title}</span>
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
