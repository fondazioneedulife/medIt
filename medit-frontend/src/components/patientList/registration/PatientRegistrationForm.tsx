import { Button, ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReturnIcon } from "../../login/ReturnIcon";
import { useLanguage } from "../../../contexts/LanguageContext";
import { PatientLabel } from "./PatientLabel";
import iconEmail from "../../../assets/icon/icon-email.svg";
import iconUser from "../../../assets/icon/logo user.svg";
import iconKey from "../../../assets/icon/icon-key.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const PatientRegistrationForm: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        backgroundSize: "200% 120%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReturnIcon path="/profile/patient-list" color="white" />
      <ListItem
        sx={{
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              paddingBottom: "3rem",
              fontSize: "2.5rem",
              textAlign: "center",
              color: "white",
            }}
          >
            {translate("patientRegistration")}
          </Typography>
        </ThemeProvider>
        <form>
          <Box
            sx={{
              borderRadius: 5,
              boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
              display: "inline-table",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: "100%",
              "&:focus, &:focus-visible": {
                outline: "none",
              },
            }}
          >
            <ListItem
              alignItems="center"
              sx={{
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <div>
                  <PatientLabel
                    inputName="firstName"
                    img={iconUser}
                    placeholder={translate("firstName")}
                  />
                  <PatientLabel
                    inputName="lastName"
                    img={iconUser}
                    placeholder={translate("lastName")}
                  />
                  
                  <PatientLabel
                    inputName="email"
                    img={iconEmail}
                    placeholder={"Email"}
                  />
                  <PatientLabel
                    inputName="password"
                    img={iconKey}
                    placeholder={"Password"}
                    type="password"
                  />
                  <PatientLabel
                    inputName="Confirmpassword"
                    img={iconKey}
                    placeholder={translate("confirmPassword")}
                    showHr={false}
                    type="password"
                  />
                </div>
              </div>
            </ListItem>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: "2rem",
              width: "100%",
              borderRadius: 3,
              backgroundColor: "white",
              color: "black",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            <Box sx={{ padding: "1rem" }}>{translate("confirm")}</Box>
          </Button>
        </form>
      </ListItem>
    </Box>
  );
};
