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
        <FormControl sx={{ m: 1, display: "flex", alignItems: "center" }}>
          <Select
            value={type}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              width: "100%",
              fontWeight: 600,
              fontSize: "1.2rem",
              minWidth: "100%",
            }}
          >
            <MenuItem
              value=""
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              Type
            </MenuItem>
            <MenuItem
              value={"capsule"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              Capsule
            </MenuItem>
            <MenuItem
              value={"tablet"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              Tablet
            </MenuItem>
            <MenuItem
              value={"syrup"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              Syrup
            </MenuItem>
            <MenuItem
              value={"injection"}
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              Injection
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectType;
