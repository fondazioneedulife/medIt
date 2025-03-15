import { useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Fade,
} from "@mui/material";
import { useLanguage } from "../../../contexts/LanguageContext";
import Ellipse from "../../../assets/icon/Check-Ellipse.svg";
import Check from "../../../assets/icon/Check.svg";
import Image from "../../../assets/icon/immagine.jpg";
import Profile from "../../../assets/icon/profile.png";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

interface MedicineComponentProps {
  medication: any;
}

export const MedicineComponent: React.FC<MedicineComponentProps> = ({
  medication,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [bgColor, setBgColor] = useState("white");

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
    setBgColor((prev) =>
      prev === "white" ? "rgba(67, 134, 16, 0.8)" : "white"
    );
  };

  const { language } = useLanguage();
  const { translate } = useLanguage();

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
          width: { xs: "85%", sm: "55%", md: "40%", lg: "30%", xl: "25%" },
          height: { md: "12vh", xl: "16vh", xs: language === "it" ? "16vh" : "14vh" },
          backgroundColor: bgColor,
          borderRadius: "10px",
          display: "flex",
          p: 2,
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          transition: "background-color 0.5s ease",
        }}
      >
        <Box
          sx={{
            width: { xs: "35%", sm: "22%", md: "23%", lg: "20%", xl: "25%" },
            height: "auto",
            borderRadius: "10px",
          }}
        >
          <img src={Image} alt="" width={"80%"} />
        </Box>
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
                  mb: { xl: 2, xs: 1 },
                }}
              >
                {medication.name}
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.1rem" }}
              >
                {translate(medication.type.toLowerCase())}, {medication.dose}
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.1rem" }}
              >
                {translate(medication.program.toLowerCase())}, {medication.quantity} {translate("timesAday")}
              </Typography>
            </ThemeProvider>
          </Box>
          <Box
            sx={{
              backgroundColor: "#0B6BB2",
              color: "white",
              width: "5.5rem",
              height: "25%",
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
            justifyContent: "space-between",
            height: { xs: "110%", xl: "100%" },
          }}
        >
          <Box
            sx={{
              width: "45px",
              height: "45px",
              borderRadius: "100%",
            }}
          >
            <img src={Profile} alt="" width={"100%"} />
          </Box>
          <Box>
            <Box
              sx={{ position: "relative", cursor: "pointer" }}
              onClick={toggleCheck}
            >
              <Box>
                <img src={Ellipse} alt="Ellipse" width={50} />
              </Box>
              <Fade in={isChecked} timeout={500}>
                <Box sx={{ position: "absolute", top: 0, left: 2 }}>
                  <img src={Check} alt="Check" width={46} />
                </Box>
              </Fade>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
