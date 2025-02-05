import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePost, getPost } from "../services/educationService";
import DOMPurify from "dompurify";
import { useState } from "react";
import ToastPopup from "./ToastPopup";
import { SmallButton } from "./Button";

interface FormProps {
  type: "staff" | "business";
}

function EduPostForm({ type }: FormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeName, storeId, eduId } = location.state;
  const role = localStorage.getItem("role");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // 게시글 상세 조회
  const {
    data: edupost,
    error: edupostError,
    isLoading: edulpostLoading,
  } = useQuery({
    queryKey: ["edupost", storeId, eduId],
    queryFn: () => getPost(storeId, eduId),
    enabled: !!storeId && !!eduId,
  });

  // 게시글 삭제
  const deleteEduPost = useMutation({
    mutationFn: (data: { storeId: string; eduId: string }) =>
      deletePost(data.storeId, data.eduId),
    onSuccess: () => {
      setToastMessage("✅ 게시글 삭제 완료!");
      setShowToast(true);
      setTimeout(() => {
        navigate(-1);
      }, 800);
    },
    onError: () => {
      setToastMessage("❌ 게시글 삭제 실패!");
      setShowToast(true);
    },
  });

  const handleDeleteEduPost = (storeId: string, eduId: string) => {
    deleteEduPost.mutate({ storeId, eduId });
  };

  const sanitizedHtml = DOMPurify.sanitize(edupost?.content);

  return (
    <EduPostStyle>
      <Box
        sx={{
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
            fontSize: "21px",
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
                state: { storeName: storeName, storeId: storeId },
              })
            }
          />
          {storeName}
        </Box>
        {type === "business" && (
          <Box>
            <SmallNegativeButton 
              onClick={() => handleDeleteEduPost(storeId, eduId)}>
              삭제  
            </SmallNegativeButton>
            <SmallButton 
              message="수정"
              onClick={() =>
                navigate(`/post/${role}`, {
                  state: {
                    mode: "edit",
                    initialData: {
                      title: edupost?.title,
                      content: edupost?.content,
                    },
                    storeName,
                    storeId,
                    eduId,
                  },
                })
              }
            />
          </Box>
        )}
      </Box>
      {edulpostLoading && <div>글을 불러오는 중...</div>}
      {!edulpostLoading && edupostError && (
        <div>글을 불러오는 데 문제가 발생했습니다</div>
      )}
      {!edulpostLoading && !edupostError && edupost.length === 0 && (
        <div>작성된 글이 없습니다</div>
      )}
      <Box
        sx={{
          backgroundColor: "#fcfcfc",
          border: "1px solid #cdcdcd",
          borderRadius: "20px",
          padding: "15px",
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
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </Box>
      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
    </EduPostStyle>
  );
}
const EduPostStyle = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 auto;
  padding: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-bottom: 10px;
  }

  ol {
    counter-reset: item;
    margin-left: 1em;
    padding-left: 2px;
    overflow: hidden;

    li {
      display: block;
      position: relative;
      padding-left: 2em;
      margin: 0.5em 0;
      overflow: hidden;

      &::before {
        content: counter(item) ".";
        counter-increment: item;
        position: absolute;
        left: 0.5em;
      }

      p {
        margin: 0; // p 태그 마진 제거
      }
    }
  }

  ul {
    margin-left: 1em;
    padding-left: 2px;
    overflow: hidden;

    li {
      display: block;
      position: relative;
      padding-left: 2em;
      margin: 0.5em 0;
      overflow: hidden;

      &::before {
        content: "•";
        position: absolute;
        left: 0.5em;
      }

      p {
        margin: 0;
      }
    }
  }
`;

const SmallNegativeButton = styled.button`
  background-color: #F3F3F3;
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  padding: 0.3rem 0.9rem;
  margin-right: 0.5rem;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FF9D3C;
  }
`
export default EduPostForm;
