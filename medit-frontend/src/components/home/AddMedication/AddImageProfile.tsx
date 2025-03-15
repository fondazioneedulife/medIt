import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

export default function InputFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        mr: 1,
        mt: 2,
        mb: 8.5,
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
      Add profile image
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}
