import { Box } from "@mui/material";

export const MedicineComponent: React.FC = () => {
  return (
    <Box
      sx={{
        width: "80vh",
        height: "30vh",
        backgroundColor: "white",
        borderRadius: "30px",
        display: "flex",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "35%",
          height: "100%",
          backgroundColor: "lightgrey",
          borderRadius: "25px",
        }}
      ></Box>
      <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
        <Box sx={{ color: "black" }}>Medicine</Box>
        <Box sx={{ color: "black" }}>Capsule, 100mg</Box>
        <Box sx={{ color: "black" }}>Daily, 1 times a day</Box>
        <Box
          sx={{
            backgroundColor: "blue",
            color: "white",
            width: "50%",
            height: "10%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          9:00 am
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            backgroundColor: "green",
            width: "5vh",
            height: "5vh",
            borderRadius: "80px",
          }}
        >
          ciao
        </Box>
        <Box
          sx={{
            backgroundColor: "green",
            width: "5vh",
            height: "5vh",
            borderRadius: "80px",
          }}
        >
          ciao
        </Box>
      </Box>
    </Box>
  );
};
