import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SelectComponentProps {
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
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
  );
};

export default SelectComponent;
