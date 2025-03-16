import { useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  Typography,
  Fade,
  Button,
  Avatar,
} from "@mui/material";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Ellipse from "../../../assets/icon/Check-Ellipse.svg";
import Check from "../../../assets/icon/Check.svg";
import DefaultImage from "../../../assets/icon/immagine.jpg";
import { useLogin } from "../../login/LoginContext";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

interface MedicationComponentProps {
  medication: any;
  reminder: any;
}

export const MedicationComponent: React.FC<MedicationComponentProps> = ({
  medication,
  reminder,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [bgColor, setBgColor] = useState("white");

  const navigate = useNavigate();
  const { user } = useLogin();

  const toggleCheck = () => {
    setIsChecked((prev) => !prev);
    setBgColor((prev) =>
      prev === "white" ? "rgba(67, 134, 16, 0.8)" : "white"
    );
  };

  const handleCardClick = () => {
    navigate("/medication-details");
  };

  const { language } = useLanguage();
  const { translate } = useLanguage();

  const profileImage = user?.profileImage || null;

  const initials = `${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName
    ?.charAt(0)
    .toUpperCase()}`;

  const medicationImage = medication.image || DefaultImage;

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
          height: {
            md: "12vh",
            xl: "16vh",
            xs: language === "it" ? "16vh" : "14vh",
          },
          backgroundColor: bgColor,
          borderRadius: "10px",
          display: "flex",
          p: 2,
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          transition: "background-color 0.5s ease",
          position: "relative",
        }}
      >
        <Button
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "75%",
            height: "100%",
            backgroundColor: "transparent",
            zIndex: 2,
          }}
          onClick={handleCardClick}
        />
        <Box
          sx={{
            width: { xs: "35%", sm: "22%", md: "23%", lg: "20%", xl: "25%" },
            height: "auto",
            borderRadius: "10px",
          }}
        >
          <img src={medicationImage} alt="Medication" width={"80%"} />
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
                {translate(medication.type.toLowerCase())}, {medication.dose} {medication.unit}
              </Typography>
            </ThemeProvider>
          </Box>
          <Box sx={{ color: "#505050" }}>
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "Medium", fontSize: "1.1rem" }}
              >
                {reminder.frequency}, {medication.quantity} left
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
                {new Date(reminder.reminder_date_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
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
            <Avatar
              src={profileImage || undefined}
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              {!profileImage && initials}
            </Avatar>
          </Box>
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
  );
};
