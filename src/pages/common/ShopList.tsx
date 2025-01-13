import ShopNameCard from "../../components/ShopNameCard";
import { Box } from "@mui/material";

const ShopList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0.8rem",
        p: "1rem",
        mt: "0.5rem",
      }}
    >
      <ShopNameCard />
      <ShopNameCard />
    </Box>
  );
};

export default ShopList;
