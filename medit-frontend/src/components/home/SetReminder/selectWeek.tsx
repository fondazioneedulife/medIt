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
        <FormControl sx={{ m: 1, minWidth: "70vw" }}>
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
            <MenuItem value="">Tachipirina</MenuItem>
            <MenuItem value={10}>Moment</MenuItem>
            <MenuItem value={20}>Brufen</MenuItem>
            <MenuItem value={30}>Aspirina</MenuItem>
            <MenuItem value={40}>Imodium</MenuItem>
            <MenuItem value={50}>Augmentin</MenuItem>
            <MenuItem value={60}>Xanax</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
