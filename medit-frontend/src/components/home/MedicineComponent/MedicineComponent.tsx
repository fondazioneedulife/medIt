import { useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Fade,
} from "@mui/material";
import Ellipse from "../../../assets/icon/Check-Ellipse.svg";
import Check from "../../../assets/icon/Check.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const MedicineComponent: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "25vh",
        position: "relative",
        top: 20,
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "55%", md: "40%", lg: "30%", xl: "25%" },
          height: { md: "14vh", xl: "18vh", xs: "14vh" },
          backgroundColor: "white",
          borderRadius: "30px",
          display: "flex",
          p: 2,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box
          sx={{
            width: "35%",
            height: "100%",
            backgroundColor: "lightgrey",
            borderRadius: "25px",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 1.2,
            width: "58%",
          }}
        >
          <Box sx={{ color: "black" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xl: "1.9rem", xs: "1.5rem" },
                  mb: { xl: 3, xs: 1 },
                }}
              >
                Medicine
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.1rem" }}
              >
                Capsule, 100mg
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.1rem" }}
              >
                Daily, 1 times a day
              </Typography>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              backgroundColor: "#0B6BB2",
              color: "white",
              width: "5.5rem",
              height: "20%",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mt: 1,
            }}
          >
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Bold", fontSize: "1rem" }}
              >
                9:00 am
              </Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "lightgrey",
              width: "7vh",
              height: "7vh",
              borderRadius: "80px",
            }}
          ></Box>
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{ position: "relative", cursor: "pointer" }}
              onClick={toggleCheck}
            >
              <Box>
                <img src={Ellipse} alt="Ellipse" width={40} />
              </Box>
              <Fade in={isChecked} timeout={500}>
                <Box sx={{ position: "absolute", top: -2, left: 7 }}>
                  <img src={Check} alt="Check" width={40} />
                </Box>
              </Fade>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
