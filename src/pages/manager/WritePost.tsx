import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Tiptap from "../../components/Tiptap";

interface postProps {
  title: string;
  content: string;
  image?: number;
}
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
        <Box sx={{marginTop:"15px"}}>
          <Button
            size="medium"
            variant="contained"
            sx={{
              ...buttonStyle,
              marginRight: 5,
            }}
          >
            취소
          </Button>
          <Button
            size="medium" 
            type="submit"
            variant="contained"
            sx={{
              ...buttonStyle,
            }}
          >
            완료
          </Button>
        </Box>
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

const buttonStyle = {
  width: "30%",
  color: "black",
  background: "#FAED7D",
  "&:hover": {
    backgroundColor: "#FFD400",
  },
};

export default WritePost;
