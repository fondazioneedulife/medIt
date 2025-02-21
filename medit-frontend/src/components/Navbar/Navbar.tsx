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

export const Navbar: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "sticky",
      }}
    >
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
          position: "relative", // Aggiungi questa riga
          boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            pt: "0,5rem",
            // color: "#A2A2A2",
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
            tabIndex={0} // Rende il contenitore focalizzabile
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
              position: "absolute", // Aggiungi questa riga
              transform: "translateY(-60%)", // Aggiungi questa riga per centrarlo verticalmente
            }}
          >
            <Box
              component="img"
              src={IconPlus}
              alt="Profile Icon"
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
            tabIndex={0} // Rende il contenitore focalizzabile
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
    </Box>
  );
};
