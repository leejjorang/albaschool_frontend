import React from "react";
import { Paper, Typography } from "@mui/material";

const ShopNameCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "16px",
        border: "1px solid black",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        솥뚜껑 삼겹살
      </Typography>
    </Paper>
  );
};

export default ShopNameCard;
