import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface AddInfoProps {
  onNoteChange: (note: string) => void;
}

const AddInfo: React.FC<AddInfoProps> = ({ onNoteChange }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, Arial, sans-serif",
    },
  });

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNoteChange(event.target.value);
  };

  const { translate } = useLanguage();

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "20rem" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder={translate("addInformation")}
            variant="outlined"
            multiline
            rows={3}
            type="text"
            onChange={handleNoteChange}
            slotProps={{
              input: {
                style: {
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  height: "3rem",
                  fontSize: "1.2rem",
                  color: "black",
                  fontWeight: "600",
                  paddingTop: "3rem",
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
              [theme.breakpoints.down("sm")]: {
                "& .MuiInputBase-input": {
                  width: "100%",
                },
              },
            }}
          />
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AddInfo;
