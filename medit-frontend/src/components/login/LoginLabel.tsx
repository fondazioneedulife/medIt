import React from "react";
import { Box, ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";

interface LoginLabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  showHr?: boolean;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const LoginLabel: React.FC<LoginLabelProps> = ({
  inputName,
  img,
  placeholder,
  showHr = true,
  type = "text",
  onChange,
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
