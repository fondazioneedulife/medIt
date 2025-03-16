import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface SelectTypeProps {
  type: string;
  onTypeChange: (type: string) => void;
}

const SelectType: React.FC<SelectTypeProps> = ({ type, onTypeChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onTypeChange(event.target.value as string);
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
            value={type}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="">Type</MenuItem>
            <MenuItem value={"capsule"}>Capsule</MenuItem>
            <MenuItem value={"tablet"}>Tablet</MenuItem>
            <MenuItem value={"syrup"}>Syrup</MenuItem>
            <MenuItem value={"injection"}>Injection</MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectType;
