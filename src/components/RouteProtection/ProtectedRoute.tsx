import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastPopup from "../ToastPopup";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    if (userRole !== role) {
      setShowToast(true);
      const timer = setTimeout(() => {
        navigate(-1); // 이전 페이지로 이동
      }, 1000); 
      
      return () => clearTimeout(timer);
    }
  }, [userRole, role]);

  if (userRole !== role) {
    return (
      <>
        {showToast && (
          <ToastPopup
            message="⚠️ 접근 권한이 없습니다."
            setToast={setShowToast}
            position="top"
          />
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
