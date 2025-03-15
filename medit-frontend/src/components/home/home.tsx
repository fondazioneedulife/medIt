import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar.tsx";
import { MedicineComponent } from "./MedicineComponent/MedicineComponent.tsx";
import { Calendar } from "./calendar/calendar.tsx";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton.tsx";
import { Box } from "@mui/material";
import { getAllRecords } from "../../database/indexedDB.ts";
import { useToggleDetails } from "./useToggleDetails.ts";
import { ReminderModal } from "./ReminderModal.tsx";

export const Home: React.FC = () => {
  const [medications, setMedications] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    showSetReminder,
    showBackground,
    handleAddDetailsToggle,
    handleReminderSave,
    handleAddDetailsSave,
  } = useToggleDetails();

  useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getAllRecords("medications");
      setMedications(meds);
    };

    fetchMedications();
  }, []);

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
      <Calendar onDateChange={handleDateChange} />
      <FilterButton />
      {medications.map((med) => (
        <MedicineComponent key={med.id} medication={med} />
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
