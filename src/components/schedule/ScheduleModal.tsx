import { useState } from "react";
import {
  Modal,
  Box,
  FormControl,
  MenuItem,
  Select,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TimePick from "./TimePick";
import { useMutation } from "@tanstack/react-query";
import { postSchedules } from "../../services/scheduleService";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  storeId: string;
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
}: ScheduleModalProps) => {
  const [worker, setWorker] = useState("이알바");
  const [day, setDay] = useState("월요일");
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const handleStartTimeChange = (newValue: string | null) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue: string | null) => {
    setEndTime(newValue);
  };
  const addMutation = useMutation({ mutationFn: postSchedules });
  const addHandler = () => {
    //addMutation.mutate({});
  };
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
              <MenuItem value="이알바">이알바</MenuItem>
              <MenuItem value="김알바">김알바</MenuItem>
              <MenuItem value="박알바">박알바</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="caption">요일</Typography>
            <Select value={day} onChange={(e) => setDay(e.target.value)}>
              <MenuItem value="일요일">일요일</MenuItem>
              <MenuItem value="월요일">월요일</MenuItem>
              <MenuItem value="화요일">화요일</MenuItem>
              <MenuItem value="수요일">수요일</MenuItem>
              <MenuItem value="목요일">목요일</MenuItem>
              <MenuItem value="금요일">금요일</MenuItem>
              <MenuItem value="토요일">토요일</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="caption">시작시간</Typography>
            <TimePick
              onChange={(newValue: string | null) =>
                handleStartTimeChange(newValue)
              }
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="caption">종료시간</Typography>
            <TimePick
              onChange={(newValue: string | null) =>
                handleEndTimeChange(newValue)
              }
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
            <Button variant="contained" onClick={addHandler}>
              추가
            </Button>
          )}
          {mode === "edit" && (
            <>
              <Button variant="contained" sx={{ backgroundColor: "grey.400" }}>
                삭제
              </Button>
              <Button variant="contained">수정</Button>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
