import { Box, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginLabel } from "./LoginLabel";
import iconEmail from "../../assets/icon/icon-email.svg";
import Logo from "../../assets/logo.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { ReturnIcon } from "./ReturnIcon";
import { LoginButton } from "./LoginButton";

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

export const Login: React.FC = () => {

  const { translate } = useLanguage();
  
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        backgroundSize: "200% 120%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        margin: 0,
        [theme.breakpoints.down("md")]: {
          "@media (orientation: landscape)": {
            height: "175vh",
          },
        },
      }}
    >
     <ReturnIcon path="/login/choose" />
     <ThemeProvider theme={theme}>
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "8rem", marginBottom: "5rem"}}
          />

          <Stack
            direction="row"
            sx={{
                width: "80%",
                justifyContent: "center",
                maxWidth: "30rem",
            }}
          >
            <Box
              sx={{
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                borderRadius: 5,
                boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
                display: "inline-table",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                padding: "1rem",
                boxSizing: "border-box",
              }}
            >
              <LoginLabel
                inputName="email"
                img={iconEmail}
                placeholder={"Email"}
              />
              <LoginLabel
                inputName="password"
                img={iconKey}
                placeholder={"Password"}
                showHr={false}
                type="password"
              />
            </Box>
          </Stack>

          <Stack
            direction="row"
            sx={{
                width: "80%",
            }}
          >
            <LoginButton
              text={translate('signup')}
              width="100%"
              maxWidth="30rem"
              to="/home"
            />
          </Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
};
