import React, { useEffect, useState } from "react";
import { LocalizationProvider, DesktopTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { timePickerTheme } from "../../styles/theme";

interface TimePickProps {
  onChange: (newValue: string | null) => void;
  startTime?: string;
  value?: string | null;
}

export default function TimePick({ onChange, startTime,value }: TimePickProps) {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(
    value ? dayjs(value, "HH:mm") : dayjs()
  );

  useEffect(() => {
    if (value) {
      setSelectedTime(dayjs(value, "HH:mm"));
    }
  }, [value]);

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
    onChange(newValue ? newValue.format("HH:mm") : null);
  };
  const minTime = startTime ? dayjs(startTime, "HH:mm") : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <ThemeProvider theme={timePickerTheme}>
          <DesktopTimePicker
            value={selectedTime}
            onChange={handleChange}
            minTime={minTime}
            sx={{
              "& .MuiInputAdornment-root": {
                overflow: "hidden",
                pr: "0.5rem",
              },
            }}
          />
        </ThemeProvider>
      </Box>
    </LocalizationProvider>
  );
}
