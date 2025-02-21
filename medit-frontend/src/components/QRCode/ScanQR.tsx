import { Box, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReturnIcon } from "../login/ReturnIcon";
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

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
            height: "175vh",
          },
        },
      }}
    >
      <ReturnIcon path="/login/chose" />
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
            }}
          >
            Scan QR
          </Box>
          <Box></Box>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "light",
              textAlign: "center",
              marginBottom: "2rem",
              lineHeight: "1",
            }}
          >
            Scan the patient's <br /> QR for access
          </Box>

          <Box sx={{ height: "8vh" }}></Box>

          <Box
            sx={{
              width: "200px",
              height: "200px",
              backgroundColor: "#242424",
              border: "5px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
              position: "relative",
            }}
          >
            {/* Scanner QR Code */}
            <Scanner
              onScan={(result) => {
                if (result) {
                  const scanText =
                    typeof result === "string" ? result : result.text;
                  setScanResult(scanText); // Imposta il risultato della scansione
                  console.log("ON SCAN", result[0]);
                }
              }}
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

          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              height: "4.5rem",
              justifyContent: "center",
            }}
          ></Stack>
        </Stack>
      </ThemeProvider>
    </Box>
  );
};
