import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar.tsx";
import { MedicineComponent } from "./MedicineComponent/MedicineComponent.tsx";
import { Calendar } from "./calendar/calendar.tsx";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton.tsx";
import { AddDetails } from "./AddDetails/AddDetails.tsx";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { SetReminder } from "./SetReminder/SetReminder.tsx";
import { getAllRecords } from "../../database/indexdb"; // Importa la funzione getAllRecords

export const Home: React.FC = () => {
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [showSetReminder, setShowSetReminder] = useState(false);
  const [medications, setMedications] = useState<any[]>([]); // Stato per memorizzare i dati dei medicinali

  useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getAllRecords("medications");
      setMedications(meds);
    };

    fetchMedications();
  }, []);

  const handleAddDetailsToggle = () => {
    setShowAddDetails(!showAddDetails);
    setShowSetReminder(false); // Ensure SetReminder is hidden when toggling AddDetails
  };

  const handleSave = () => {
    setShowSetReminder(true);
  };

  const handleReminderSave = () => {
    setShowAddDetails(false);
    setShowSetReminder(false);
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Navbar onAddDetailsClick={handleAddDetailsToggle} />
      </Box>
      <Calendar />
      <FilterButton />
      {medications.map((med) => (
        <MedicineComponent key={med.id} medication={med} />
      ))}
      <AnimatePresence>
        {showAddDetails && (
          <>
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1001,
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
              }}
            >
              <AddDetails onSave={handleSave} />
            </motion.div>
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
          </>
        )}

        {showSetReminder && (
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
              zIndex: 1002,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SetReminder onSave={handleReminderSave} medicineId={0} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
