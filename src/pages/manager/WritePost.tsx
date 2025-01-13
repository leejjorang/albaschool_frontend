import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Tiptap from "../../components/Tiptap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

interface postProps {
  title: string;
  content: string;
  image?: number;
}
// 임시 데이터 
const shopName = "솥뚜껑 삼겹살";
function WritePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postProps>();

  const onSubmit = async () => {
    //백엔드에 데이터 전송
  };

  return (
    <WritePostStyle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width:"100%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            type="submit"
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
            등록
          </Button>
        </Box>
      </Box>
        <TextField
          {...register("title", {
            required: "제목을 작성해주세요",
          })}
          placeholder="제목"
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#FAED7D",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFD400",
              },
            },
            marginBottom: 2,
          }}
        />
         <Tiptap />
      </StyledForm>
    </WritePostStyle>
  );
}
const WritePostStyle = styled.div`
  width: 100%;
  max-width: 400px;
  height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export default WritePost;
