import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const NoticeCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: "16px",
        border: "1px solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          솥뚜껑 삼겹살
        </Typography>
        <Typography variant="body2" color="text.secondary">
          3분전
        </Typography>
      </Box>
      <Typography variant="body2" color="text.primary">
        김알바님이 추가되었습니다.
      </Typography>
    </Paper>
  );
};

export default NoticeCard;
