import { Navbar } from "../Navbar/Navbar";
import { Box, Typography, Button, Stack, Avatar } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { useLanguage } from "../../contexts/LanguageContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { ProfileEntry } from "./ProfileEntry";
import { useLogin } from "../login/LoginContext";
import userInfoIcon from "../../assets/profile/user_information.svg";
import medicalHistoryIcon from "../../assets/profile/clipboard_heart_icon.svg";
import supportIcon from "../../assets/profile/support_icon.svg";
import settingsIcon from "../../assets/profile/settings_icon.svg";
import patientListIcon from "../../assets/profile/patient_list_icon.svg";
import logoutIcon from "../../assets/profile/logoutIcon.svg";

export const UserProfile: React.FC = () => {
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

  const { user, setUser } = useLogin();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const qrCodeHandleClick = () => {
    navigate("/profile/patient-qr-code", { state: { qrcode: user?.qrcode } });
  };

  const patientListHandleClick = () => {
    navigate("/profile/patient-list");
  };

  const logoutHandleClick = () => {
    setUser(null);
  };

  const profileImage = user?.profileImage || null;

  const initials = `${user?.firstName?.charAt(0).toUpperCase()}${user?.lastName
    ?.charAt(0)
    .toUpperCase()}`;

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "89vh" /* navbar height is 11vh */,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f7f7f7",
          [theme.breakpoints.up("sm")]: {
            height: "200vh",
          },
          [theme.breakpoints.up("lg")]: {
            height: "140vh",
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              width: "80%",
              maxWidth: "20rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              [theme.breakpoints.up("lg")]: {
                marginTop: "-10rem",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {translate("profile")}
              </Typography>
              {user?.role == "patient" ? (
                <Button
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "3rem",
                    height: "4rem",
                  }}
                  fullWidth
                  variant="contained"
                  onClick={qrCodeHandleClick}
                >
                  <QrCodeIcon sx={{ fontSize: "2rem" }} />
                </Button>
              ) : (
                ""
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "1rem",
              }}
            >
              <Avatar
                src={profileImage || undefined}
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#00259D",
                  fontSize: "2.5rem",
                  color: "white",
                }}
              >
                {!profileImage && initials}
              </Avatar>
              <Box ml={2}>
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600
                  }}
                >
                  {user?.firstName}
                </Typography>
                <Box
                  sx={{
                    backgroundColor:
                      user?.role == "caregiver" ? "#FF0000" : "#00259D",
                    color: "white",
                    borderRadius: "12px",
                    padding: "2px 8px",
                    fontWeight: 600
                  }}
                >
                  {translate(
                    user?.role == "caregiver" ? "caregiver" : "patient"
                  ).toLocaleLowerCase()}
                </Box>
              </Box>
            </Box>

            {user?.role == "caregiver" ? (
              <Box
                sx={{
                  marginTop: "2rem",
                  padding: "1rem",
                  backgroundColor: "#0B6BB2",
                  borderRadius: "1rem",
                  cursor: "pointer",
                  fontWeight: 600
                }}
                onClick={patientListHandleClick}
              >
                <Stack
                  sx={{ width: "100%" }}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  color="white"
                >
                  <img
                    src={patientListIcon}
                    alt="icon"
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      marginRight: "1rem",
                    }}
                  />
                  {translate("patientList")}
                </Stack>
              </Box>
            ) : (
              ""
            )}

            <Box
              sx={{
                marginTop: "2rem",
                marginBottom: "2rem",
                backgroundColor: "white",
                borderRadius: "1rem",
                width: "100%",
                fontWeight: 600
              }}
            >
              <ProfileEntry
                img={userInfoIcon}
                text={translate("userInfo")}
                path="/profile/user-info"
              />
              <hr />
              <ProfileEntry
                img={medicalHistoryIcon}
                text={translate("medicalHistory")}
                path="/profile/medical-history"
              />
            </Box>

            <Box
              sx={{
                marginBottom: "2rem",
                backgroundColor: "white",
                borderRadius: "1rem",
                width: "100%",
                fontWeight: 600
              }}
            >
              <ProfileEntry
                img={supportIcon}
                text={translate("support")}
                path="/profile/support"
              />
              <hr />
              <ProfileEntry
                img={settingsIcon}
                text={translate("settings")}
                path="/profile/settings"
              />
            </Box>

            <Box
              sx={{
                padding: "1rem",
                backgroundColor: "#FF0000",
                borderRadius: "1rem",
                cursor: "pointer",
              }}
              onClick={logoutHandleClick}
            >
              <Stack
                sx={{
                  width: "100%",
                  fontWeight: 600
                }}
                direction="row"
                alignItems="center"
                spacing={2}
                color="white"
              >
                <img
                  src={logoutIcon}
                  alt="logout icon"
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    marginRight: "1rem",
                  }}
                />
                {translate("logout")}
              </Stack>
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
    </>
  );
};
