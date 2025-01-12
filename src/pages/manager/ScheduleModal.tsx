import React, { useState } from "react";
import {
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

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

export default function ScheduleModal() {
  const [open, setOpen] = useState(false);
  const [worker, setWorker] = useState("이알바");
  const [day, setDay] = useState("월요일");
  const [startTime, setStartTime] = useState("9:00");
  const [endTime, setEndTime] = useState("18:00");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ width: "6rem", height: "2.7rem" }}
      >
        추가하기
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* 알바생 */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="worker-label">알바생</InputLabel>
            <Select
              labelId="worker-label"
              value={worker}
              onChange={(e) => setWorker(e.target.value)}
            >
              <MenuItem value="이알바">이알바</MenuItem>
              <MenuItem value="김알바">김알바</MenuItem>
              <MenuItem value="박알바">박알바</MenuItem>
            </Select>
          </FormControl>

          {/* 요일 */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="day-label">요일</InputLabel>
            <Select
              labelId="day-label"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <MenuItem value="월요일">월요일</MenuItem>
              <MenuItem value="화요일">화요일</MenuItem>
              <MenuItem value="수요일">수요일</MenuItem>
              <MenuItem value="목요일">목요일</MenuItem>
              <MenuItem value="금요일">금요일</MenuItem>
              <MenuItem value="토요일">토요일</MenuItem>
              <MenuItem value="일요일">일요일</MenuItem>
            </Select>
          </FormControl>

          {/* 시작 시간 */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="start-time-label">시작 시간</InputLabel>
            <Select
              labelId="start-time-label"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              <MenuItem value="9:00">9:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="11:00">11:00</MenuItem>
              {/* 필요한 시간 추가 */}
            </Select>
          </FormControl>

          {/* 종료 시간 */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="end-time-label">종료 시간</InputLabel>
            <Select
              labelId="end-time-label"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            >
              <MenuItem value="18:00">18:00</MenuItem>
              <MenuItem value="19:00">19:00</MenuItem>
              <MenuItem value="20:00">20:00</MenuItem>
              {/* 필요한 시간 추가 */}
            </Select>
          </FormControl>

          {/* 버튼 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "1.8rem",
              marginBottom: "0.5rem",
              padding: "0.4rem",
            }}
          >
            <Button variant="contained">수정하기</Button>
            <Button variant="contained">삭제하기</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
