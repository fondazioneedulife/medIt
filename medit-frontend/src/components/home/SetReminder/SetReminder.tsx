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
import { motion } from "framer-motion";
import { addRecord } from "../../../database/indexedDB"; // Importa la funzione addRecord

interface SetReminderProps {
  onSave: () => void;
  medicineId: number;
}

export const SetReminder: React.FC<SetReminderProps> = ({
  onSave,
  medicineId,
}) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<
    { hour: string; period: string }[]
  >([]);

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

  const handleSave = async () => {
    const reminderData = {
      medication_id: medicineId,
      reminder_date_time: timeSlots
        .map((slot) => `${slot.hour} ${slot.period}`)
        .join(", "),
      days: activeDays,
      id_group: "1",
      synced_at: new Date(),
    };

    await addRecord("reminders", reminderData);
    onSave();
  };

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        height: "90vh",
        borderRadius: "50px 50px 0 0",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        position: "fixed",
        bottom: 0,
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
            width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
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
            width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
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
            width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
            mt: 3,
            pt: 2,
            pb: 2,
          }}
        >
          <SetHour onChange={setTimeSlots} />
        </Box>
        <ButtonSave buttonText="Save" onClick={handleSave} />
      </Box>
    </motion.div>
  );
};
