import { useState } from "react";
import { LabelReminder } from "../../home/AddDetails/LabelReminder";
import IconPlus from "../../../assets/icon/photo-plus.svg";
import {
  Box,
  Button,
  createTheme,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SelectComponent from "./select";
import { ButtonSave } from "./button";
import AddInfo from "./AddInfo";
import { addRecord } from "../../../database/indexdb";

interface AddDetailsProps {
  onSave: (medicineId: number) => void;
}

export const AddDetails: React.FC<AddDetailsProps> = ({ onSave }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  const [medicineData, setMedicineData] = useState({
    name: "",
    type: "Capsule",
    dose: "",
    program: "Daily",
    quantity: 1,
    note: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedicineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const medicineId = Number(await addRecord("medications", medicineData));
    onSave(medicineId);
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
            Add Details
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
                  value={medicineData.type}
                  onChange={(e) =>
                    setMedicineData((prevData) => ({
                      ...prevData,
                      type: e.target.value,
                    }))
                  }
                />
              </Box>
            </Box>
          </ListItem>
        </Box>

        <Box
          sx={{
            marginTop: "2rem",
            backgroundColor: "#F0F0F0",
            width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
            borderRadius: 5,
            height: "15vh",
          }}
        >
          <AddInfo />
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
        <Button
          variant="outlined"
          sx={{
            mr: 1,
            mt: 4,
            bgcolor: "white",
            boxShadow: "none",
            borderRadius: 3,
            outline: "black",
            textTransform: "capitalize",
            p: "1rem",
            width: { xs: "80%", md: "30%", lg: "30%", xl: "20%" },
            gap: 1,
          }}
        >
          <img src={IconPlus} alt="" />
          Add profile image
        </Button>
        <ButtonSave onClick={handleSave} />
      </Box>
    </Box>
  );
};
