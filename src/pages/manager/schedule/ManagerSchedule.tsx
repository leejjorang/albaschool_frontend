import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import TimeTable from "../../../components/schedule/TimeTable";
import ScheduleModal from "../../../components/schedule/ScheduleModal";
import { getStore } from "../../../services/storeService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IStore } from "../../../types/store";
import { getShopSchedules } from "../../../services/scheduleService";
import { createEvents } from "../../../features/schedule/createEvents";
import StoreIsEmpty from "../../../components/StoreIsEmpty";
import styled from "styled-components";


const ManagerSchedule = () => {
  const [storeId, setStoreId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [openTime, setOpenTime] = useState('00:00:00');
  const [closeTime, setCloseTime] = useState('00:00:00');
  const queryClient = useQueryClient();
  
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setModalOpen(false);
    queryClient.invalidateQueries({ 
      queryKey: ["schedule", storeId] 
    });
  }
  
  //가게 정보들 가져오기
  const {
    data: stores,
    isLoading: storeLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
    retry: false,
  });

  //해당 가게의 스케쥴 가져오기
  const {
    data: schedules, 
    isLoading: schedulesLoading
  } = useQuery({
    queryKey: ["schedule", storeId],
    queryFn: () => getShopSchedules(storeId),
    enabled: !!storeId,
    initialData: [],
    retry: false,
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
  if (!stores?.length) return <StoreIsEmpty />;

  if (schedulesLoading) return <div>가게 스케줄 로딩중...</div>;

  return (
    <Box>
      <Box
        sx={{
          padding: "1rem 1rem 0",
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
        <ButtonStyle onClick={handleOpen}>추가하기</ButtonStyle>
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

const ButtonStyle = styled.button`
  background-color: #FAED7D;
  border: 1px solid #CDCDCD;
  border-radius: 10px;
  padding: 0.7rem 1.3rem;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;

  &:focus, &:hover {
    background-color: #FFD400;
  }
` 

export default ManagerSchedule;
