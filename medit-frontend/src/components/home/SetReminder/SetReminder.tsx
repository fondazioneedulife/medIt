import React, { useState } from "react";
import {
  Box,
  createTheme,
  ListItem,
  ThemeProvider,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import SelectFrequency from "../SetReminder/selectWeek";
import { ButtonSave } from "../AddMedication/button";
import SetHour from "./SetHour";
import { AnimatePresence, motion } from "framer-motion";
import { addRecord } from "../../../database/indexedDB";
import SelectMedication from "./selectMedication";
import { ReturnIcon } from "./ReturnIcon";
import { AddMedication } from "../AddMedication/AddMedication";
import { useNavigate } from "react-router-dom";
import { ButtonAddMedication } from "./button";
import { v4 as uuidv4 } from "uuid";
import { generateReminders } from "./generateReminders";
import { SelectDayOfMonth } from "./SelectDayOfMonth";
import SelectDayAndMonth from "./SelectDayAndMonth";

interface SetReminderProps {
  onSave: () => void;
  onAddDetailsSave: () => void;
  handleReminderSaved: () => void;
}

export const daysOfWeek = [
  { label: "M", value: "Monday" },
  { label: "T", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "T", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "S", value: "Saturday" },
  { label: "S", value: "Sunday" },
];

export const SetReminder: React.FC<SetReminderProps> = ({
  onSave,
  onAddDetailsSave,
  handleReminderSaved,
}) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  const [reminderData, setReminderData] = useState({
    medication_id: "",
    reminder_date_time: "",
    days: [] as string[],
    frequency: "daily",
    id_group: uuidv4(),
    synced_at: new Date(),
    dayOfMonth: 1,
    dayOfYear: 1,
    monthOfYear: 1,
    endDate: null as Date | null,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const navigate = useNavigate();

  const toggleDay = (day: string) => {
    setReminderData((prevData) => ({
      ...prevData,
      days: prevData.days.includes(day)
        ? prevData.days.filter((d) => d !== day)
        : [...prevData.days, day],
    }));
  };

  const validateData = () => {
    const newErrors: string[] = [];
    if (!reminderData.medication_id) newErrors.push("Medication is required.");
    if (!reminderData.reminder_date_time) newErrors.push("Time is required.");
    if (!reminderData.frequency) newErrors.push("Frequency is required.");
    if (reminderData.frequency === "weekly" && reminderData.days.length === 0)
      newErrors.push("At least one day is required for weekly frequency.");
    if (reminderData.frequency === "monthly" && !reminderData.dayOfMonth)
      newErrors.push("Day of month is required for monthly frequency.");
    if (
      reminderData.frequency === "yearly" &&
      (!reminderData.dayOfYear || !reminderData.monthOfYear)
    )
      newErrors.push("Day and month are required for yearly frequency.");
    if (!reminderData.endDate) newErrors.push("End date is required.");
    if (reminderData.endDate && reminderData.endDate < new Date()) {
      newErrors.push("End date cannot be in the past.");
    }
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateData();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const reminders = generateReminders(reminderData);
    for (const reminder of reminders) {
      await addRecord("reminders", reminder);
    }
    handleReminderSaved();
    setShowAddMedication(false);
    setIsVisible(false);
    setTimeout(onSave, 500);
    navigate("/home");
  };

  const handleAddMedication = () => {
    setIsVisible(false);
    setTimeout(() => setShowAddMedication(true), 500);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onSave, 500);
  };

  const handleAddDetailsSave = (medicationId: number) => {
    setShowAddMedication(false);
    onAddDetailsSave();
    setReminderData((prevData) => ({
      ...prevData,
      medication_id: medicationId.toString(),
    }));
  };

  const handleCloseAddDetails = () => {
    setShowAddMedication(false);
    setTimeout(() => setIsVisible(true), 500);
  };

  const handleMedicationChange = (medicationId: string) => {
    setReminderData((prevData) => ({
      ...prevData,
      medication_id: medicationId,
    }));
  };

  const handleTimeSlotsChange = (
    timeSlots: { hour: string; period: string }[]
  ) => {
    setReminderData((prevData) => ({
      ...prevData,
      reminder_date_time: timeSlots
        .map((slot) => `${slot.hour} ${slot.period}`)
        .join(", "),
    }));
  };

  const handleFrequencyChange = (frequency: string) => {
    setReminderData((prevData) => ({
      ...prevData,
      frequency,
    }));
  };

  const handleDayOfMonthChange = (day: number) => {
    setReminderData((prevData) => ({
      ...prevData,
      dayOfMonth: day,
    }));
  };

  const handleDayAndMonthChange = (day: number, month: number) => {
    setReminderData((prevData) => ({
      ...prevData,
      dayOfYear: day,
      monthOfYear: month,
    }));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReminderData((prevData) => ({
      ...prevData,
      endDate: event.target.value ? new Date(event.target.value) : null,
    }));
  };

  React.useEffect(() => {
    console.log("reminderData aggiornato:", reminderData);
  }, [reminderData]);

  return (
    <AnimatePresence>
      {isVisible && !showAddMedication && (
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
            zIndex: 1001,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1002,
            }}
          >
            <ReturnIcon onClick={handleClose} />
          </Box>
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
                sx={{ fontWeight: "bold", fontSize: "2rem", mb: 3 }}
              >
                Set Reminder
              </Typography>
            </ThemeProvider>
            {errors.length > 0 && (
              <Box sx={{ width: "80%", mb: 2 }}>
                {errors.map((error, index) => (
                  <Alert key={index} severity="error">
                    {error}
                  </Alert>
                ))}
              </Box>
            )}
            <Box
              sx={{
                borderRadius: 5,
                backgroundColor: "#F0F0F0",
                width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
              }}
            >
              <ListItem>
                <Box>
                  <SelectMedication
                    selectedMedication={reminderData.medication_id}
                    onMedicationChange={handleMedicationChange}
                  />
                </Box>
              </ListItem>
            </Box>
            <ButtonAddMedication
              buttonText="Add medication"
              onClick={handleAddMedication}
            />
            <Box
              sx={{
                borderRadius: 5,
                backgroundColor: "#F0F0F0",
                mt: 1,
                width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
              }}
            >
              <ListItem>
                <SelectFrequency
                  selectedFrequency={reminderData.frequency}
                  onFrequencyChange={handleFrequencyChange}
                />
              </ListItem>
            </Box>

            {reminderData.frequency === "weekly" && (
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
                      backgroundColor: reminderData.days.includes(day.value)
                        ? "#0B6BB2"
                        : "#F0F0F0",
                      color: reminderData.days.includes(day.value)
                        ? "white"
                        : "black",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: reminderData.days.includes(day.value)
                          ? "#084E8A"
                          : "#d0d0d0",
                      },
                    }}
                  >
                    {day.label}
                  </Box>
                ))}
              </Box>
            )}

            {reminderData.frequency === "monthly" && (
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
                <SelectDayOfMonth
                  selectedDay={reminderData.dayOfMonth}
                  onDayChange={handleDayOfMonthChange}
                />
              </Box>
            )}

            {reminderData.frequency === "yearly" && (
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
                <SelectDayAndMonth
                  selectedDay={reminderData.dayOfYear}
                  selectedMonth={reminderData.monthOfYear}
                  onDayChange={(day) =>
                    handleDayAndMonthChange(day, reminderData.monthOfYear)
                  }
                  onMonthChange={(month) =>
                    handleDayAndMonthChange(reminderData.dayOfYear, month)
                  }
                />
              </Box>
            )}

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
              <SetHour onChange={handleTimeSlotsChange} />
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
              <TextField
                label="End therapy date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                sx={{ mt: 2 }}
                onChange={handleEndDateChange}
              />
            </Box>

            <ButtonSave buttonText="Save" onClick={handleSave} />
          </Box>
        </motion.div>
      )}
      {showAddMedication && (
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
            justifyContent: "center",
            position: "fixed",
            bottom: 0,
            zIndex: 1001,
          }}
        >
          <AddMedication
            onSave={handleAddDetailsSave}
            onClose={handleCloseAddDetails}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
