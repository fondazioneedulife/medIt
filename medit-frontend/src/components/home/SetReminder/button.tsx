import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import IconPlus from "../../../assets/icon/PlusAddMedication.svg";

interface ButtonSaveProps {
  buttonText?: string;
  onClick?: () => void;
}

export const ButtonAddMedication: React.FC<ButtonSaveProps> = ({
  buttonText = "Next",
  onClick,
}) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{
          borderRadius: 3,
          width: { xs: "50%", sm: "30%", md: "22%", lg: "20%", xl: "15%" },
          height: "2rem",
          backgroundColor: "#0B6BB2",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          mt: 1,
          mb: 3,
          fontWeight: "600",
          textTransform: "initial",
          fontSize: "1.1rem",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Box component="img" src={IconPlus} sx={{ mr: 1 }}></Box>
        {buttonText}
      </Button>
    </ThemeProvider>
  );
};
