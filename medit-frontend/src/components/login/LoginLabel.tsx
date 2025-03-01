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
    <>
      <ListItem
        alignItems="center"
        style={{
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt="Icon"
          style={{ paddingRight: "20px", width: "2.2rem" }}
        />
        <Box
          component="div"
          sx={{ "& > :not(style)": { m: 1, width: "13rem" } }}
        >
          <TextField
            name={inputName}
            placeholder={placeholder}
            variant="outlined"
            type={type}
            onChange={onChange}
            InputProps={{
              style: {
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                height: "3rem",
                fontSize: "1.2rem",
                color: "black",
                fontWeight: "600",
              },
            }}
            InputLabelProps={{
              style: {
                color: "black",
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
