import { ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Return } from "../registration/return";
import { ChooseButton } from "./chooseButton";

// Crea un tema personalizzato con il font Montserrat
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

interface ReturnProps {
  style?: React.CSSProperties;
}

export const ChooseRole: React.FC<ReturnProps> = ({ style }) => {
  return (
    <>
      <body
        style={{
          background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
          backgroundSize: "200% 120%", // Estende il gradiente
        }}
      >
        <ListItem
          style={{
            // justifyContent: "center",
            flexDirection: "column",
            height: "100vh",
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
                Registration
              </Typography>
              <Typography
                variant="h3"
                component="h3"
                style={{
                  fontWeight: "regular",
                  fontSize: "2rem",
                }}
              >
                Who are you?
              </Typography>
            </ThemeProvider>
            <ListItem
              alignItems="center"
              style={{
                justifyContent: "center",
                flexDirection: "column",
              }}
            ></ListItem>
            <ChooseButton />
          </div>
        </ListItem>
      </body>
    </>
  );
};
