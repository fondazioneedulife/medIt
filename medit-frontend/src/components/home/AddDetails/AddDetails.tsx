import { LabelReminder } from "../../home/AddDetails/LabelReminder";
import {
  Box,
  createTheme,
  ListItem,
  ThemeProvider,
  Typography,
} from "@mui/material";

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
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "50%",
          width: "70%",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
            boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
            display: "inline-table",
            backgroundColor: "#F0F0F0",
            width: "15rem",
          }}
        >
          <ListItem>
            <Box>
              <Box>
                <LabelReminder inputName="email" placeholder={"Name Product"} />
                <Box sx={{ display: "flex" }}>
                  <LabelReminder
                    inputName="password"
                    placeholder={"Dose"}
                    showHr={false}
                    type="password"
                  />
                </Box>
              </Box>
            </Box>
          </ListItem>
        </Box>
      </Box>
    </Box>
  );
};
