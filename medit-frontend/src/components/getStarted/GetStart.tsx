import { Box, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import completeLogoWhite from "../../assets/logo/medit_logo_white_with_logotype.svg";
import { LoginButton } from "../login/LoginButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { ChoseLangIcon } from "./ChoseLangIcon";

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

export const GetStart: React.FC = () => {
  const { translate } = useLanguage();

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
        position: "relative", // Aggiunto per posizionare l'icona
        [theme.breakpoints.down("md")]: {
          "@media (orientation: landscape)": {
            height: "175vh",
          },
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <ChoseLangIcon />
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
            style={{ width: "8rem", marginBottom: "5rem" }}
          />

          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
              lineHeight: "1",
              width: "75%",
            }}
          >
            {translate("startSlogan")}
          </Box>
          <Box></Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              height: "4.5rem",
              justifyContent: "center",
            }}
          >
            <LoginButton
                text={translate("getStarted")}
                width="100%"
                maxWidth="20rem"
                to="/login/choose"
            />
          </Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
};
