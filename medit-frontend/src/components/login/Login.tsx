import { Box, ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "../registration/label";
import iconEmail from "../../assets/icon/icon-email.svg";
import Logo from "../../assets/logo.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { Return } from "../registration/return";
//import { ConfirmRegistration } from "../registration/buttonConfirm";
import { Select } from "./buttons";

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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Login component renders a full-screen login interface with a gradient background.
 * It includes a logo at the top, a return button for navigation, and input fields
 * for email and password. The input fields are grouped inside a styled box, and
 * beneath them is a selectable button for submitting the login form.
 *
 * The component utilizes Material-UI's Box and ListItem for layout and styling,
 * and custom components like Label for input fields and Select for the login button.
 *
 * The logo image and icons for the input fields are imported as assets.
 */

/******  a21648a7-c145-4360-91e4-5228144cffdf  *******/ export const Login: React.FC =
  () => {
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
          <Select>Login</Select>
        </ListItem>
      </Box>
    );
  };
