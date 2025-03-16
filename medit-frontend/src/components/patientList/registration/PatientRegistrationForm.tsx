import { Button, ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PatientRegistrationReturnIcon } from "./PatientRegistrationReturnIcon";
import { useLanguage } from "../../../contexts/LanguageContext";
import { PatientLabel } from "./PatientLabel";
import { useRegistration } from "../../../contexts/PatientRegistrationContenxt";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getUserByEmail, registerUser } from "../../../database/indexedDB";
import { v4 as uuidv4 } from "uuid";
import { RoleEnum } from "../../../generated";
import { useLogin } from "../../login/LoginContext";
import QRCode from "qrcode";
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
  const navigate = useNavigate();
  const { patient, setPatient } = useRegistration();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { user } = useLogin();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!patient.firstName || !/^[a-zA-Z]+$/.test(patient.firstName)) {
      newErrors.firstName = translate("invalidFirstName");
    }

    if (!patient.lastName || !/^[a-zA-Z]+$/.test(patient.lastName)) {
      newErrors.lastName = translate("invalidLastName");
    }

    if (!patient.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email)) {
      newErrors.email = translate("invalidEmailAddress");
    }

    if (!patient.password || patient.password.length < 8) {
      newErrors.password = translate("shortPassword");
    }

    if (patient.password !== patient.Confirmpassword) {
      newErrors.Confirmpassword = translate("passwordsDoNotMatch");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      if (!patient.email) {
        console.error("Email is required");
        return;
      }
      const existingUser = await getUserByEmail(patient.email);
      if (existingUser) {
        // console.error("User with this email already exists");
        setErrors((prevErrors) => ({
          ...prevErrors,
          existingUser: translate("userWithEmailExists"),
        }));
        return;
      }

      const uuid = uuidv4();
      const qrCodeData = await QRCode.toDataURL(uuid);

      const newUser = {
        ...patient,
        id: undefined,
        role: RoleEnum.Patient,
        caregiverId: user?.id || 0,
        qrcode: qrCodeData,
      };

      await setPatient(newUser);
      await registerUser({
        ...newUser,
        created_at: new Date(),
        updated_at: new Date(),
      });

      navigate("/profile/patient-list");
    } catch (error) {
      console.error("Failed to register patient:", error);
    }
  };

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
      <PatientRegistrationReturnIcon path="/profile/patient-list" />

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
              paddingBottom: "1.5rem",
              fontSize: "2.5rem",
              textAlign: "center",
              color: "white",
            }}
          >
            {translate("patientRegistration")}
          </Typography>
        </ThemeProvider>
        <form onSubmit={handleSubmit}>
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
                    onChange={handleInputChange}
                  />
                  <PatientLabel
                    inputName="lastName"
                    img={iconUser}
                    placeholder={translate("lastName")}
                    onChange={handleInputChange}
                  />
                  
                  <PatientLabel
                    inputName="email"
                    img={iconEmail}
                    placeholder={"Email"}
                    onChange={handleInputChange}
                  />
                  <PatientLabel
                    inputName="password"
                    img={iconKey}
                    placeholder={"Password"}
                    type="password"
                    onChange={handleInputChange}
                  />
                  <PatientLabel
                    inputName="Confirmpassword"
                    img={iconKey}
                    placeholder={translate("confirmPassword")}
                    showHr={false}
                    type="password"
                    onChange={handleInputChange}
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
