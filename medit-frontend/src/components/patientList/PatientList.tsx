import { Box, Button, Typography, createTheme } from "@mui/material";
import React from "react";
import { ReturnIcon } from "../login/ReturnIcon";
import plusIcon from "../../assets/icon/plus.svg";
import patientImage from "../../assets/profile/example_patient_profile_image.svg";

export const PatientList: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
  return (
    <Box
      sx={{
        backgroundColor: "#F7F7F7",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        paddingTop: "7rem",
      }}
    >
      <ReturnIcon path="#" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mt: "1rem",
            ml: "1rem",
            mr: "1rem",
            fontSize: "3rem",
            fontWeight: "bold",
            lineHeight: "1",
            color: "black",
          }}
        >
          Patient List
        </Typography>
        <Typography
          variant="h4"
          marginTop={2}
          sx={{
            fontWeight: "light",
            fontSize: "1.8rem",
          }}
        >
          Select a profile patient <br /> or add one
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          mt: "1rem",
          flexWrap: "nowrap",
          [theme.breakpoints.down("md")]: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          },
        }}
      >
        <Box component="td" sx={{ height: "120px" }}>
          <Button
            variant="contained"
            sx={{
              width: "10rem",
              height: "10rem",
              borderRadius: "20px",
              backgroundColor: "white",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 0,
              backgroundImage: `url(${patientImage})`,
              backgroundSize: "125%",
              backgroundPosition: "center",
            }}
          ></Button>
          <Box
            component="td"
            sx={{
              height: "100%",
              marginTop: "-2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.3rem",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.5rem",
              },
            }}
          >
            Carlo Rossi
          </Box>
        </Box>
        <Box component="td" sx={{ height: "120px" }}>
          <Button
            variant="contained"
            sx={{
              width: "10rem",
              height: "10rem",
              borderRadius: "20px",
              backgroundColor: "white",
              color: "black",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: "regular",
              fontSize: "1.5rem",
            }}
          >
            <img
              src={plusIcon}
              alt="Add Icon"
              style={{ width: "6rem", height: "6rem" }}
            />
            <span>add</span>
          </Button>
          <Box
            component="td"
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
