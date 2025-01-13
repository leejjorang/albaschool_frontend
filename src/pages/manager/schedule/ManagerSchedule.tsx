import { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import TimeTable from "../../../components/schedule/TimeTable";
import ScheduleModal from "../../../components/schedule/ScheduleModal";

const ManagerSchedule = () => {
  const [shopId, setShopId] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleShopChange = (event: SelectChangeEvent) => {
    setShopId(event.target.value);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl sx={{ height: "3rem", width: "12rem" }}>
          <Select
            value={shopId}
            onChange={handleShopChange}
            sx={{ overflow: "hidden" }}
          >
            <MenuItem value="1">솥뚜껑 삼겹살</MenuItem>
            <MenuItem value="2">롯데리아</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "6rem", height: "2.7rem" }}
        >
          추가하기
        </Button>
        <ScheduleModal open={modalOpen} onClose={handleClose}>
          <Button variant="contained">추가</Button>
        </ScheduleModal>
      </Box>
      <TimeTable />
    </Box>
  );
};

export default ManagerSchedule;
