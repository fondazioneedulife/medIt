import { LabelReminder } from "../../home/AddDetails/LabelReminder";
import IconPlus from "../../../assets/icon//circle-plus.svg";
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

export const AddDetails: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  return (
    <Box
      sx={{
        height: "80vh",
        width: "100vw",
        borderRadius: "40px 40px 0 0",
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
            sx={{ fontWeight: "bold", fontSize: "2rem", mb: 6 }}
          >
            Add Details
          </Typography>
        </ThemeProvider>
        <Box
          sx={{
            borderRadius: 5,
            backgroundColor: "#F0F0F0",
            width: { xs: "90%", md: "30%", lg: "30%", xl: "20%" },
          }}
        >
          <ListItem>
            <Box sx={{ width: "100%" }}>
              <LabelReminder inputName="" placeholder={"Name Product"} />
              <Box sx={{ display: "flex", width: "60%" }}>
                <LabelReminder
                  inputName="name"
                  placeholder={"Dose"}
                  showHr={false}
                />
                <SelectComponent />
              </Box>
            </Box>
          </ListItem>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 5,
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: 1, bgcolor: "white", boxShadow: "none" }}
          >
            <img src={IconPlus} alt="" />
          </Button>
          <Typography variant="h6" sx={{ color: "rgba(98, 98, 98, 0.5)" }}>
            Add Profile image
          </Typography>
        </Box>
        <ButtonSave />
      </Box>
    </Box>
  );
};
