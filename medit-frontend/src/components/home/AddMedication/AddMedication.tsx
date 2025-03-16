import React, { useState } from "react";
import { LabelReminder } from "./LabelReminder";
import {
  Box,
  createTheme,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SelectComponent from "./select";
import { ButtonSave } from "./button";
import AddInfo from "./AddInfo";
import { addRecord } from "../../../database/indexedDB";
import { useNavigate } from "react-router-dom";
import InputFileUpload from "./AddImage";
import { ReturnIcon } from "../SetReminder/ReturnIcon";
import { useLogin } from "../../login/LoginContext";

interface AddMedicationProps {
  onSave: (medicineId: number) => void;
  onClose: () => void; // Aggiungi questa prop
}

export const AddMedication: React.FC<AddMedicationProps> = ({
  onSave,
  onClose,
}) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  const { user } = useLogin(); // Sposta la chiamata a useLogin qui

  const [medicineData, setMedicineData] = useState({
    name: "",
    type: "",
    dose: "",
    unit: "",
    quantity: 0,
    note: "",
    image: "",
    userId: user ? user.id : 0, // Imposta userId qui
    created_at: new Date(),
    updated_at: new Date(),
    synced_at: new Date(),
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedicineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUnitChange = (unit: string) => {
    setMedicineData((prevData) => ({
      ...prevData,
      unit,
    }));
  };

  const handleNoteChange = (note: string) => {
    setMedicineData((prevData) => ({
      ...prevData,
      note,
    }));
  };

  const handleImageUpload = (image: string) => {
    setMedicineData((prevData) => ({
      ...prevData,
      image,
    }));
  };

  const handleSave = async () => {
    const medicineId = Number(await addRecord("medications", medicineData));
    onSave(medicineId);
    navigate("/home");
  };

  return (
    <Box
      sx={{
        height: "90vh",
        width: "100vw",
        borderRadius: "50px 50px 0 0",
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
            sx={{ fontWeight: "bold", fontSize: "2rem", mb: 4 }}
          >
            Add medication
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
            <Box sx={{ width: "100%" }}>
              <LabelReminder
                inputName="name"
                placeholder={"Name Product"}
                onChange={handleInputChange}
              />
              <Box sx={{ display: "flex", width: "50%" }}>
                <LabelReminder
                  inputName="dose"
                  placeholder={"Dose"}
                  showHr={false}
                  onChange={handleInputChange}
                />
                <SelectComponent
                  unit={medicineData.unit}
                  onUnitChange={handleUnitChange}
                />
              </Box>
              <LabelReminder
                inputName="quantity"
                placeholder={"Quantity"}
                showHr={false}
                onChange={handleInputChange}
              />
            </Box>
          </ListItem>
        </Box>

        <ReturnIcon onClick={onClose} />

        <Box
          sx={{
            marginTop: "2rem",
            backgroundColor: "#F0F0F0",
            width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
            borderRadius: 5,
            height: "15vh",
          }}
        >
          <AddInfo onNoteChange={handleNoteChange} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 5,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "rgba(98, 98, 98, 0.5)" }}
          ></Typography>
        </Box>
        <InputFileUpload onUpload={handleImageUpload} />
        <ButtonSave onClick={handleSave} />
      </Box>
    </Box>
  );
};
