import React from "react";
import { Box, ListItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

interface LabelProps {
  inputName: string;
  placeholder: string;
  img: string;
  showHr?: boolean;
  style?: React.CSSProperties;
  iconshow?: boolean;
  type?: string;
}

export const Label: React.FC<LabelProps> = ({
  img,
  placeholder,
  showHr = true,
  type = "text",
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

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
          alt="User Icon"
          style={{ paddingRight: "20px", width: "2.2rem" }}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: isMobile ? "15rem" : "20rem" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            placeholder={placeholder}
            variant="outlined"
            type={type}
            InputProps={{
              style: {
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "200%",
                height: "1.5rem",
                fontSize: "1.2rem",
                color: "black",
                fontWeight: "600",
                textAlign: "left",
              },
            }}
            InputLabelProps={{
              style: {
                color: "black",
                textAlign: "left",
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
                  textAlign: "left",
                  paddingLeft: "10px",
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
