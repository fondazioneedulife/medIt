import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function SelectMedication() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControl sx={{ m: 1, minWidth: "190%" }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="">Every day</MenuItem>
            <MenuItem value={10}>Every week</MenuItem>
            <MenuItem value={20}>Every month</MenuItem>
            <MenuItem value={30}>Every year</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
