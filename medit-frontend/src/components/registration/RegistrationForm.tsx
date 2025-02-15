import { Box, ListItem, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Label } from "./label";

// Crea un tema personalizzato con il font Montserrat
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  palette: {
    primary: {
      main: grey[50],
    },
  },
});

export const Registration: React.FC = () => {
  return (
    <body
      style={{ background: "linear-gradient(to right, #1412c6ff, #00ca9bff" }}
    >
      <ListItem
        alignItems="center"
        style={{ justifyContent: "center", flexDirection: "column" }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            style={{ fontWeight: "bold" }}
          >
            Registration
          </Typography>
        </ThemeProvider>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: 1,
            bgcolor: theme.palette.primary.main,
            "&:hover": {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          <Label />
        </Box>
      </ListItem>
    </body>
  );
};
