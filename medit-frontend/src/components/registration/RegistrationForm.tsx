import { Box, ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Label } from "./label";
import iconEmail from "../../assets/icon/icon-email.svg";
import iconUser from "../../assets/icon/logo user.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import "./registrationForm.css";

// Crea un tema personalizzato con il font Montserrat
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  palette: {
    primary: {
      main: grey[50],
    },
  },
});

export const Registration: React.FC = () => {
  return (
    <body
      style={{ background: "linear-gradient(to right, #1412c6ff, #00ca9bff" }}
    >
      <ListItem
        alignItems="center"
        style={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            style={{ fontWeight: "bold" }}
          >
            Registration
          </Typography>
        </ThemeProvider>
        <Box
          sx={{
            width: 200,
            height: 100,
            borderRadius: 1,
            bgcolor: theme.palette.primary.main,
          }}
          style={{
            display: "inline-table",
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
                />
              </div>
            </div>
          </ListItem>
        </Box>
      </ListItem>
    </body>
  );
};
