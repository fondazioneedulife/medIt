import React, { useEffect, useState } from "react";
import { Box, Button, Link, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReturnIcon } from "./ReturnIcon";
import QrCodeIcon from "@mui/icons-material/QrCode";
import completeLogoWhite from "../../assets/logo/medit_logo_white_with_logotype.svg";
import { LoginButton } from "./LoginButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLogin } from "./LoginContext";
import { RoleEnum } from "../../generated";
import { getUserById } from "../../database/indexedDB";

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

export const ChoseLoginOrSignup: React.FC = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { setUser } = useLogin();
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setUserImage(storedImage);
    }
  }, []);

  const handleQrCodeClick = () => {
    navigate("/login/scan-qrcode");
  };

  const handleClickHome = async () => {
    let guestUser = {
      id: -1,
      firstName: "Guest",
      lastName: "User",
      email: "",
      role: RoleEnum.Patient,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: "en",
    };

    try {
      const user = await getUserById(-1);
      if (user) {
        guestUser = user as any;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }

    setUser(guestUser);
    Cookies.set("user", JSON.stringify(guestUser), {
      secure: true,
      sameSite: "Strict",
    });
    navigate("/home");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        backgroundSize: "200% 120%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        boxSizing: "border-box",
        [theme.breakpoints.down("md")]: {
          "@media (orientation: landscape)": {
            height: "175vh",
          },
        },
      }}
    >
      <ReturnIcon path="/start" color="white" />
      <ThemeProvider theme={theme}>
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <img
            src={completeLogoWhite}
            alt="Medit complete logo"
            style={{ width: "12rem", marginBottom: "5rem" }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "75%",
              height: "4rem",
              justifyContent: "center",
            }}
          >
            <LoginButton
              text={translate("login")}
              width="75%"
              maxWidth="13rem"
              to="/login"
            />
            <Button
              variant="contained"
              onClick={handleQrCodeClick}
              sx={{
                width: "25%",
                maxWidth: "4rem",
                height: "100%",
                borderRadius: 2,
                backgroundColor: "white",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontWeight: "bold",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                cursor: "pointer",
              }}
              fullWidth
            >
              <QrCodeIcon sx={{ fontSize: "2.5rem" }} />
            </Button>
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "75%",
            }}
          >
            <LoginButton
              text={translate("signup")}
              width="100%"
              maxWidth="18rem"
              to="/register"
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              width: "75%",
              justifyContent: "center",
            }}
          >
            <Link
              onClick={handleClickHome}
              underline="always"
              sx={{
                color: "white",
                textDecoration: "underline",
                "&:hover": {
                  color: "white",
                  textDecoration: "none",
                },
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {translate("continueWithoutRegistration")}
            </Link>
          </Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
};
