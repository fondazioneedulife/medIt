import React, { useEffect, useState } from "react";
import { LabelReminder } from "./LabelReminder";
import {
  Box,
  createTheme,
  ListItem,
  ThemeProvider,
  Typography,
  Alert,
} from "@mui/material";
import SelectComponent from "./select";
import SelectType from "./SelectType";
import { ButtonSave } from "./button";
import AddInfo from "./AddInfo";
import { addRecord } from "../../../database/indexedDB";
import { useNavigate } from "react-router-dom";
import InputFileUpload from "./AddImage";
import { ReturnIcon } from "../SetReminder/ReturnIcon";
import { useLogin } from "../../login/LoginContext";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../../../contexts/LanguageContext";

interface AddMedicationProps {
  onSave: (medicineId: number) => void;
  onClose: () => void;
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

  const { user } = useLogin();

  const [medicineData, setMedicineData] = useState({
    name: "",
    type: "",
    dose: "",
    unit: "",
    quantity: 0,
    note: "",
    image: "",
    userId: user ? user.id : 0,
    created_at: new Date(),
    updated_at: new Date(),
    synced_at: new Date(),
  });

  const [errors, setErrors] = useState<string[]>([]);

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

  const handleTypeChange = (type: string) => {
    setMedicineData((prevData) => ({
      ...prevData,
      type,
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

  const validateData = () => {
    const newErrors: string[] = [];
    if (!medicineData.name) newErrors.push("Name is required.");
    if (!medicineData.type) newErrors.push("Type is required.");
    if (!medicineData.dose) newErrors.push("Dose is required.");
    if (!medicineData.unit) newErrors.push("Unit is required.");
    if (medicineData.quantity <= 0)
      newErrors.push("Quantity must be greater than 0.");
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateData();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const medicineId = Number(await addRecord("medications", medicineData));
    onSave(medicineId);
    navigate("/home");
  };

  const { translate } = useLanguage();

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <>
      <ReturnIcon onClick={onClose} />
      <Box
        sx={{
          height: "100vh",
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
              sx={{ fontWeight: "bold", fontSize: "2rem", mb: 2 }}
            >
              {translate("addMedication")}
            </Typography>
          </ThemeProvider>
          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                exit={{ y: "100vh" }}
                transition={{ duration: 0.5 }}
                style={{
                  width: "100%",
                  position: "absolute",
                  zIndex: 1,
                  bottom: 1,
                }}
              >
                {errors.map((error, index) => (
                  <Alert key={index} severity="error">
                    {error}
                  </Alert>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
                <Box sx={{ display: "flex", width: "71%" }}>
                  <LabelReminder
                    inputName="dose"
                    placeholder={"Dose"}
                    showHr={false}
                    type="number"
                    onChange={handleInputChange}
                  />
                  <SelectComponent
                    unit={medicineData.unit}
                    onUnitChange={handleUnitChange}
                  />
                </Box>
              </Box>
            </ListItem>
          </Box>

          <Box
            sx={{
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
              marginTop: "1rem",
            }}
          >
            <SelectType
              type={medicineData.type}
              onTypeChange={handleTypeChange}
            />
          </Box>
          <Box
            sx={{
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
              marginTop: "1rem",
            }}
          >
            {" "}
            <LabelReminder
              inputName="quantity"
              placeholder={"Quantity"}
              showHr={false}
              type="number"
              onChange={handleInputChange}
            />
          </Box>

          <Box
            sx={{
              marginTop: "1rem",
              backgroundColor: "#F0F0F0",
              width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
              borderRadius: 5,
              height: "10vh",
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
    </>
  );
};
