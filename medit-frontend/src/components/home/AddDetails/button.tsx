import { Button } from "@mui/material";

interface ButtonSaveProps {
  buttonText?: string;
  onClick?: () => void;
}

export const ButtonSave: React.FC<ButtonSaveProps> = ({
  buttonText = "Next",
  onClick,
}) => {
  return (
    <Button
      sx={{
        borderRadius: 3,
        width: { xs: "70%", md: "30%", lg: "30%", xl: "20%" },
        height: "5rem",
        backgroundColor: "#0B6BB2",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: "7rem",
        fontSize: "1.3rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};
