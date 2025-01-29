import styled, { keyframes } from "styled-components";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import ChatIcon from "./ChatIcon";

interface BottomProps {
  unread: boolean;
}

const Bottom = ({ unread }: BottomProps) => {
  const [value, setValue] = React.useState("schedule");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const routes: { [key: string]: string } = {
    schedule: role === "manager" ? "/manager" : "/staff",
    store: "/shoplist",
    chat: "/chats",
    mypage: role === "manager" ? "/user/manager" : "/user/staff",
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const path = routes[newValue];
    if (path) {
      navigate(path);
    }
  };

  return (
    <BottomStyle>
      <BottomNavigation
        sx={{ width: "100%", backgroundColor: "#FFD400" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="스케줄"
          value="schedule"
          icon={<ScheduleOutlinedIcon fontSize="large" />}
          sx={{ "&.Mui-selected": { color: "#FF6F00" } }}
        />
        <BottomNavigationAction
          label="가게"
          value="store"
          icon={<StorefrontIcon fontSize="large" />}
          sx={{ "&.Mui-selected": { color: "#FF6F00" } }}
        />
        <BottomNavigationAction
          label="채팅"
          value="chat"
          icon={<ChatIcon notification={true} />}
          sx={{ "&.Mui-selected": { color: "#FF6F00" } }}
        />
        <BottomNavigationAction
          label="마이페이지"
          value="mypage"
          icon={<PersonOutlineOutlinedIcon fontSize="large" />}
          sx={{ "&.Mui-selected": { color: "#FF6F00" } }}
        />
      </BottomNavigation>
    </BottomStyle>
  );
};

export default Bottom;

const BottomStyle = styled.div`
  background-color: #ffd400;
  padding: 0.2rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
`;
