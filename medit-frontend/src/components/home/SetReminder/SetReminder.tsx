import React, { useState } from "react";
import {
  Box,
  createTheme,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SelectComponent from "../SetReminder/selectWeek";
import { ButtonSave } from "../AddDetails/button";
import SetHour from "./SetHour";

export const SetReminder: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  const [activeDays, setActiveDays] = useState<string[]>([]);

  const daysOfWeek = [
    { label: "M", value: "Monday" },
    { label: "T", value: "Tuesday" },
    { label: "W", value: "Wednesday" },
    { label: "T", value: "Thursday" },
    { label: "F", value: "Friday" },
    { label: "S", value: "Saturday" },
    { label: "S", value: "Sunday" },
  ];

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleButtonClick = () => {
    alert("Next button clicked!");
  };

  return (
    <Box
      sx={{
        width: "100wh",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", fontSize: "2rem", mb: 6 }}
          >
            Set Reminder
          </Typography>
        </ThemeProvider>
        <Box
          sx={{
            borderRadius: 5,
            backgroundColor: "#F0F0F0",
            width: { xs: "70%", md: "30%", lg: "30%", xl: "20%" },
          }}
        >
          <ListItem>
            <Box>
              <SelectComponent />
            </Box>
          </ListItem>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            mt: 3,
            width: { xs: "70%", md: "30%", lg: "30%", xl: "20%" },
          }}
        >
          {daysOfWeek.map((day) => (
            <Box
              key={day.value}
              onClick={() => toggleDay(day.value)}
              sx={{
                borderRadius: 3,
                backgroundColor: activeDays.includes(day.value)
                  ? "#0B6BB2"
                  : "#F0F0F0",
                color: activeDays.includes(day.value) ? "white" : "black",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: activeDays.includes(day.value)
                    ? "#084E8A"
                    : "#d0d0d0",
                },
              }}
            >
              {day.label}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            borderRadius: 5,
            backgroundColor: "#F0F0F0",
            width: { xs: "70%", md: "30%", lg: "30%", xl: "20%" },
            mt: 3,
            pt: 2,
            pb: 2,
          }}
        >
          <SetHour />
        </Box>
        <ButtonSave buttonText="Save" onClick={handleButtonClick} />
      </Box>
    </Box>
  );
};
