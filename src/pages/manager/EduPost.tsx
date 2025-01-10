import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface postProps {
  title: string;
  content: string;
}
// 임시 데이터
const data: postProps = {
  title: "👪 고객 응대 메뉴얼",
  content: "인사 친절하게 잘 해주세요!!",
};

function EduPost() {
  return (
    <EduPostStyle>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon sx={{
          fontSize: "30px",
          cursor:"pointer",
          "&:hover": {
            color: "#FFD400",
          }
        }}/>
        <Box>
          <Button
            variant="contained"
            sx={{
              marginRight:"20px",
              width: "10%",
              color: "black",
              background: "#FAED7D",
              "&:hover": {
                backgroundColor: "#FFD400",
              },
            }}
          >
            수정
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "10%",
              color: "black",
              background: "#FAED7D",
              "&:hover": {
                backgroundColor: "#FFD400",
              },
            }}
          >
            삭제
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#f7f6f6",
          border: "1px solid #dbcdcd",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {data.title}
        </p>
        <p>{data.content}</p>
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
`;
export default EduPost;
