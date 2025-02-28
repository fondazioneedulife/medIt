import { ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Return } from "../registration/return";
import { ChooseButton } from "./chooseButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useRegistration } from "../registration/RegistrationContext";
import {
  registerUser,
  getUserByEmail,
  addRecord,
} from "../../database/indexdb";
import { RoleEnum } from "../../generated/models/RoleEnum";
import bcrypt from "bcryptjs";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

interface ReturnProps {
  style?: React.CSSProperties;
}

export const ChooseRole: React.FC<ReturnProps> = ({ style }) => {
  const { translate } = useLanguage();
  const { user, setUser } = useRegistration();
  const [role, setRole] = useState<string | null>(null);

  const handleRoleSelect = async (selectedRole: string) => {
    console.log("handleRoleSelect called with role:", selectedRole);
    setRole(selectedRole);
    setUser((prevUser) => ({
      ...prevUser,
      role: selectedRole as RoleEnum,
    }));

    try {
      if (!user.email) {
        console.error("User email is undefined");
        return;
      }
      const existingUser = await getUserByEmail(user.email);
      if (existingUser) {
        console.error("User with this email already exists");
        return;
      }

      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      if (!user.password) {
        console.error("User password is undefined");
        return;
      }
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const { Confirmpassword, password, ...userToSave } = user;
      const userId = await registerUser({
        ...userToSave,
        role: selectedRole as RoleEnum,
      });

      await addRecord("auth", {
        user_id: userId,
        password: hashedPassword,
        failed_attempts: 0,
        last_login: new Date(),
        synced_at: new Date(),
      });

      console.log("User registered successfully with role:", selectedRole);
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        backgroundSize: "200% 120%", // Estende il gradiente
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ListItem
        style={{
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Return />
        <div style={{ width: "100%", textAlign: "center" }}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontWeight: "bold",
                mb: "1rem",
                fontSize: "2.5rem",
              }}
            >
              {translate("registration")}
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              style={{
                fontWeight: "regular",
                fontSize: "2rem",
              }}
            >
              {translate("whoAreYouQuestion")}
            </Typography>
          </ThemeProvider>
          <ListItem
            alignItems="center"
            style={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <ChooseButton onRoleSelect={handleRoleSelect} />{" "}
          </ListItem>
        </div>
      </ListItem>
    </div>
  );
};
