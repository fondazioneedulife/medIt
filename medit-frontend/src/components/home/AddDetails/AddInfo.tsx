import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function AddInfo() {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "20rem" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder="Add information..."
            variant="outlined"
            multiline
            rows={3}
            type="text"
            slotProps={{
              input: {
                style: {
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  height: "3rem",
                  fontSize: "1.2rem",
                  color: "black",
                  fontWeight: "650",
                  paddingLeft: "2rem",
                  paddingTop: "3rem",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
                "& input": {
                  color: "black",
                },
              },
              [theme.breakpoints.down("sm")]: {
                "& .MuiInputBase-input": {
                  width: "100%",
                },
              },
            }}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
}
