import { Button, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconArrow from "../../assets/icon/icon_arrow.svg";

interface ReturnProps {
  to: string;
}

export const Return: React.FC<ReturnProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <ListItem sx={{ width: "100%", pb: "4rem", pt: "2rem" }}>
      <Button onClick={() => navigate(to)}>
        <img
          src={IconArrow}
          alt="User Icon"
          style={{ width: "1rem", cursor: "pointer" }}
        />
      </Button>
    </ListItem>
  );
};
