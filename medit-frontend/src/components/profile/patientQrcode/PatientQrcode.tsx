import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ReturnIcon } from "../../login/ReturnIcon";
import { useLocation } from "react-router-dom";

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

export const PatientQrcode: React.FC = () => {
  const { translate } = useLanguage();
  const location = useLocation();
  const qrcode = location.state?.qrcode;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "#F7F7F7",
          backgroundSize: "200% 120%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          [theme.breakpoints.down("md")]: {
            "@media (orientation: landscape)": {
              height: "175vh",
            },
          },
        }}
      >
        <ReturnIcon path="/profile" color="#000000" />
        <Box
          sx={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            lineHeight: "1",
            color: "black",
          }}
        >
          {translate("qrCode")}
        </Box>
        <Box
          sx={{
            width: "80%",
            fontSize: "1.2rem",
            fontWeight: "light",
            color: "black",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          {translate("patientQrCodeDescritpion")}
        </Box>

        <Box
          sx={{
            marginTop: "4rem",
            marginBottom: "2rem",
          }}
        >
          {qrcode ? (
            <img
              src={qrcode}
              alt="QR Code"
              style={{ width: "200px", height: "200px" }}
            />
          ) : (
            <Box
              sx={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "red",
              }}
            >
              {translate("qrCodeNotFound")}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: "1",
            color: "black",
          }}
        >
          {translate("scanMe")}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
