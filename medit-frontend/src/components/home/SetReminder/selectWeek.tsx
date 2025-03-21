import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLanguage } from "../../../contexts/LanguageContext";

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

  const { translate } = useLanguage();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControl
          sx={{
            minWidth: {
              xs: "70vw",
              sm: "70vw",
              md: "26vw",
              lg: "27vw",
              xl: "18vw",
            },
          }}
        >
          <Select
            value={selectedFrequency}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            <MenuItem
              value="daily"
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              {translate("daily")}
            </MenuItem>
            <MenuItem
              value="weekly"
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              {translate("weekly")}
            </MenuItem>
            <MenuItem
              value="monthly"
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              {translate("monthly")}
            </MenuItem>
            <MenuItem
              value="yearly"
              sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
            >
              {translate("yearly")}
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectFrequency;
