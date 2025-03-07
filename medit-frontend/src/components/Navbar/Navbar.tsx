import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import HomeIcon from "../../assets/icon/icon_home.svg";
import ProfileIcon from "../../assets/icon/Icon_user.svg";
import IconPlus from "../../assets/icon/Icon_plus.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const Navbar: React.FC<{ onAddDetailsClick: () => void }> = ({
  onAddDetailsClick,
}) => {
  return (
    <Box
      sx={{
        height: "11vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        margin: 0,
        padding: 0,
        position: "fixed",
        bottom: 0,
        zIndex: 1000, // Imposta un z-index alto per la navbar
        boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          pt: "0.5rem",
        }}
      >
        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            color: "transparent",
            textTransform: "capitalize",
            ":focus": {
              color: "black",
              outline: "none",
            },
          }}
          tabIndex={0}
        >
          <Box
            component="img"
            src={HomeIcon}
            alt="Home Icon"
            sx={{
              width: "2.5rem",
              pt: "1rem",
            }}
          />
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "medium", fontSize: "1rem" }}
            >
              Home
            </Typography>
          </ThemeProvider>
        </Button>

        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            bgcolor: "#0B6BB2",
            width: "70px",
            height: "70px",
            borderRadius: "12px",
            justifyContent: "space-around",
            position: "relative",
            transform: "translateY(-60%)",
          }}
        >
          <Box
            component="img"
            src={IconPlus}
            alt="Profile Icon"
            onClick={onAddDetailsClick}
            sx={{
              width: "3rem",
            }}
          ></Box>
        </Button>

        <Button
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            color: "transparent",
            textTransform: "capitalize",
            ":focus": {
              color: "black",
              outline: "none",
            },
          }}
          tabIndex={0}
        >
          <Box
            component="img"
            src={ProfileIcon}
            alt="Profile Icon"
            sx={{
              width: "2.5rem",
              pt: "1rem",
            }}
          />
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "medium", fontSize: "1rem" }}
            >
              Profile
            </Typography>
          </ThemeProvider>
        </Button>
      </Box>
    </Box>
  );
};
