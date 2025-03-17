import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

interface PatientRegistrationReturnIconProps {
  path: string;
  color?: string;
}

export const PatientRegistrationReturnIcon: React.FC<PatientRegistrationReturnIconProps> = ({
  path,
  color = "white",
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
        color: color,
        zIndex: 10,
      }}
      disableRipple
    >
      <ArrowBackIosNewIcon sx={{ color: color }} />
    </IconButton>
  );
};