import React from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface SelectDayOfMonthProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export const SelectDayOfMonth: React.FC<SelectDayOfMonthProps> = ({
  selectedDay,
  onDayChange,
}) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    onDayChange(event.target.value as number);
  };

  return (
    <Select value={selectedDay} onChange={handleChange} fullWidth>
      {[...Array(31).keys()].map((day) => (
        <MenuItem key={day + 1} value={day + 1}>
          {day + 1}
        </MenuItem>
      ))}
    </Select>
  );
};

interface SelectDayAndMonthProps {
  selectedDay: number;
  selectedMonth: number;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
}

const SelectDayAndMonth: React.FC<SelectDayAndMonthProps> = ({
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
      <Select value={selectedMonth} onChange={handleMonthChange} fullWidth>
        {[...Array(12).keys()].map((month) => (
          <MenuItem key={month + 1} value={month + 1}>
            {new Date(0, month).toLocaleString("default", { month: "long" })}
          </MenuItem>
        ))}
      </Select>
      <Select value={selectedDay} onChange={handleDayChange} fullWidth>
        {[...Array(31).keys()].map((day) => (
          <MenuItem key={day + 1} value={day + 1}>
            {day + 1}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
