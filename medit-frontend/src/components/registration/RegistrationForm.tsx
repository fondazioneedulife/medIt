import { Button, ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "./label";
import iconEmail from "../../assets/icon/icon-email.svg";
import iconUser from "../../assets/icon/logo user.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { ReturnIcon } from "../login/ReturnIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { getUserByEmail } from "../../database/indexedDB";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleEnum } from "../../generated";
import { useRegistration } from "./RegistrationContext";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const Registration: React.FC = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { user, setUser } = useRegistration();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!user.firstName || !/^[a-zA-Z]+$/.test(user.firstName)) {
      newErrors.firstName = translate("invalidFirstName");
    }

    if (!user.lastName || !/^[a-zA-Z]+$/.test(user.lastName)) {
      newErrors.lastName = translate("invalidLastName");
    }

    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = translate("invalidEmailAddress");
    }

    if (!user.password || user.password.length < 8) {
      newErrors.password = translate("shortPassword");
    }

    if (user.password !== user.Confirmpassword) {
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
      if (!user.email) {
        console.error("Email is required");
        return;
      }
      const existingUser = await getUserByEmail(user.email);
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
        ...user,
        role: RoleEnum.Patient,
        qrcode: qrCodeData,
      };
      await setUser(newUser);

      navigate("/register/choose-role");
    } catch (error) {
      console.error("Failed to register user:", error);
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
      <ReturnIcon path="/login/choose" color="white" />
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
            {translate("registration")}
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
                  <Label
                    inputName="firstName"
                    img={iconUser}
                    placeholder={translate("firstName")}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <Typography color="error">{errors.firstName}</Typography>
                  )}
                  <Label
                    inputName="lastName"
                    img={iconUser}
                    placeholder={translate("lastName")}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <Typography color="error">{errors.lastName}</Typography>
                  )}
                  <Label
                    inputName="email"
                    img={iconEmail}
                    placeholder={"Email"}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <Typography color="error">{errors.email}</Typography>
                  )}
                  <Label
                    inputName="password"
                    img={iconKey}
                    placeholder={"Password"}
                    type="password"
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <Typography color="error">{errors.password}</Typography>
                  )}
                  <Label
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
