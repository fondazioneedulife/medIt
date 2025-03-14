import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar.tsx";
import { MedicineComponent } from "./MedicineComponent/MedicineComponent.tsx";
import { Calendar } from "./calendar/calendar.tsx";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton.tsx";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { SetReminder } from "./SetReminder/SetReminder.tsx";
import { getAllRecords } from "../../database/indexdb"; // Importa la funzione getAllRecords

export const Home: React.FC = () => {
  const [showSetReminder, setShowSetReminder] = useState(false);
  const [medications, setMedications] = useState<any[]>([]); // Stato per memorizzare i dati dei medicinali
  const [showBackground, setShowBackground] = useState(true); // Stato per gestire il background
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Status to store selected date

  useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getAllRecords("medications");
      setMedications(meds);
    };

    fetchMedications();
  }, []);

  const handleAddDetailsToggle = () => {
    setShowSetReminder(!showSetReminder);
    setShowBackground(true); // Mostra il background quando si apre SetReminder
  };

  const handleReminderSave = () => {
    setShowSetReminder(false);
    setShowBackground(false); // Nascondi il background quando si salva il reminder
  };

  const handleAddDetailsSave = () => {
    setShowSetReminder(false);
    setShowBackground(false); // Nascondi il background quando si salva AddDetails
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
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
      <AnimatePresence>
        {showSetReminder && (
          <>
            {showBackground && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 1000,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              />
            )}
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100vw",
                height: "80vh",
                zIndex: 1001,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SetReminder
                onSave={handleReminderSave}
                medicineId={0}
                onAddDetailsSave={handleAddDetailsSave}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
