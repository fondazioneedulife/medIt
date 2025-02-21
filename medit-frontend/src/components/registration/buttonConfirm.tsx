import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const ConfirmRegistration: React.FC = () => {
  const { translate } = useLanguage();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          sx={{
            borderRadius: 3,
            width: "21rem",
            height: "5rem",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontWeight: "bold",
            textTransform: "capitalize",
            marginTop: "3rem",
            fontSize: "1.3rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          }}
        >
          {translate("confrim")}
        </Button>
      </ThemeProvider>
    </>
  );
};
