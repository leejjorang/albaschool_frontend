import { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import TimeTable from "../../../components/schedule/TimeTable";
import { getStore } from "../../../services/storeService";
import { useQuery } from "@tanstack/react-query";
import { IStore } from "../../../types/store";
import {
  getSchedules,
  getShopSchedules,
} from "../../../services/scheduleService";
import { createEvents } from "../../../features/schedule/createEvents";
import StoreIsEmpty from "../../../components/StoreIsEmpty";

const StaffSchedule = () => {
  const [storeId, setStoreId] = useState<string>("");
  const [viewType, setViewType] = useState<"store" | "mine">("mine");
  const [openTime, setOpenTime] = useState("00:00:00");
  const [closeTime, setCloseTime] = useState("23:59:59");

  // 내가 속한 가게 조회
  const { data: stores, isLoading: storesLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
    retry: false,
  });

  // 내가 속한 가게의 스케줄 조회
  const { data: schedules = []} = useQuery({
    queryKey: ["schedules", storeId], // storeId를 포함
    queryFn: () => getShopSchedules(storeId),
    enabled: !!storeId && !storesLoading, // storeId가 있을 때만 쿼리 실행
    initialData: [],
    retry: false,
  });

  // 나의 스케줄 조회
  const { data: MySchedules, isLoading: MySchedulesLoading } = useQuery({
    queryKey: ["MySchedules"],
    queryFn: getSchedules,
    enabled: !storesLoading,
    initialData: [],
    retry: false, // 에러 발생 시 재시도하지 않음
  });

  const handleShopChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === "mine") {
      setViewType("mine");
      setStoreId("");
    } else {
      setViewType("store");
      setStoreId(value);
    }
  };

  useEffect(() => {
    if (viewType === "store") {
      const store = stores.find((store: IStore) => store.id === storeId);
      if (store) {
        setOpenTime(store.openTime);
        setCloseTime(store.closeTime);
      }
    } else {
      // mine인 경우 가장 빠른 openTime 찾기
      const findMinOpenTime = () => {
        const validStores = stores.filter(
          (store: IStore) => store.openTime !== "00:00:00"
        );
        if (!validStores.length) return "00:00:00";

        const timeToMinutes = (time: string) => {
          const [hours, minutes] = time.split(":").map(Number);
          return hours * 60 + minutes;
        };

        // 시간을 기준으로 정렬하여 가장 빠른 시간 찾기
        const sortedStores = [...validStores].sort(
          (a, b) => timeToMinutes(a.openTime) - timeToMinutes(b.openTime)
        );

        return sortedStores[0].openTime;
      };

      setOpenTime(findMinOpenTime());
    }
  }, [viewType, storeId, stores]);

  console.log("스케줄:", schedules);
  if (storesLoading) return <div>가게 정보를 불러오는 중...</div>;
  if (!stores?.length) {
    return <StoreIsEmpty />;
  }
  if (MySchedulesLoading) return <div>내 스케줄 로딩중..</div>;

  //viewType 에 따라 events 생성
  const events =
    viewType === "mine"
      ? createEvents(MySchedules, "mine")
      : createEvents(schedules, "store");

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
            value={storeId || "mine"}
            onChange={handleShopChange}
            sx={{ overflow: "hidden" }}
          >
            <MenuItem value="mine">⏰ 개인 일정</MenuItem>
            {stores?.map((data: IStore) => (
              <MenuItem key={data.id} value={data.id}>
                {data.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TimeTable
        events={events}
        storeId={viewType === "store" ? storeId : undefined}
        openTime={openTime}
        closeTime={closeTime}
      />
    </Box>
  );
};

export default StaffSchedule;
