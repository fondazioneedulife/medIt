import { Box, Button, ListItem } from "@mui/material";
import IconArrow from "../../assets/icon/icon_arrow.svg";

export const Return: React.FC = () => {
  return (
    <>
      <ListItem sx={{ width: "100%", pb: "4rem", pt: "2rem" }}>
        <Button>
          <Box
            component="img"
            src={IconArrow}
            alt="User Icon"
            style={{ width: "1rem", cursor: "pointer" }}
          />
        </Button>
      </ListItem>
    </>
  );
};
