import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import IconFilter from "../../../assets/icon/Icon_filter.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const FilterButton: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 30,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: "bold",
            ml: 2,
            fontSize: "1.4rem",
          }}
        >
          Todays Medications
        </Typography>
      </ThemeProvider>
      <Box
        sx={{
          display: "flex",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 3,
          aligItems: "center",
          justifyContent: "center",
          width: "110px",
          mr: 2,
        }}
      >
        <img src={IconFilter} alt="" width={25} />
        <Button
          sx={{
            textTransform: "capitalize",
            color: "black",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                fontWeight: "medium",
              }}
            >
              Filter
            </Typography>
          </ThemeProvider>
        </Button>
      </Box>
    </Box>
  );
};
