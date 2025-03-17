import {
  Box,
  Button,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useLanguage } from "../../../contexts/LanguageContext";
import IconFilter from "../../../assets/icon/Icon_filter.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const FilterButton: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 207,
        left: 0,
        width: "100vw",
        backgroundColor: "white",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
        borderRadius: "0px 0px 8px 8px",
        height: 65,
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontWeight: "bold",
            ml: 2,
            fontSize: "1.6rem",
          }}
        >
          {translate("Reminders")}
        </Typography>
      </ThemeProvider>

      <Box
        sx={{
          display: "flex",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.10)",
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
              {translate("filter")}
            </Typography>
          </ThemeProvider>
        </Button>
      </Box>
    </Box>
  );
};
