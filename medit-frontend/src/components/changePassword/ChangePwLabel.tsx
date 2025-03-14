import React from "react";
import { Box, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

interface ChangePwLabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  showHr?: boolean;
  type?: string;
  value?: string;
}

export const ChangePwLabel: React.FC<ChangePwLabelProps> = ({
  inputName,
  img,
  placeholder,
  showHr = true,
  type = "text",
  value,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <img
          src={img}
          alt="icon"
          style={{
            height: "1.5rem",
            width: "1.5rem",
          }}
        />
        <TextField
          fullWidth
          placeholder={placeholder}
          type={type}
          variant="standard"
          InputProps={{disableUnderline: true }}
          value={value}
          name={inputName}
        />
      </Stack>
      {showHr && (
        <hr
          style={{
            width: "100%",
            marginTop: "0.5rem",
            color: "#C8C8C8",
            backgroundColor: "#C8C8C8",
            border: "none",
            height: "1px",
          }}
        />
      )}
    </Box>
  );
};
