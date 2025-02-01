import { useEffect, useState } from "react";
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
import { getStore, getStoreMembers } from "../../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { IStore } from "../../../types/store";
import { getShopSchedules } from "../../../services/scheduleService";
import { createEvents } from "../../../features/schedule/createEvents";

const ManagerSchedule = () => {
  const [storeId, setStoreId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [openTime, setOpenTime] = useState('00:00:00');
  const [closeTime, setCloseTime] = useState('00:00:00');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);


  //가게 정보들 가져오기
  const {
    data: stores,
    error: storesError,
    isLoading: storeLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: []
  });

  //해당 가게의 스케쥴 가져오기기
  const {
    data: schedules, 
    error: schedulesError,
    isLoading: schedulesLoading
  } = useQuery({
    queryKey: ["schedule", storeId],
    queryFn: () => getShopSchedules(storeId),
    enabled: !!storeId,
    initialData: []
  });

  //해당 가게의 스케쥴들 전달하는 함수
  const events = createEvents(schedules, "store"); 

  useEffect(() => {
    if (stores?.length > 0) {
      setStoreId(stores[0].id);
    }
  }, [stores]);

  useEffect(() => {
    const store = stores.find((store: IStore) => store.id === storeId);
    if(store) {
      setOpenTime(store.openTime);
      setCloseTime(store.closeTime);
    }
  }, [storeId]);


  if (storeLoading) return <div>로딩중...</div>;
  if (storesError) return <div>에러가 발생했습니다</div>;
  if (!stores?.length) return <div>매장 정보가 없습니다</div>;

  if (schedulesLoading) return <div>가게 스케줄 로딩중...</div>;
  //if (schedulesError) return <div>가게 스케줄을 불러오는 데 문제가 발생했습니다</div>;

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
            onChange={(e) => setStoreId(e.target.value)}
            sx={{ overflow: "hidden" }}
          >
            {stores.map((data: IStore, i:number) => (
              <MenuItem key={i} value={data.id}>{data.title}</MenuItem>
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
      <TimeTable events={events} openTime={openTime} closeTime={closeTime} storeId={storeId} />
    </Box>
  );
};

export default ManagerSchedule;
