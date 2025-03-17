import { Box, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReturnIcon } from "../login/ReturnIcon";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLogin } from "../login/LoginContext";
import { getUserByUUID } from "../../database/indexedDB";

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

export const ScanQR: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { translate } = useLanguage();
  const { setUser } = useLogin();

  const handleScan = async (result: any) => {
    console.log("Scanned:", result);
    if (result && result[0] && result[0].rawValue) {
      const scanText = result[0].rawValue;
      setScanResult(scanText);

      try {
        const user = await getUserByUUID(scanText);
        if (user) {
          setUser(user);
          console.log("User logged in:", user);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "#242424",
        backgroundSize: "200% 120%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        boxSizing: "border-box",
        position: "relative",
        [theme.breakpoints.down("md")]: {
          "@media (orientation: landscape)": {
            height: "150vh",
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
          <Box
            sx={{
              fontSize: "4rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
              lineHeight: "1",
              color: "white",
            }}
          >
            {translate("scanQrCode")}
          </Box>
          <Box></Box>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "light",
              textAlign: "center",
              lineHeight: "1",
              color: "white",
              width: "90%",
            }}
          >
            {translate("scanQrCodeDescription")}
          </Box>

          <Box sx={{ height: "1vh" }}></Box>

          <Box
            sx={{
              width: "250px",
              height: "250px",
              backgroundColor: "#242424",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
              position: "relative",
            }}
          >
            {/* Scanner QR Code */}
            <Scanner
              onScan={(result) => handleScan(result)}
              onError={(error) => console.log("ON ERROR", error?.message)}
            />
          </Box>

          {scanResult && (
            <Box sx={{ color: "white", fontSize: "1rem", marginTop: "1rem" }}>
              Link:{" "}
              <a href={scanResult} style={{ color: "#00f" }}>
                {scanResult}
              </a>
            </Box>
          )}
        </Stack>
      </ThemeProvider>
    </Box>
  );
};
