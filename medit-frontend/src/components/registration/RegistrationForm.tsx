import { Box, ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "./label";
import iconEmail from "../../assets/icon/icon-email.svg";
import iconUser from "../../assets/icon/logo user.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { ConfirmRegistration } from "./buttonConfirm";
import { Return } from "./return";

// Crea un tema personalizzato con il font Montserrat
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const Registration: React.FC = () => {
  return (
    <body
      style={{
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        backgroundSize: "200% 120%", // Estende il gradiente
      }}
    >
      <ListItem
        style={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Return />
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            style={{
              fontWeight: "bold",
              paddingBottom: "3rem",
              fontSize: "2.5rem",
            }}
          >
            Registration
          </Typography>
        </ThemeProvider>
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
                  inputName="name"
                  img={iconUser}
                  placeholder={"Firstname"}
                />
                <Label
                  inputName="surname"
                  img={iconUser}
                  placeholder={"Lastname"}
                />
                <Label
                  inputName="email"
                  img={iconEmail}
                  placeholder={"Email"}
                />
                <Label
                  inputName="password"
                  img={iconKey}
                  placeholder={"Password"}
                />
                <Label
                  inputName="Confirmpassword"
                  img={iconKey}
                  placeholder={"Confrim password"}
                  showHr={false}
                />
              </div>
            </div>
          </ListItem>
        </Box>
        <ConfirmRegistration />
      </ListItem>
    </body>
  );
};
