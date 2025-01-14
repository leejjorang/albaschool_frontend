import React, { useState } from "react";
import { LocalizationProvider, DesktopTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { timePickerTheme } from "../../styles/theme";

interface TimePickProps {
  label: string;
  onChange: (newValue: string | null) => void;
}

export default function TimePick({ label, onChange }: TimePickProps) {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

  const handleChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
    onChange(newValue ? newValue.format("HH:mm") : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <ThemeProvider theme={timePickerTheme}>
          <DesktopTimePicker
            label={label}
            value={selectedTime}
            onChange={handleChange}
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
