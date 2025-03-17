import React from "react";
import {
  Box,
  createTheme,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
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

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Select
        value={selectedDay}
        onChange={handleChange}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            fontWeight: 600,
          },
        }}
      >
        {[...Array(31).keys()].map((day) => (
          <MenuItem key={day + 1} value={day + 1} sx={{ fontWeight: 600 }}>
            {day + 1}
          </MenuItem>
        ))}
      </Select>
    </ThemeProvider>
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

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          fontWeight: 600,
        }}
      >
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          fullWidth
          sx={{ fontWeight: 600 }}
        >
          {[...Array(12).keys()].map((month) => (
            <MenuItem
              key={month + 1}
              value={month + 1}
              sx={{ fontWeight: 600 }}
            >
              {new Date(0, month).toLocaleString("default", { month: "long" })}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedDay}
          onChange={handleDayChange}
          fullWidth
          sx={{ fontWeight: 600 }}
        >
          {[...Array(31).keys()].map((day) => (
            <MenuItem key={day + 1} value={day + 1} sx={{ fontWeight: 600 }}>
              {day + 1}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </ThemeProvider>
  );
};
