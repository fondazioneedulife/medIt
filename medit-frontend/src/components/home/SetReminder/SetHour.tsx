import * as React from "react";
import {
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

interface SetHourProps {
  onChange: (timeSlots: { hour: string; period: string }[]) => void;
}

const SetHour: React.FC<SetHourProps> = ({ onChange }) => {
  const [timeSlots, setTimeSlots] = React.useState([
    { hour: "", period: "AM" },
  ]);

  const hours: string[] = [];
  for (let h = 1; h <= 12; h++) {
    hours.push(`${h}:00`);
    hours.push(`${h}:30`);
  }

  const handleHourChange = (index: number, event: SelectChangeEvent) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].hour = event.target.value;
    setTimeSlots(newTimeSlots);
    onChange(newTimeSlots);
  };

  const handlePeriodChange = (index: number, event: SelectChangeEvent) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].period = event.target.value;
    setTimeSlots(newTimeSlots);
    onChange(newTimeSlots);
  };

  const addTimeSlot = () => {
    const newTimeSlots = [...timeSlots, { hour: "", period: "AM" }];
    setTimeSlots(newTimeSlots);
    onChange(newTimeSlots);
  };

  const removeTimeSlot = (index: number) => {
    const newTimeSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(newTimeSlots);
    onChange(newTimeSlots);
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
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        {timeSlots.map((timeSlot, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <FormControl sx={{ minWidth: "100px" }}>
              <Select
                value={timeSlot.hour}
                onChange={(event) => handleHourChange(index, event)}
                displayEmpty
                inputProps={{ "aria-label": "Select Hour" }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  fontWeight: 600,
                }}
              >
                <MenuItem value="" disabled sx={{ fontWeight: 600 }}>
                  HH:MM
                </MenuItem>
                {hours.map((time, i) => (
                  <MenuItem key={i} value={time} sx={{ fontWeight: 600 }}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: "80px", ml: 2 }}>
              <Select
                value={timeSlot.period}
                onChange={(event) => handlePeriodChange(index, event)}
                displayEmpty
                inputProps={{ "aria-label": "Select Period" }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  fontWeight: 600,
                }}
              >
                <MenuItem value="AM" sx={{ fontWeight: 600 }}>
                  AM
                </MenuItem>
                <MenuItem value="PM" sx={{ fontWeight: 600 }}>
                  PM
                </MenuItem>
              </Select>
            </FormControl>
            <IconButton
              onClick={() => removeTimeSlot(index)}
              sx={{ color: "red" }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addTimeSlot} sx={{ color: "black", fontWeight: 600 }}>
          ADD HOUR
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default SetHour;
