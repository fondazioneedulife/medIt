import React from "react";
import { Box, ListItem } from "@mui/material";
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

export const LabelSupport: React.FC<LabelProps> = ({
  img,
  placeholder,
  showHr = true,
  style,
  iconshow = true,
}) => {
  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <>
      <ListItem
        alignItems="center"
        style={{
          justifyContent: "center",
          ...style,
        }}
      >
        {iconshow && (
          <img
            src={img}
            alt="User Icon"
            style={{ paddingRight: "20px", width: "2.2rem" }}
          />
        )}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: isMobile ? "14rem" : "20rem" },
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              backgroundColor: "transparent",
              width: "100%",
              height: "1.5rem",
              fontSize: "1.2rem",
              color: "black",
              fontWeight: "600",
              textAlign: "left",
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {placeholder}
          </Box>
        </Box>
      </ListItem>
      {showHr && <hr style={{ borderColor: "rgba(98, 98, 98, 0.2)" }} />}
    </>
  );
};
