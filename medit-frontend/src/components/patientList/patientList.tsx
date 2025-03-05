import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Typography from "@mui/material/Typography/Typography";
import { ReturnIcon } from "../login/ReturnIcon";
import patientImage from "../../assets/icon/patient_image.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const PatientList: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#F7F7F7" }}>
      <ReturnIcon path="#" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          top: { xs: 40, sm: 60, md: 80 },
          textAlign: "center",
        }}
      >


<Box 
        >
          <Typography variant="h3" sx={{
              mt: "1rem",
              ml: "1rem",
              mr: "1rem",
              fontSize: "2.25rem",
              fontWeight: "bold",
              lineHeight: "1",
              color: "black",}}>
            Patient List
          </Typography>
        </Box>

        <Box
        >
          <Typography
            variant="h4"
            marginTop={2}
            sx={{
              fontWeight:"regular",
              fontSize: "1.5rem",
            }}
          >
            Select a profile patient <br /> or add one
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#F7F7F7", 
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            mt: "2rem",
            width: "100%",
            justifyContent: "center",
            ml: { xs: "1rem", sm: "3rem", md: "6.2rem" },
          }}
        >
          <Box
            component="table"
            sx={{ width: "30%", textAlign: "center",backgroundColor: "#F7F7F7" }}
          >
            <Box component="tr">
              <Box component="td" sx={{ height: "120px"}}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontWeight:"regular",
                    fontSize: "1.5rem",
                  }}
                >
                  <span>+</span>
                  <span>add</span>
                </Button>
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td">
                <Typography sx={{ fontWeight: "light", mt: "0.5rem", textAlign: "center" }}>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            component="table"
            sx={{ width: "30%", textAlign: "center" }}
          >
            <Box component="tr">
              <Box component="td" sx={{ height: "120px" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: "2rem",
                    padding: "0",
                  }}
                >
                  <img
                    src={patientImage}
                    alt="Patient Icon"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }}
                  />
                </Button>
              </Box>
            </Box>
            <Box component="tr">
              <Box component="td">
                <Typography sx={{ fontWeight: "light", mt: "0.5rem", textAlign: "center" }}>
                  Carlo Rossi
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
