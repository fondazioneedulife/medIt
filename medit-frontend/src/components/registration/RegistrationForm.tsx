import { Button, ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "./label";
import iconEmail from "../../assets/icon/icon-email.svg";
import iconUser from "../../assets/icon/logo user.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { ConfirmRegistration } from "./buttonConfirm";
import { Return } from "./return";
import { useLanguage } from "../../contexts/LanguageContext";

// Crea un tema personalizzato con il font Montserrat
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const Registration: React.FC = () => {
  const { translate } = useLanguage();

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
            {translate("registration")}
          </Typography>
        </ThemeProvider>
        <Button
          sx={{
            borderRadius: 5,
            boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
            display: "inline-table",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "21rem",
            "&:focus, &:focus-visible": {
              outline: "none",
            },
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
                  placeholder={translate("firstName")}
                />
                <Label
                  inputName="surname"
                  img={iconUser}
                  placeholder={translate("lastName")}
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
                  type="password"
                />
                <Label
                  inputName="Confirmpassword"
                  img={iconKey}
                  placeholder={translate("confirmPassword")}
                  showHr={false}
                  type="password"
                />
              </div>
            </div>
          </ListItem>
        </Button>
        <ConfirmRegistration />
      </ListItem>
    </body>
  );
};
