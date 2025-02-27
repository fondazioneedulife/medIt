import { Button } from "@mui/material";
import IconBell from "../../../assets/icon/Icon_bell.svg";

export const NotificationsButton: React.FC = () => {
  return (
    <Button
      sx={{
        width: "0.5rem",
        height: "3rem",
        backgroundColor: "white",
        borderRadius: 3,
        mr: 2,
      }}
    >
      <img src={IconBell} alt="" width={30} />
    </Button>
  );
};
