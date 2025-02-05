import styled from "styled-components";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { chatNotificationStore } from "../../stores/chatNotificationStore";

// interface HeaderProps {
//   notification: boolean;
// }

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSelected, setIsSelected] = useState(false);
  const unreadNotifications = chatNotificationStore(
    (state) => state.unreadNotifications
  );

  useEffect(() => {
    if (location.pathname !== "/notice") {
      setIsSelected(false);
    }
  }, [location.pathname]);

  const openNotice = () => {
    if (!isSelected) {
      setIsSelected(true);
      navigate("/notice");
    } else {
      setIsSelected(false);
      navigate(-1);
    }
  };

  return (
    <HeaderStyle>
      <Title>알바스쿨</Title>
      <Badge variant="dot" color="error" invisible={!unreadNotifications}>
        <NotificationsNoneIcon
          fontSize="large"
          sx={{ color: isSelected ? "#FF6F00" : "rgba(0, 0, 0, 0.6)" }}
          onClick={openNotice}
        />
      </Badge>
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.div`
  background-color: #ffd400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.9rem;
  position: fixed;
  width: 100%;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 1.6rem;
`;
