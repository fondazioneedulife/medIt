import { Box, Stack, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginLabel } from "./LoginLabel";
import iconEmail from "../../assets/icon/icon-email.svg";
import Logo from "../../assets/logo.svg";
import iconKey from "../../assets/icon/icon-key.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { ReturnIcon } from "./ReturnIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, getAuthByUserId } from "../../database/indexdb";
import bcrypt from "bcryptjs";
import { useRegistration } from "../registration/RegistrationContext";
import { Auth } from "../../../api-types/Auth";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const Login: React.FC = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { setUser } = useRegistration();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        setError("User not found");
        return;
      }
      if (user.id === undefined) {
        setError("User ID is undefined");
        return;
      }
      const auth: Auth = (await getAuthByUserId(user.id)) as Auth;
      if (!auth) {
        setError("Authentication data not found");
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, auth.password);
      if (!isPasswordValid) {
        setError("Invalid password");
        return;
      }
      setUser(user);
      navigate("/home");
    } catch (error) {
      console.error("Failed to login user:", error);
      setError("Failed to login user");
    }
  };

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
      <ReturnIcon path="/login/choose" />
      <ThemeProvider theme={theme}>
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "8rem", marginBottom: "5rem" }}
          />

          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              sx={{
                width: "80%",
                justifyContent: "center",
                maxWidth: "30rem",
              }}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: "20rem",
                  borderRadius: 5,
                  boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
                  display: "inline-table",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  padding: "1rem",
                  boxSizing: "border-box",
                }}
              >
                <LoginLabel
                  inputName="email"
                  img={iconEmail}
                  placeholder={"Email"}
                  onChange={handleInputChange}
                />
                <LoginLabel
                  inputName="password"
                  img={iconKey}
                  placeholder={"Password"}
                  showHr={false}
                  type="password"
                  onChange={handleInputChange}
                />
                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
                
              </Box>
            </Stack>

            <Stack
              direction="row"
              sx={{
                  width: "80%",
              }}
            >
              <LoginButton
                text={translate('login')}
                width="100%"
                maxWidth="20rem"
                to="/home"
              />
            </Stack>
          </Stack>
         </form>
      </ThemeProvider>
    </Box>
  );
};
