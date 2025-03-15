import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={unit}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <MenuItem value="">
            <em>%</em>
          </MenuItem>
          <MenuItem value={"mg"}>mg</MenuItem>
          <MenuItem value={"g"}>g</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectComponent;
