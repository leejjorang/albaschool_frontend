import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { Input, InputBox } from "../../components/InputBox";
import { Button, NegativeButton } from "../../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkPassword, getUserInfo } from "../../services/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastPopup from "../../components/ToastPopup";
import { useAuthStore } from "../../stores/authStore";
import { Box } from "@mui/material";

const UserEdit = () => {
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });

  const { storeLogout } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        contact: userData.contact || "",
      });
    }
  }, [userData]);

  const validatePassword = useMutation({
    mutationFn: checkPassword,
    onSuccess: () => {
      setToastMessage("✅ 비밀번호 확인 완료!");
      setShowToast(true);
      setTimeout(() => {
        navigate("/user/changepwd");
      }, 800);
    },
    onError: () => {
      setToastMessage("❌ 비밀번호 확인 실패!");
      setPassword("");
      setShowToast(true);
    },
  });

  // 수정 완료 핸들러
  const updateUserInfo = useMutation({
    // mutationFn: (updateData) => {
    //   // API 호출 함수 필요
    //   return updateUserInfo(updateData);
    // },
    // onSuccess: () => {
    //   setToastMessage("✅ 회원정보가 수정되었습니다!");
    //   setShowToast(true);
    //   setIsEditing(false);
    // },
    // onError: () => {
    //   setToastMessage("❌ 회원정보 수정에 실패했습니다!");
    //   setShowToast(true);
    // },
  });

  const handleValidatePassword = () => {
    validatePassword.mutate(password);
  };

  const handleLogout = () => {
    storeLogout();
    setToastMessage("✅ 로그아웃 되었습니다.");
    setShowToast(true);

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        contact: userData.contact || "",
      });
    }
    setIsEditing(false);
  };

  // 로딩 상태 처리
  if (userDataLoading) return <div>로딩중...</div>;
  if (userDataError) return <div>사용자 정보를 불러오는데 실패했습니다</div>;

  return (
    <div>
      <ProfileBoxStyle>
        <Avatar
          src="/broken-image.jpg"
          sx={{ width: "7.5rem", height: "7.5rem" }}
        />
        <ButtonBoxStyle>
          <Button message="사진 수정" width={35} />
          <NegativeButton message="사진 삭제" width={35} />
        </ButtonBoxStyle>
      </ProfileBoxStyle>

      <InputStyle>
        <InputBox
          name="id"
          title="아이디"
          type="email"
          value={userData?.email}
          disabled={true}
          titleWidth={18}
          width={75}
        />
        <InputBoxStyle>
          <p>비밀번호</p>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            width={55}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleValidatePassword}>변경</button>
        </InputBoxStyle>
        <InputBox
          name="name"
          title="이름"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEditing}
          titleWidth={18}
          width={75}
        />
        <InputBox
          name="phone"
          title="전화번호"
          type="tel"
          value={formData.contact}
          onChange={handleChange}
          disabled={!isEditing}
          titleWidth={18}
          width={75}
        />
      </InputStyle>

      <ButtonBoxStyle>
        {isEditing ? (
          <>
            <Button
              message="수정 완료"
              width={35}
              // onClick={() => updateUserInfo.mutate(formData)}
            />
            <NegativeButton message="취소" width={35} onClick={handleCancel} />
          </>
        ) : (
          <>
            <Button
              message="수정하기"
              width={35}
              onClick={() => setIsEditing(true)}
            />
            <Button message="로그아웃" width={35} onClick={handleLogout} />
          </>
        )}
      </ButtonBoxStyle>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <NegativeButton message="회원탈퇴" width={35} />
      </Box>
      {showToast && (
        <ToastPopup
          message={toastMessage}
          setToast={setShowToast}
          position="top"
        />
      )}
    </div>
  );
};

export default UserEdit;

const ProfileBoxStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3.5rem;
`;

const InputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin: 2rem 0 4rem;
`;

const InputBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 0.8rem;

  p {
    width: 18%;
    text-align: end;
  }

  button {
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
    background-color: #faed7d;
    border: 1px solid #dbcdcd;
    border-radius: 10px;

    &:focus,
    &:hover {
      background-color: #ffd400;
    }
  }
`;

const ButtonBoxStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.7rem;
  width: 100%;
`;
