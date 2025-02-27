import { Button, ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "./label";
import iconEmail from "../../assets/icon/icon-email.svg";
import iconUser from "../../assets/icon/logo user.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { Return } from "./return";
import { useLanguage } from "../../contexts/LanguageContext";
import { getUserByEmail } from "../../database/indexdb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleEnum } from "../../generated";
import { useRegistration } from "./RegistrationContext";

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
      newErrors.firstName = "Invalid first name";
    }

    if (!user.lastName || !/^[a-zA-Z]+$/.test(user.lastName)) {
      newErrors.lastName = "Invalid last name";
    }

    if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!user.password || user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (user.password !== user.Confirmpassword) {
      newErrors.Confirmpassword = "Passwords do not match";
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
        console.error("User with this email already exists");
        return;
      }
      setUser((prevUser) => ({
        ...prevUser,
        role: RoleEnum.Patient,
      }));
      navigate("/login/choose-role");
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        backgroundSize: "200% 120%", // Estende il gradiente
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ListItem
        sx={{
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Return />
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              paddingBottom: "3rem",
              fontSize: "2.5rem",
              textAlign: "center",
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
                </div>
              </div>
            </ListItem>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              width: "100%",
              borderRadius: 3,
              backgroundColor: "#00ca9bff",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#00b38f",
              },
            }}
          >
            {translate("confirm")}
          </Button>
        </form>
      </ListItem>
    </Box>
  );
};
