import React from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

interface SelectProps {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          borderRadius: 3,
          width: "23rem",
          height: "3.5rem",
          backgroundColor: "white",
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          fontWeight: "bold",
          marginTop: "3rem",
          fontSize: "1.3rem",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};
