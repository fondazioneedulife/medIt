import { Button, ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PatientRegistrationReturnIcon } from "./PatientRegistrationReturnIcon";
import { useLanguage } from "../../../contexts/LanguageContext";
import { PatientLabel } from "./PatientLabel";
import { useRegistration } from "../../../contexts/PatientRegistrationContenxt";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getUserByEmail, registerUser, addRecord } from "../../../database/indexedDB";
import { v4 as uuidv4 } from "uuid";
import { RoleEnum } from "../../../generated";
import { useLogin } from "../../login/LoginContext";
import QRCode from "qrcode";
import bcrypt from "bcryptjs";
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
        role: RoleEnum.Patient,
        caregiverId: user?.id,
        qrcode: qrCodeData,
      };
      const { id, ...userToSave } = newUser;    // remove item in object

      await setPatient(userToSave);
      const patientId = await registerUser({
        ...userToSave,
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (!userToSave.email) {
        console.error("User email is undefined");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      if (!userToSave.password) {
        console.error("User password is undefined");
        return;
      }
      const hashedPassword = await bcrypt.hash(userToSave.password, salt);

      await addRecord("auth", {
        user_id: patientId,
        password: hashedPassword,
        failed_attempts: 0,
        last_login: new Date(),
        synced_at: new Date(),
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
                  {errors.firstName && (
                    <Typography color="error">{errors.firstName}</Typography>
                  )}
                  <PatientLabel
                    inputName="lastName"
                    img={iconUser}
                    placeholder={translate("lastName")}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <Typography color="error">{errors.lastName}</Typography>
                  )}
                  <PatientLabel
                    inputName="email"
                    img={iconEmail}
                    placeholder={"Email"}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <Typography color="error">{errors.email}</Typography>
                  )}
                  <PatientLabel
                    inputName="password"
                    img={iconKey}
                    placeholder={"Password"}
                    type="password"
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <Typography color="error">{errors.password}</Typography>
                  )}
                  <PatientLabel
                    inputName="Confirmpassword"
                    img={iconKey}
                    placeholder={translate("confirmPassword")}
                    showHr={false}
                    type="password"
                    onChange={handleInputChange}
                  />
                  {errors.Confirmpassword && (
                    <Typography color="error">
                      {errors.Confirmpassword}
                    </Typography>
                  )}
                  {errors.existingUser && (
                    <Typography color="error" sx={{ mt: "1rem", textAlign: "center" }}>
                      {errors.existingUser}
                    </Typography>
                  )}
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
