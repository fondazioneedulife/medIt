import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";

interface SelectComponentProps {
  unit: string;
  onUnitChange: (unit: string) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  unit,
  onUnitChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onUnitChange(event.target.value as string);
  };

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControl sx={{ m: 1, display: "flex" }}>
          <Select
            value={unit}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              fontWeight: 600,
              fontSize: "1.2rem",
              width: "100%",
            }}
          >
            <MenuItem
              value=""
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              %
            </MenuItem>
            <MenuItem
              value={"mg"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              mg
            </MenuItem>
            <MenuItem
              value={"g"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              g
            </MenuItem>
            <MenuItem
              value={"ml"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              ml
            </MenuItem>
            <MenuItem
              value={"ml"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              cl
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectComponent;
