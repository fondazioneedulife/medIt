import { Box, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const UserComponent: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(45deg, #00ca9bff, #1412c6ff)",
        height: "10vh",
        position: "fixed",
        width: "100%",
        color: "white",
      }}
    >
      <ThemeProvider theme={theme}>ciao</ThemeProvider>
    </Box>
  );
};
