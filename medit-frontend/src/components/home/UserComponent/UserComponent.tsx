import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
// import { NotificationsButton } from "../NotificationsButton/NotificationsButton";
import { useLogin } from "../../login/LoginContext";
import { useLanguage } from "../../../contexts/LanguageContext";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const UserComponent: React.FC = () => {

  const {user} = useLogin();
  const { translate } = useLanguage();

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
            textTransform: "capitalize"
          }}
        >
          {translate('hi')}, {user?.firstName}
        </Typography>
      </ThemeProvider>

      
      <Box
        sx={{
            backgroundColor: user?.role == 'caregiver' ? "#FF0000" : "#00259D",
            color: "white",
            borderRadius: "0.75rem",
            padding: "0.4rem 0.6rem",
            fontWeight: "bold",
            fontSize: "1.25rem",
            mr: 2
        }}
      >
        {translate(user?.role == 'caregiver' ? 'caregiver' : 'patient').toLocaleLowerCase()}
      </Box>
      
      {/* <NotificationsButton /> */}
    </Box>
  );
};
