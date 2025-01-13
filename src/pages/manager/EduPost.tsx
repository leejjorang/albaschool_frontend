import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface postProps {
  title: string;
  content: string;
}
// 임시 데이터
const data: postProps = {
  title: "👪 고객 응대 메뉴얼",
  content: "인사 친절하게 잘 해주세요!!",
};
const shopName = "솥뚜껑 삼겹살";

function EduPost() {
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
          />
          {shopName}
        </Box>
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
      </Box>
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
