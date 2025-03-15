import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface SelectFrequencyProps {
  selectedFrequency: string;
  onFrequencyChange: (frequency: string) => void;
}

const SelectFrequency: React.FC<SelectFrequencyProps> = ({
  selectedFrequency,
  onFrequencyChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onFrequencyChange(event.target.value);
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
            value={selectedFrequency}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="day">Every day</MenuItem>
            <MenuItem value="week">Every week</MenuItem>
            <MenuItem value="month">Every month</MenuItem>
            <MenuItem value="year">Every year</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectFrequency;
