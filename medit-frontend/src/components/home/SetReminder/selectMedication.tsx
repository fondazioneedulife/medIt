import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  getAllMedications,
  getAllPatientsByCaregiverId,
} from "../../../database/indexedDB";
import { useLogin } from "../../login/LoginContext";

interface SelectMedicationProps {
  selectedMedication: string;
  onMedicationChange: (medicationId: string) => void;
}

const SelectMedication: React.FC<SelectMedicationProps> = ({
  selectedMedication,
  onMedicationChange,
}) => {
  const [medications, setMedications] = React.useState<any[]>([]);
  const { user } = useLogin();

  React.useEffect(() => {
    const fetchMedications = async () => {
      const meds = await getAllMedications();
      if (user) {
        const userIds = [user.id];
        if (user.role === "caregiver") {
          const patients = await getAllPatientsByCaregiverId(user.id as number);
          userIds.push(...patients.map((patient) => patient.id));
        }
        const filteredMeds = meds.filter((med) => userIds.includes(med.userId));
        setMedications(filteredMeds);
        if (filteredMeds.length > 0 && !selectedMedication) {
          onMedicationChange(filteredMeds[0].id.toString());
        }
      }
    };

    fetchMedications();
  }, [selectedMedication, user]);

  const handleChange = (event: SelectChangeEvent) => {
    onMedicationChange(event.target.value);
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
