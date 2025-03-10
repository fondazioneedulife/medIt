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

export const AddDetails: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
  });

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
              <LabelReminder inputName="" placeholder={"Name Product"} />
              <Box sx={{ display: "flex", width: "50%" }}>
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
        <ButtonSave />
      </Box>
    </Box>
  );
};
