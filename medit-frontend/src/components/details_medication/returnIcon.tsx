import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

interface ReturnIconProps {
  path: string;
}

export const ReturnIcon: React.FC<ReturnIconProps> = ({ path }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <IconButton
      onClick={handleGoBack}
      sx={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        color: "black",
      }}
      disableRipple // Disable the ripple effect
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};
