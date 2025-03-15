import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import HomeIcon from "../../assets/icon/icon_home.svg";
import ProfileIcon from "../../assets/icon/Icon_user.svg";
import IconPlus from "../../assets/icon/Icon_plus.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const Navbar: React.FC<{ onAddDetailsClick: () => void }> = ({
  onAddDetailsClick,
}) => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("home");

  useEffect(() => {
    if (location.pathname === "/home") {
      setActiveButton("home");
    } else if (location.pathname === "/profile") {
      setActiveButton("profile");
    }
  }, [location.pathname]);

  const handleHomeClick = () => {
    setActiveButton("home");
    navigate("/home");
  };

  const handleProfileClick = () => {
    setActiveButton("profile");
    navigate("/profile");
  };

  return (
    <Box
      sx={{
        height: "11vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        margin: 0,
        padding: 0,
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
        boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            color: "transparent",
            textTransform: "capitalize",
            ":focus": {
              color: "black",
              outline: "none",
            },
          }}
          tabIndex={0}
          onClick={handleHomeClick}
        >
          <Box
            component="img"
            src={HomeIcon}
            alt="Home Icon"
            sx={{
              width: "2.5rem",
              filter:
                activeButton === "home"
                  ? "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                  : "grayscale(100%)",
            }}
          />
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "medium",
                fontSize: "1rem",
                color: activeButton === "home" ? "black" : "#a2a2a2",
              }}
            >
              {translate("home")}
            </Typography>
          </ThemeProvider>
        </Button>

        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            bgcolor: "#0B6BB2",
            width: "70px",
            height: "70px",
            borderRadius: "12px",
            justifyContent: "space-around",
            position: "relative",
            transform: "translateY(-60%)",
          }}
          onClick={onAddDetailsClick}
        >
          <Box
            component="img"
            src={IconPlus}
            alt="Add Icon"
            sx={{
              width: "3rem",
            }}
          ></Box>
        </Button>

        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            color: "transparent",
            textTransform: "capitalize",
            ":focus": {
              color: "black",
              outline: "none",
            },
          }}
          tabIndex={0}
          onClick={handleProfileClick}
        >
          <Box
            component="img"
            src={ProfileIcon}
            alt="Profile Icon"
            sx={{
              width: "2.5rem",
              filter:
                activeButton === "profile"
                  ? "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                  : "grayscale(100%)",
            }}
          />
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "medium",
                fontSize: "1rem",
                color: activeButton === "profile" ? "black" : "#a2a2a2",
              }}
            >
              {translate("profile")}
            </Typography>
          </ThemeProvider>
        </Button>
      </Box>
    </Box>
  );
};
