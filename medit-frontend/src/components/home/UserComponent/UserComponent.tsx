import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import { NotificationsButton } from "../NotificationsButton/NotificationsButton";
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
        backgroundSize: "200% 120%",
        height: "10vh",
        position: "fixed",
        width: "100%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "0px 0px 8px 8px",
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontWeight: "bold",
            ml: 2,
          }}
        >
          Hi, Carla
        </Typography>
      </ThemeProvider>
      <NotificationsButton />
    </Box>
  );
};
