import { Component, useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Fade,
} from "@mui/material";
import Ellipse from "../../assets/icon/Check-Ellipse.svg";
import Check from "../../assets/icon/Check.svg";

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
        justifyContent: "space-around",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "60vh",
          height: "21vh",
          backgroundColor: "white",
          borderRadius: "30px",
          display: "flex",
          p: 4,
          boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.25)",
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
          sx={{ display: "flex", flexDirection: "column", ml: 3, width: "51%" }}
        >
          <Box sx={{ color: "black" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontSize: "2.5rem", mb: 2.5 }}
              >
                Medicine
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.5rem" }}
              >
                Capsule, 100mg
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.5rem" }}
              >
                Daily, 1 times a day
              </Typography>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              backgroundColor: "#0B6BB2",
              color: "white",
              width: "55%",
              height: "20%",
              borderRadius: "25px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mt: 2,
            }}
          >
            <ThemeProvider theme={theme}>
              <Typography variant="h5" sx={{ fontWeight: "Bold" }}>
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
                <img src={Ellipse} alt="Ellipse" width={50} />
              </Box>
              <Fade in={isChecked} timeout={500}>
                <Box sx={{ position: "absolute", top: -2, left: 7 }}>
                  <img src={Check} alt="Check" width={50} />
                </Box>
              </Fade>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
