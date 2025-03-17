import React from "react";
import { Box, createTheme, ListItem, ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";

interface LabelProps {
  inputName: string;
  placeholder: string;
  showHr?: boolean;
  style?: React.CSSProperties;
  iconshow?: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabelReminder: React.FC<LabelProps> = ({
  inputName,
  placeholder,
  showHr = true,
  type = "text",
  onChange,
}) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ListItem>
          <Box
            component="form"
            sx={{ "& > :not(style)": { width: "20rem" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              name={inputName}
              placeholder={placeholder}
              variant="outlined"
              type={type}
              onChange={onChange}
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
                    color: "black",
                  },
                },
              }}
            />
          </Box>
        </ListItem>
        {showHr === true && (
          <hr style={{ borderColor: "rgba(98, 98, 98, 0.2)" }} />
        )}
      </ThemeProvider>
    </>
  );
};
