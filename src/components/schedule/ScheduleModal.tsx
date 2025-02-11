import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimePick from "./TimePick";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSchedules,
  postSchedules,
  putSchedules,
} from "../../services/scheduleService";
import { getStoreMembers } from "../../services/storeService";
import { IPostSchedule, IPutSchedule } from "../../types/schedule";
import { IMember } from "../../types/store";
import styled from "styled-components";
import ToastPopup from "../ToastPopup";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  storeId: string;
  scheduleId?: string;
  selectedMember?: string;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ScheduleModal = ({
  open,
  onClose,
  mode,
  storeId,
  scheduleId,
  selectedMember,
}: ScheduleModalProps) => {
  const [worker, setWorker] = useState("");
  const [day, setDay] = useState(0);
  const [startTime, setStartTime] = useState<string | null>("00:00");
  const [endTime, setEndTime] = useState<string | null>("00:00");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const queryClient = useQueryClient();

  //가게 직원들 가져오기
  const {
    data: members,
    error: membersError,
    isLoading: membersLoading,
  } = useQuery({
    queryKey: ["storeMemers", storeId],
    queryFn: () => getStoreMembers(storeId),
    enabled: !!storeId,
    initialData: [],
  });

  useEffect(() => {
    if (mode === "edit" && selectedMember) {
      setWorker(selectedMember);
    }
  }, [mode, selectedMember]);

  const addMutation = useMutation({
    mutationFn: (data: { storeId: string; scheduleData: IPostSchedule }) =>
      postSchedules(data.storeId, data.scheduleData),
    onSuccess: () => {
      setToastMessage("✅ 스케줄 추가 성공!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 800);
    },
    onError: (error) => {
      setToastMessage("❌ 스케줄 추가 실패!");
      setShowToast(true);
      console.log(error);
    },
  });

  const addHandler = () => {
    if (!worker || !startTime || !endTime) {
      setToastMessage("⚠️ 모든 필드를 입력하세요.");
      setShowToast(true);
      return;
    }

    const scheduleData = {
      userId: worker,
      content: "파트타임",
      dayOfWeek: day,
      startTime: startTime,
      endTime: endTime,
    };

    console.log(storeId, scheduleData);
    addMutation.mutate({ storeId, scheduleData });
  };

  const editMutation = useMutation({
    mutationFn: (data: { scheduleId: string; scheduleData: IPutSchedule }) =>
      putSchedules(data.scheduleId, data.scheduleData),
    onSuccess: () => {
      setToastMessage("✅ 스케줄 수정 성공!");
      setShowToast(true);
      queryClient.invalidateQueries({ queryKey: ["schedule", storeId] });

      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 800);
    },
    onError: (error) => {
      setToastMessage("❌ 스케줄 수정 실패!");
      setShowToast(true);
      console.log(error);
    },
  });

  const editHandler = () => {
    if (!scheduleId) {
      setToastMessage("⚠️ 수정할 스케줄이 없습니다.");
      setShowToast(true);
      return;
    }

    if (!worker || !startTime || !endTime) {
      setToastMessage("⚠️ 모든 필드를 입력하세요.");
      setShowToast(true);
      return;
    }

    const scheduleData = {
      content: "파트타임",
      dayOfWeek: day,
      startTime: startTime,
      endTime: endTime,
    };

    console.log(scheduleId, scheduleData);
    editMutation.mutate({ scheduleId, scheduleData });
  };

  const deleteHandler = async () => {
    if (!scheduleId) {
      setToastMessage("⚠️ 삭제할 스케줄이 없습니다.");
      setShowToast(true);
      return;
    }

    try {
      await deleteSchedules(scheduleId);
      setToastMessage("✅ 스케줄 삭제 성공!");
      setShowToast(true);
      queryClient.invalidateQueries({ queryKey: ["schedule", storeId] });

      setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 800);
    } catch (error) {
      setToastMessage("❌ 스케줄 삭제 실패!");
      setShowToast(true);
      console.log(error);
    }
  };

  if (membersLoading) return <div>로딩 중...</div>;
  if (membersError) return <div>에러 발생: {membersError.message}</div>;
  if (!members.length) return <div>직원이 없습니다</div>;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box>
          <FormControl fullWidth margin="normal" sx={{ mt: "2.5rem" }}>
            <Typography variant="caption">이름</Typography>
            <Select value={worker} onChange={(e) => setWorker(e.target.value)}>
              {mode === "add" ? (
                members.map((member: IMember) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={selectedMember}>{selectedMember}</MenuItem>
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="caption">요일</Typography>
            <Select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
            >
              <MenuItem value={0}>일요일</MenuItem>
              <MenuItem value={1}>월요일</MenuItem>
              <MenuItem value={2}>화요일</MenuItem>
              <MenuItem value={3}>수요일</MenuItem>
              <MenuItem value={4}>목요일</MenuItem>
              <MenuItem value={5}>금요일</MenuItem>
              <MenuItem value={6}>토요일</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="caption">시작시간</Typography>
            <TimePick onChange={(e) => setStartTime(e)} />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="caption">종료시간</Typography>
            <TimePick
              onChange={(e) => setEndTime(e)}
              startTime={startTime as string}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1.8rem",
            marginBottom: "0.5rem",
            padding: "0.4rem",
          }}
        >
          {mode === "add" && (
            <ButtonStyle onClick={addHandler}>추가</ButtonStyle>
          )}
          {mode === "edit" && (
            <>
              <NegativeButtonStyle onClick={deleteHandler}>
                삭제
              </NegativeButtonStyle>
              <ButtonStyle onClick={editHandler}>수정</ButtonStyle>
            </>
          )}
        </Box>
        {showToast && (
          <ToastPopup
            message={toastMessage}
            setToast={setShowToast}
            position="top"
          />
        )}
      </Box>
    </Modal>
  );
};

const ButtonStyle = styled.button`
  background-color: #faed7d;
  border: 1px solid #cdcdcd;
  border-radius: 10px;
  padding: 0.6rem 1.5rem;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: #ffd400;
  }
`;

const NegativeButtonStyle = styled.button`
  background-color: #f3f3f3;
  border: 1px solid #cdcdcd;
  border-radius: 10px;
  padding: 0.6rem 1.5rem;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: #ff9d3c;
  }
`;

export default ScheduleModal;
