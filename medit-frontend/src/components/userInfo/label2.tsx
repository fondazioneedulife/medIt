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
      setSnackbarMessage("Inserisci un dato valido.");
      setOpenSnackbar(true);
    } else {
      setIsEditable(false);
      setHideIcons(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <ListItem alignItems="center" style={{ justifyContent: "center" }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minWidth: "10rem",
            maxWidth: "20rem",
            width: "100%",
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
                fontSize: "1.2rem",
                color: "black",
                fontWeight: "600",
                textAlign: "left",
              },
            }}
            InputLabelProps={{ style: { color: "black" } }}
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "transparent" },
                "& input": { color: "black", textAlign: "left" },
                "& .MuiInputBase-input": { textAlign: "left" },
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              minWidth: "3rem",
              marginLeft: "10px",
            }}
          >
            {!hideIcons && (
              <img
                src={img}
                alt="User Icon"
                style={{
                  width: "2rem",
                  height: "2rem",
                  cursor: isEditable ? "not-allowed" : "pointer",
                  pointerEvents: isEditable ? "none" : "auto",
                  display: isEditable ? "none" : "block",
                }}
                onClick={handleIconClick}
              />
            )}
            {isEditable && (
              <CheckIcon
                style={{
                  cursor: "pointer",
                  color: "black",
                  marginLeft: "10px",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
                onClick={handleConfirmClick}
              />
            )}
          </Box>
        </Box>
      </ListItem>
      {showHr && <hr style={{ borderColor: "rgba(98, 98, 98, 0.2)" }} />}
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
