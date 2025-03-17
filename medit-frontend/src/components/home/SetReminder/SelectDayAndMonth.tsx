import React from "react";
import {
  Box,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
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
        }}
      >
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 600 }}>Day</InputLabel>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <MenuItem key={day} value={day} sx={{ fontWeight: 600 }}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel sx={{ fontWeight: 600 }}>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <MenuItem key={month} value={month} sx={{ fontWeight: 600 }}>
                {new Date(0, month - 1).toLocaleString("default", {
                  month: "long",
                })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default SelectDayAndMonth;
