import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button } from "@mui/material";
import moment from "moment";
import { ISchedule } from "../../types/schedule";
import ScheduleModal from "./ScheduleModal";

const localizer = momentLocalizer(moment);

const createEvents = () => {
  const today = new Date();
  const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1));

  const events: ISchedule[] = [
    {
      id: "1",
      title: "김알바",
      start: new Date(monday.setHours(9, 0, 0)),
      end: new Date(monday.setHours(10, 30, 0)),
      color: "#FDA4AF",
    },
    {
      id: "2",
      title: "이알바",
      start: new Date(monday.setHours(11, 0, 0)),
      end: new Date(monday.setHours(12, 30, 0)),
      color: "#93C5FD",
    },
  ];

  return events;
};

const BoxStyle = {
  height: "800px",
  p: 2,
  // 이벤트 시간 표시 숨기기
  "& .rbc-event-label": {
    display: "none",
  },
  // 요일 아래 all-day 영역 숨기기
  "& .rbc-allday-cell": {
    display: "none",
  },

  "& .rbc-time-view .rbc-header": {
    borderBottom: "none",
  },

  "& .rbc-header": {
    padding: "0.4rem",
  },
  "& .rbc-header span": {
    //요일 폰트사이즈
    fontSize: "0.8rem",
  },
  "& .rbc-label": {
    //시간 폰트사이즈
    fontSize: "0.95rem",
  },
  "& .rbc-events-container": {
    margin: "0",
  },
  "& .rbc-event-content div": {
    overflow: "hidden",
  },
  "& .rbc-current-time-indicator": {
    opacity: "0",
  },
  "& .rbc-event-selected": {
    backgroundColor: "transparent",
  },
};

const TimeTable = () => {
  const [events] = useState<ISchedule[]>(createEvents());
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const eventStyleGetter = (event: ISchedule) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "5px",
        opacity: 0.8,
        color: "black",
        border: "none",
        display: "block",
      },
    };
  };
  const CustomEvent = ({ event }: { event: ISchedule }) => (
    <div>
      <strong>{event.title}</strong>
    </div>
  );

  const handelSelectEvent = () => {
    handleOpen();
  };

  return (
    <div>
      <Box sx={BoxStyle}>
        <Calendar
          localizer={localizer}
          events={events}
          defaultView="week"
          views={["week"]}
          min={new Date(0, 0, 0, 6, 0, 0)} // 오전 9시부터
          max={new Date(0, 0, 0, 18, 0, 0)} // 오후 6시까지
          step={60}
          timeslots={1}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CustomEvent,
          }}
          formats={{
            timeGutterFormat: "HH:mm",
            dayFormat: "ddd",
          }}
          showMultiDayTimes={false}
          toolbar={false}
          onSelectEvent={handelSelectEvent}
        />
      </Box>
      <ScheduleModal open={modalOpen} onClose={handleClose}>
        <Button variant="contained">수정</Button>
        <Button variant="contained" sx={{ backgroundColor: "grey.400" }}>
          삭제
        </Button>
      </ScheduleModal>
    </div>
  );
};

export default TimeTable;
