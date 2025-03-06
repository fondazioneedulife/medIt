import { LabelReminder } from "../../home/AddDetails/LabelReminder";
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

export const AddDetails: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

  return (
    <Box
      sx={{
        width: "100wh",
        height: "100vh",
        maxWidth: "100vw",
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
            marginTop: "2rem",
            backgroundColor: "#F0F0F0",
            width: { xs: "90%", md: "30%", lg: "30%", xl: "20%" },
            borderRadius: 5,
            height: "15vh",
          }}
        >
          <AddInfo />
        </Box>
        <ButtonSave />
      </Box>
    </Box>
  );
};
