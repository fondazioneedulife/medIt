import { Button, createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

interface LoginButtonProps {
  text: string;
  width?: string;
  maxWidth?: string;
  to: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  text,
  width,
  maxWidth,
  to,
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          type="submit"
          component={Link}
          to={to}
          variant="contained"
          sx={{
            width: { width },
            maxWidth: { maxWidth },
            borderRadius: 2,
            backgroundColor: "white",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            fontWeight: "bold",
            fontSize: "1.2rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
            textTransform: "none", // Ensure text is not uppercase
          }}
        >
          {text}
        </Button>
      </ThemeProvider>
    </>
  );
};
