import { Button, createTheme, ListItem, Typography } from "@mui/material";
import iconCaregiver from "../../assets/icon/icon_caregiver.svg";
import iconPatient from "../../assets/icon/icon_patient.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const ChooseButton: React.FC = () => {
  return (
    <>
      <ListItem
        style={{
          justifyContent: "center",
          width: "100%",
          gap: "1rem",
        }}
      >
        <Button
          sx={{
            borderRadius: 3,
            width: "30rem",
            height: "20rem",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column", // Imposta la direzione del flex su colonna
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          }}
        >
          <img src={iconCaregiver} alt="iconCaregiver" />
          <Typography
            variant="h3"
            component="h3"
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              textTransform: "capitalize",
            }}
          >
            Caregiver
          </Typography>
        </Button>
        <Button
          sx={{
            borderRadius: 3,
            width: "20rem",
            height: "20rem",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column", // Imposta la direzione del flex su colonna
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            cursor: "pointer",
          }}
        >
          <img src={iconPatient} alt="iconPatient" />
          <Typography
            variant="h3"
            component="h3"
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              textTransform: "capitalize",
            }}
          >
            Patient
          </Typography>
        </Button>
      </ListItem>
    </>
  );
};
