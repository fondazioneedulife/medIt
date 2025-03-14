import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

interface ReturnIconProps {
  onClick: () => void;
}

export const ReturnIcon: React.FC<ReturnIconProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "2rem",
        left: "1rem",
      }}
      disableRipple
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};
