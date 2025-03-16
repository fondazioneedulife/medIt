import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getAllMedications } from "../../../database/indexedDB";

interface SelectMedicationProps {
  selectedMedication: string;
  onMedicationChange: (medicationId: string) => void;
}

const SelectMedication: React.FC<SelectMedicationProps> = ({
  selectedMedication,
  onMedicationChange,
}) => {
  const [medications, setMedications] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getAllMedications();
      setMedications(meds);
      if (meds.length > 0 && !selectedMedication) {
        onMedicationChange(meds[0].id.toString());
      }
    };

    fetchMedications();
  }, [selectedMedication]);

  const handleChange = (event: SelectChangeEvent) => {
    onMedicationChange(event.target.value as string);
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
            value={selectedMedication}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            {medications.map((med) => (
              <MenuItem key={med.id} value={med.id.toString()}>
                {med.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default SelectMedication;
