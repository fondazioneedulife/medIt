import { Button, createTheme, ThemeProvider } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const SaveBtn: React.FC = () => {
  const { translate } = useLanguage();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          sx={{
            borderRadius: 3,
            width: "28rem",
            height: "4rem",
            backgroundColor: "#0B6BB2",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "semibold",
            textTransform: "capitalize",
            marginTop: "3rem",
            fontSize: "1.3rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          }}
        >
          {translate("save")}
        </Button>
      </ThemeProvider>
    </>
  );
};
