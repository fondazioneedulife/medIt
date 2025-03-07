import { useState } from "react";
import { Navbar } from "../Navbar/Navbar.tsx";
import { MedicineComponent } from "./MedicineComponent/MedicineComponent.tsx";
import { Calendar } from "./calendar/calendar.tsx";
import "../../index.css";
import { FilterButton } from "./FilterButton/FilterButton.tsx";
import { AddDetails } from "./AddDetails/AddDetails.tsx";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const Home: React.FC = () => {
  const [showAddDetails, setShowAddDetails] = useState(false);

  const handleAddDetailsToggle = () => {
    setShowAddDetails(!showAddDetails);
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Navbar onAddDetailsClick={handleAddDetailsToggle} />
      </Box>
      <Calendar />
      <FilterButton />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      <MedicineComponent />
      {showAddDetails && (
        <>
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
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
            <AddDetails />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
    </>
  );
};
