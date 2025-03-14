import React from "react";
import {
  createTheme,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";

interface SelectComponentProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

const SelectComponent: React.FC<SelectComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControl
        variant="outlined"
        sx={{
          m: 1,
          minWidth: 120,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="Capsule">Capsule</MenuItem>
          <MenuItem value="Tablet">Tablet</MenuItem>
          <MenuItem value="Syrup">Syrup</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default SelectComponent;
