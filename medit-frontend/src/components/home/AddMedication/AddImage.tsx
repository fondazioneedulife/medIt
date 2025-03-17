import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLanguage } from "../../../contexts/LanguageContext";
import React from "react";

interface InputFileUploadProps {
  onUpload: (image: string) => void;
}
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});


const InputFileUpload: React.FC<InputFileUploadProps> = ({ onUpload }) => {
  const { translate } = useLanguage();

  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        bgcolor: "white",
        boxShadow: "none",
        borderRadius: 3,
        outline: "black",
        textTransform: "initial",
        p: "1rem",
        width: { xs: "50%", md: "30%", lg: "30%", xl: "20%" },
        gap: 1,
      }}
    >
      {translate("addImage")}
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                onUpload(e.target.result as string);
              }
            };
            reader.readAsDataURL(event.target.files[0]);
          }
        }}
      />
    </Button>
  );
};

export default InputFileUpload;
