import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";

const StaffSchedule = () => {
  const [storeId, setStoreId] = useState<string>("");
  const [viewType, setViewType] = useState<"store" | "mine">("mine");
  const navigate = useNavigate();

  // 내가 속한 가게 조회
  const {
    data: stores,
    error: storesError,
    isLoading: storesLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStore,
    initialData: [],
  });

  // 내가 속한 가게의 스케줄 조회
  const {
    data: schedules,
    error: schedulesError,
    isLoading: schedulesLoading,
  } = useQuery({
    queryKey: ["schedules", storeId], // storeId를 포함
    queryFn: () => getShopSchedules(storeId),
    enabled: !!storeId && !storesLoading, // storeId가 있을 때만 쿼리 실행
    initialData: [],
  });

  // 나의 스케줄 조회
  const {
    data: MySchedules,
    error: MySchedulesError,
    isLoading: MySchedulesLoading,
  } = useQuery({
    queryKey: ["MySchedules"],
    queryFn: getSchedules,
    enabled: !storesLoading,
    initialData: [],
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

  console.log("스케줄:", schedules);
  if (storesLoading) return <div>가게 정보를 불러오는 중...</div>;
  if (stores.length!==0 && storesError) return <div>가게를 조회하는 데 문제가 발생했습니다</div>;
  if (!stores?.length) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>소속된 가게가 없습니다</div>
        <Button
          message="가게 추가하기"
          width={80}
          onClick={() => navigate(`/store/register/staff`)}
        />
      </Box>
    );
  }
  if (schedulesLoading) return <div>가게 스케줄 로딩중...</div>;
  if (schedules.length!==0 && schedulesError)
    return <div>가게 스케줄을 불러오는 데 문제가 발생했습니다</div>;

  if (MySchedulesLoading) return <div>내 스케줄 로딩중..</div>;
  if (MySchedules.length!==0 && MySchedulesError)
    return <div>내 스케줄을 불러오는 데 문제가 발생했습니다.</div>;

  // viewType 에 따라 events 생성
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
      />
    </Box>
  );
};

export default StaffSchedule;
