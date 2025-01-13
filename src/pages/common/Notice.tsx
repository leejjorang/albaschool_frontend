import NoticeCard from "../../components/NoticeCard";
import { Box } from "@mui/material";

const Notice = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        p: "1rem",
      }}
    >
      <NoticeCard />
      <NoticeCard />
    </Box>
  );
};

export default Notice;
