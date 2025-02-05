import styled from "styled-components";
import { InputBox } from "../../components/InputBox";
import { Button, NegativeButton } from "../../components/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InputStyle } from "./RegisterStore";
import TimePick from "../../components/schedule/TimePick";
import ToastPopup from "../../components/ToastPopup";
import { useMutation } from "@tanstack/react-query";
import { editStore } from "../../services/storeService";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { ButtonStyle } from "../../components/user/Card";

export interface UpdateStoreProps {
  password: string;
  openTime: string;
  closeTime: string;
}
const UpdateStore = () => {
  const { state } = useLocation();
  const storeId = state?.storeId;
  const storeName = state?.storeName;

  const [openTime, setOpenTime] = useState<string | null>(state?.openTime);
  const [closeTime, setCloseTime] = useState<string | null>(state?.closeTime);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<UpdateStoreProps>();

  // 가게 수정
  const updateStore = useMutation({
    mutationFn: ({
      storeId,
      data,
    }: {
      storeId: string;
      data: UpdateStoreProps;
    }) => editStore(storeId, data),
    onSuccess: () => {
      setToastMessage("✅ 가게 수정 완료!");
      setShowToast(true);
      setIsOpen(false);  // 성공 시 모달 닫기
      setTimeout(() => {
        navigate(-1);
      }, 800);
    },
    onError: () => {
      setToastMessage("❌ 가게 수정 실패!");
      setShowToast(true);
    },
  });

  // 폼 제출 전 모달을 띄우는 함수
  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const onSubmit = async (data: UpdateStoreProps) => {
    updateStore.mutate({
      storeId: storeId,
      data: {
        password: data.password,
        openTime: openTime || "",
        closeTime: closeTime || "",
      },
    });
  };

  return (
    <UpdateStorerStyle onSubmit={handleOpenModal}>
      <h2>내 가게 수정하기</h2>
      <InputStyle>
        <InputBox
          name="password"
          title="비밀번호"
          type="password"
          placeholder="비밀번호를 변경해주세요"
          required={true}
          titleWidth={23}
          width={69}
          margin='1rem 0 0 0'
          register={register("password")}
        />
        <InputBoxStyle>
          <p>오픈 시간</p>
          <TimePick onChange={(e) => setOpenTime(e)} value={openTime} />
        </InputBoxStyle>
        <InputBoxStyle>
          <p>마감 시간</p>
          <TimePick
            onChange={(e) => setCloseTime(e)}
            startTime={openTime as string}
            value={closeTime}
          />
        </InputBoxStyle>
      </InputStyle>
      <Button message="수정하기" width={30} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>{storeName} 정보를 변경하시겠습니까?</p>
        <ButtonStyle>
          <Button
            message="수정"
            width={30}
            onClick={handleSubmit(onSubmit)}
          />
          <NegativeButton
            message="취소"
            width={30}
            onClick={() => setIsOpen(false)}
          />
        </ButtonStyle>
      </Modal>

      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
    </UpdateStorerStyle>
  );
};

const UpdateStorerStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7.5rem);

  h2 {
    font-size: 2rem;
  }
`;

export const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;
  margin-top: 1rem;

  p {
    width: 23%;
    text-align: end;
  }
`

export default UpdateStore;
