import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { Input, InputBox } from "../../components/InputBox";
import { Button, NegativeButton } from "../../components/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { checkPassword, deleteProfile, getUserInfo, postProfile, updateUserInfo } from "../../services/authService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastPopup from "../../components/ToastPopup";
import { useAuthStore } from "../../stores/authStore";

const UserEdit = () => {
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { storeLogout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserInfo,
  });

  useEffect(() => {
    if (userData && !isEditing) {
      setFormData({
        name: userData.name || "",
        contact: userData.contact || "",
      });
    }
  }, [userData,isEditing]);

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
  const updateUser = useMutation({
    mutationFn: (data: { name: string; contact: string }) => 
      updateUserInfo(data.name, data.contact),
    onSuccess: () => {
      setToastMessage("✅ 회원정보가 수정되었습니다!");
      setShowToast(true);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
    onError: () => {
      setToastMessage("❌ 회원정보 수정에 실패했습니다!");
      setShowToast(true);
    },
  });
  
  const handleValidatePassword = () => {
    validatePassword.mutate(password);
  };

  const handleLogout = () => {
    storeLogout();
    setToastMessage("✅ 로그아웃 되었습니다.");
    setShowToast(true);
    localStorage.removeItem('role');

    setTimeout(() => {
      navigate("/");
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

  const {mutate: uploadFile} = useMutation({
    mutationFn: postProfile,
    onSuccess: () => {
      setToastMessage("✅ 프로필 사진이 변경되었습니다.");
      setShowToast(true);
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
    onError: (error) => {
      setToastMessage("❌ 프로필 사진 변경이 실패했습니다.");
      setShowToast(true);
      console.error(error);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    uploadFile(file);
  }

  const {mutate: removeProfile} = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      setToastMessage("✅ 프로필 사진이 삭제되었습니다.");
      setShowToast(true);
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
    onError: (error) => {
      setToastMessage("❌ 프로필 사진 삭제가가 실패했습니다.");
      setShowToast(true);
      console.error(error);
    }
  });

  const handleRemoveProfile = () => {
    removeProfile()
  }

  // 유효성 검사 함수
const validateForm = () => {
  const phoneRegex = /^010[0-9]{8}$/; // 010 으로 시작하는 11자리 숫자

  if (!formData.name.trim()) {
    setToastMessage("❌ 이름을 입력해주세요!");
    setShowToast(true);
    return false;
  }

  if (!phoneRegex.test(formData.contact)) {
    setToastMessage("❌ 올바른 전화번호 형식이 아닙니다! ");
    setShowToast(true);
    return false;
  }

  return true;
};

// 수정 버튼 클릭 핸들러
const handleUpdateClick = () => {
  if (validateForm()) {
    updateUser.mutate(formData);
  }
};


  // 로딩 상태 처리
  if (userDataLoading) return <div>로딩중...</div>;
  if (userDataError) return <div>사용자 정보를 불러오는데 실패했습니다</div>;

  return (
    <div>
      <ProfileBoxStyle>
        <Avatar
          src={userData.profile}
          sx={{ width: "8rem", height: "8rem" }}
        />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{display: "none"}}/>
        <ButtonBoxStyle>
          <Button message="사진 수정" width={35} onClick={() => fileInputRef.current?.click()}/>
          <NegativeButton message="사진 삭제" width={35} onClick={handleRemoveProfile} />
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
            width={57}
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
          name="contact"
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
              onClick={handleUpdateClick}
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
      {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
        <NegativeButton message="회원탈퇴" width={35} />
      </Box> */}
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
  margin-top: 4rem;
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
    padding: 0.6rem 0.8rem;
    background-color: #faed7d;
    border: 1px solid #cbcdcd;
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
  margin: 2.5rem 0;
  gap: 0.7rem;
  width: 100%;
`;
