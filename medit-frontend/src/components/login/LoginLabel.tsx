import React from "react";
import { Box, Stack, TextField } from "@mui/material";

interface LabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  showHr?: boolean;
  style?: React.CSSProperties;
  iconshow?: boolean;
  type?: string;
}

export const LoginLabel: React.FC<LabelProps> = ({
  img,
  placeholder,
  showHr = true,
  type = "text",
}) => {
  return (
    <Box 
      sx={{ 
        width: "100%"
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
      >
          <img
            src={img}
            alt="icon"
            style={{
                height: "1.5rem",
                width: "1.5rem"
            }}
          />
          <TextField
            fullWidth
            placeholder={placeholder}
            type={type}
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
      </Stack>
      {showHr && <hr style={{
        width: "100%",
        marginTop: "0.5rem",
        color: "#7C7C7C",
        backgroundColor: "#7C7C7C",
        border: "none",
        height: "1px"
      }} />}
    </Box>
  );
};