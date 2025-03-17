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
            fullWidth
            value={selectedMedication}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
            disabled={medications.length === 0}
          >
            {medications.map((med) => (
              <MenuItem
                sx={{ fontWeight: 600, color: "grey", fontSize: "1.2rem" }}
                key={med.id}
                value={med.id.toString()}
              >
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
