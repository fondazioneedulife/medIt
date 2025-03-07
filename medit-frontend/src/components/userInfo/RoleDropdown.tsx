import React, { useState } from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import V_Dropdown from "../../assets/icon/V_Dropdown.svg";

interface RoleDropdownProps {
  roles: string[];
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

export const RoleDropdown: React.FC<RoleDropdownProps> = ({
  selectedRole,
  onRoleSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (role: string) => {
    onRoleSelect(role);
    handleClose();
  };

  return (
    <>
      <Box>
        <Button
          aria-controls="role-menu"
          aria-haspopup="true"
          onClick={handleClick}
          endIcon={
            <img
              src={V_Dropdown}
              alt="Dropdown Icon"
              style={{
                transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            />
          }
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: "#000000",
            padding: "15px 30px",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "1.2rem",
            width: "23rem",
            justifyContent: "space-between",
            "&:hover": {
              backgroundColor: "#ffffff",
            },
          }}
        >
          {selectedRole}
        </Button>
        <Menu
          id="role-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: {
              width: "29rem",
            },
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick("Patient")}>
            Patient
          </MenuItem>

          <MenuItem onClick={() => handleMenuItemClick("Caregiver")}>
            Caregiver
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
