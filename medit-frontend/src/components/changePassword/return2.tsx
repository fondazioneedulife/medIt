import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

interface ReturnIconProps {
  path: string;
  color?: string;
}

export const ReturnIcon: React.FC<ReturnIconProps> = ({
  path,
  color = "inherit",
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(path);
  };

  return (
    <IconButton
      onClick={handleGoBack}
      sx={{
        position: "absolute",
        top: "2rem",
        left: "1rem",
        color: "#666666",
      }}
      disableRipple
    >
      <ArrowBackIosNewIcon sx={{ color: color }} />
    </IconButton>
  );
};
