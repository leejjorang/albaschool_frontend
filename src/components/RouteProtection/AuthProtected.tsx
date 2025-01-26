import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { Outlet, useNavigate } from "react-router-dom";
import ToastPopup from "../ToastPopup";

const AuthProtected: React.FC = () => {
  const { isloggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isloggedIn) {
      setShowToast(true);
      const timer = setTimeout(() => {
        navigate("/");
        setShowToast(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isloggedIn, navigate]);

  if (!isloggedIn) {
    return (
      <>
        {showToast && (
          <ToastPopup
            message="⚠️ 로그인이 필요합니다."
            setToast={setShowToast}
            position="top"
          />
        )}
      </>
    );
  }

  return <Outlet />;
};

export default AuthProtected;
