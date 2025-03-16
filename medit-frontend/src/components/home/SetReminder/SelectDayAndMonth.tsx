import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SelectDayAndMonthProps {
  selectedDay: number;
  selectedMonth: number;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
}

export const SelectDayAndMonth: React.FC<SelectDayAndMonthProps> = ({
  selectedDay,
  selectedMonth,
  onDayChange,
  onMonthChange,
}) => {
  const handleDayChange = (event: SelectChangeEvent<number>) => {
    onDayChange(event.target.value as number);
  };

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    onMonthChange(event.target.value as number);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Day</InputLabel>
        <Select value={selectedDay} onChange={handleDayChange}>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Month</InputLabel>
        <Select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <MenuItem key={month} value={month}>
              {new Date(0, month - 1).toLocaleString("default", {
                month: "long",
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDayAndMonth;
