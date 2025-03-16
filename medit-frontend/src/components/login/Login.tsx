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
import { getUserByEmail, getAuthByUserId } from "../../database/indexedDB";
import bcrypt from "bcryptjs";
import { useLogin } from "./LoginContext";
import { Auth } from "../../../api-types/Auth";
import { RoleEnum } from "../../generated";

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
  const { setUser } = useLogin();
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
      console.log(user);
      if (!user) {
        setError(translate("userNotFound"));
        return;
      }
      if (user.id === undefined) {
        setError("User ID is undefined");
        return;
      }
      const auth: Auth = (await getAuthByUserId(user.id)) as Auth;
      console.log(auth);
      if (!auth) {
        setError("Authentication data not found");
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, auth.password);
      if (!isPasswordValid) {
        setError(translate("InvalidPassword"));
        return;
      }
      setUser({
        ...user,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || RoleEnum.Patient,
        qrcode: user.qrcode || "",
        timezone: user.timezone || "",
        language: user.language || "",
      });
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
      <ReturnIcon path="/login/choose" color="white" />
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
            style={{ width: "12rem", marginBottom: "5rem" }}
          />

          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              sx={{
                width: "100%",
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
                  type="email"
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
                width: "100%",
                marginTop: "2rem",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  maxWidth: "20rem",
                  borderRadius: 2,
                  backgroundColor: "white",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  cursor: "pointer",
                  textTransform: "none",
                }}
              >
                {translate("login")}
              </Button>
            </Stack>
          </form>
        </Stack>
      </ThemeProvider>
    </Box>
  );
};
