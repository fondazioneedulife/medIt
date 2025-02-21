import { Box, ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "../registration/label";
import iconEmail from "../../assets/icon/icon-email.svg";
import Logo from "../../assets/logo.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { Return } from "../registration/return";
//import { ConfirmRegistration } from "../registration/buttonConfirm";
import { Select } from "./buttons";
import { useLanguage } from "../../contexts/LanguageContext";

// Crea un tema personalizzato con il font Montserrat
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
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
      <Box style={{ position: "absolute", top: "10px", left: "10px" }}>
        <Return />
      </Box>
      <img
        src={Logo}
        alt="Logo"
        style={{ marginTop: "10px", marginBottom: "15vh" }}
      />{" "}
      <ListItem
        style={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            borderRadius: 5,
            boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
            display: "inline-table",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "21rem",
          }}
        >
          <ListItem
            alignItems="center"
            style={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <div>
                <Label
                  inputName="email"
                  img={iconEmail}
                  placeholder={"Email"}
                />
                <Label
                  inputName="password"
                  img={iconKey}
                  placeholder={"Password"}
                  showHr={false}
                  type="password"
                />
              </div>
            </div>
          </ListItem>
        </Box>
        <Select>{translate('login')}</Select>
      </ListItem>
    </Box>
  );
};
