import React from "react";
import { Box, ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";

interface LabelProps {
  inputName: string;
  placeholder: string;
  showHr?: boolean;
  style?: React.CSSProperties;
  iconshow?: boolean;
  type?: string;
}

export const LabelReminder: React.FC<LabelProps> = ({
  placeholder,
  showHr = true,
  type = "text",
}) => {
  return (
    <>
      <ListItem>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "20rem" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder={placeholder}
            variant="outlined"
            type={type}
            slotProps={{
              input: {
                style: {
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "60%",
                  height: "3rem",
                  fontSize: "1.2rem",
                  color: "black",
                  fontWeight: "600",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
                "& input": {
                  color: "black", // Assicurati che il colore del testo sia nero
                },
              },
            }}
          />
        </Box>
      </ListItem>
      {showHr === true && (
        <hr style={{ borderColor: "rgba(98, 98, 98, 0.2)" }} />
      )}
    </>
  );
};
