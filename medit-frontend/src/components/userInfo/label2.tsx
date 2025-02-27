import React, { useState, useEffect } from "react";
import { Box, ListItem, Snackbar, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

interface LabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  showHr?: boolean;
  style?: React.CSSProperties;
  iconshow?: boolean;
  type?: string;
}

export const Label2: React.FC<LabelProps> = ({
  img,
  placeholder,
  showHr = true,
  type = "text",
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(placeholder);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [hideIcons, setHideIcons] = useState(false);

  useEffect(() => {
    setHideIcons(isEditable);
  }, [isEditable]);

  const handleIconClick = () => {
    if (!isEditable) {
      setIsEditable(true);
      setHideIcons(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleConfirmClick = () => {
    if (value.trim() === "") {
      setSnackbarMessage(
        type === "text"
          ? "Inserisci un dato valido."
          : "Inserisci un dato valido."
      );
      setOpenSnackbar(true);
    } else if (type === "email" && !isEmail(value)) {
      setSnackbarMessage("Inserisci un'email valida.");
      setOpenSnackbar(true);
    } else if (type === "text" && !isNameOrSurname(value)) {
      setSnackbarMessage("Inserisci un nome o cognome valido.");
      setOpenSnackbar(true);
    } else {
      setIsEditable(false);
      setHideIcons(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isNameOrSurname = (value: string) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(value);
  };

  return (
    <>
      <ListItem
        alignItems="center"
        style={{
          justifyContent: "center",
        }}
      >
        {!hideIcons && (
          <img
            src={img}
            alt="User Icon"
            style={{
              paddingLeft: "5px",
              width: "2.2rem",
              cursor: isEditable ? "not-allowed" : "pointer",
              pointerEvents: isEditable ? "none" : "auto",
              display: isEditable ? "none" : "block",
            }}
            onClick={handleIconClick}
          />
        )}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, minWidth: "20rem", maxWidth: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={value}
            onChange={handleChange}
            variant="outlined"
            type={type}
            InputProps={{
              readOnly: !isEditable,
              style: {
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
                height: "1rem",
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
                  color: "black",
                },
              },
            }}
          />
        </Box>
        {isEditable && (
          <CheckIcon
            style={{
              cursor: "pointer",
              color: "black",
              marginLeft: "10px",
              fontSize: "1.8rem",
              fontWeight: "black",
            }}
            onClick={handleConfirmClick}
          />
        )}
      </ListItem>
      {showHr === true && (
        <hr style={{ borderColor: "rgba(98, 98, 98, 0.2)" }} />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
