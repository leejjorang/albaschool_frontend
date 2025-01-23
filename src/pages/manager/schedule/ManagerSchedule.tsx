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
import { getStore } from "../../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { IStore } from "../../../types/store";

const ManagerSchedule = () => {
  const {
    data: stores,
    error: storesError,
    isLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
  });
  if (!isLoading) console.log(stores, storesError);

  const [storeId, setStoreId] = useState<string>(stores[0].id);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleShopChange = (event: SelectChangeEvent) => {
    setStoreId(event.target.value);
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
            value={storeId}
            onChange={handleShopChange}
            sx={{ overflow: "hidden" }}
          >
            {stores.map((data: IStore) => (
              <MenuItem value={data.id}>{data.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "6rem", height: "2.7rem" }}
        >
          추가하기
        </Button>
        <ScheduleModal
          open={modalOpen}
          onClose={handleClose}
          mode="add"
          storeId={storeId}
        />
      </Box>
      <TimeTable />
    </Box>
  );
};

export default ManagerSchedule;
