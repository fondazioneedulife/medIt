import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { MedicationComponent } from "./MedicationComponent/MedicationComponent";
import { Calendar } from "./calendar/calendar";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton";
import { Box } from "@mui/material";
import {
  getRemindersForDate,
  getMedicationById,
} from "../../database/indexedDB";
import { useToggleDetails } from "./useToggleDetails";
import { ReminderModal } from "./ReminderModal";

export const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(
      Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      )
    )
  );
  const [reminders, setReminders] = useState<any[]>([]);
  const [remindersWithMedications, setRemindersWithMedications] = useState<
    any[]
  >([]);

  const {
    showSetReminder,
    showBackground,
    handleAddDetailsToggle,
    handleReminderSave,
    handleAddDetailsSave,
  } = useToggleDetails();

  useEffect(() => {
    const fetchReminders = async () => {
      if (selectedDate) {
        const reminders = await getRemindersForDate(selectedDate);
        setReminders(reminders);
      } else {
        setReminders([]);
      }
    };

    fetchReminders();
  }, [selectedDate]);

  useEffect(() => {
    const fetchRemindersWithMedications = async () => {
      const remindersWithMeds = await Promise.all(
        reminders.map(async (reminder) => {
          const medication = await getMedicationById(
            Number(reminder.medication_id)
          );
          return { ...reminder, medication };
        })
      );
      setRemindersWithMedications(remindersWithMeds);
    };

    if (reminders.length > 0) {
      fetchRemindersWithMedications();
    } else {
      setRemindersWithMedications([]);
    }
  }, [reminders]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      setSelectedDate(utcDate);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Navbar onAddDetailsClick={handleAddDetailsToggle} />
      </Box>
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <FilterButton />
      {remindersWithMedications.map((reminder) => (
        <div key={reminder.id}>
          {reminder.medication && (
            <>
              <MedicationComponent
                medication={reminder.medication}
                reminder={reminder}
              />
            </>
          )}
        </div>
      ))}
      <ReminderModal
        showSetReminder={showSetReminder}
        showBackground={showBackground}
        handleReminderSave={handleReminderSave}
        handleAddDetailsSave={handleAddDetailsSave}
      />
    </>
  );
};
