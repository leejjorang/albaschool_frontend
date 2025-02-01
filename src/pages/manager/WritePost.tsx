import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Tiptap from "../../components/Tiptap";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { posting } from "../../services/educationService";
import ToastPopup from "../../components/ToastPopup";

// 폼 입력 데이터 타입
export interface postProps {
  title: string;
  content: string;
  img?: File;
  deleteImg?: boolean;
}
function WritePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, storeId } = location.state;
  const role = localStorage.getItem("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postProps>();

  const [editorContent, setEditorContent] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const posts = useMutation({
    mutationFn: (formData: FormData) => posting(storeId, formData),
    onSuccess: () => {
      setToastMessage("✅ 글 작성 완료!");
      setShowToast(true);
      setTimeout(() => {
        navigate(`/edulist/${role}`, { state: { storeName, storeId } });
      }, 800);
    },
    onError: () => {
      setToastMessage("❌ 글 작성 실패!");
      setShowToast(true);
    },
  });

  const onSubmit = async (data: postProps) => {
    const formData = new FormData();

    // 제목과 콘텐츠 추가
    formData.append("title", data.title);
    formData.append("content", editorContent);

    // 이미지가 Base64 형식일 경우 Blob으로 변환 후 추가
    if (data.img) {
      formData.append("img", data.img); // 선택된 파일이 있는 경우
    }

    // 서버로 데이터 전송
    posts.mutate(formData);
  };
  

  return (
    <WritePostStyle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
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
              onClick={() =>
                navigate(`/edulist/${role}`, {
                  state: { storeName, storeId },
                })
              }
            />
            {storeName}
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
        <Tiptap onContentChange={handleEditorChange} />
      </StyledForm>
      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
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
