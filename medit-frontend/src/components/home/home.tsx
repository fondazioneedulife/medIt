import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { MedicationComponent } from "./MedicationComponent/MedicationComponent";
import { Calendar } from "./calendar/calendar";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton";
import { Box, Typography } from "@mui/material";
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
  const [reminderAdded, setReminderAdded] = useState(false);

  const {
    showSetReminder,
    showBackground,
    handleAddMedicationToggle,
    handleReminderSave,
    handleAddMedicationSave,
  } = useToggleDetails();

  useEffect(() => {
    const fetchReminders = async () => {
      if (selectedDate || reminderAdded) {
        const reminders = await getRemindersForDate(selectedDate as Date);
        setReminders(reminders);
      } else {
        setReminders([]);
      }
    };

    fetchReminders();
    setReminderAdded(false);
  }, [selectedDate, reminderAdded]);

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

  const handleReminderSaved = () => {
    setReminderAdded(true);
  };

  return (
    <>
      <Box sx={{ pb: 22 }}>
        <Box sx={{ position: "relative" }}>
          <Navbar onAddDetailsClick={handleAddMedicationToggle} />
        </Box>
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
        <FilterButton />
        {remindersWithMedications.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", marginTop: 2 }}>
            There are no reminders for today
          </Typography>
        ) : (
          remindersWithMedications.map((reminder) => (
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
          ))
        )}
        <ReminderModal
          showSetReminder={showSetReminder}
          showBackground={showBackground}
          handleReminderSave={handleReminderSave}
          handleAddMedicationSave={handleAddMedicationSave}
          handleReminderSaved={handleReminderSaved}
        />
      </Box>
    </>
  );
};
