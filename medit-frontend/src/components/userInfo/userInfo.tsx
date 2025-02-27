import { ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label2 } from "./label2";
import { ReturnIcon } from "../login/ReturnIcon";
import iconEdit from "../../assets/icon/edit.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { RoleDropdown } from "./RoleDropdown";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const UserInfo: React.FC = () => {
  const { translate } = useLanguage();
  const roles = ["Patient", "Caregiver"];
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  return (
    <Box
      sx={{
        background: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ListItem
        sx={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ReturnIcon path="#" /> {/* TODO: adding ReturnIcon's color (black) */}
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              paddingBottom: "4rem",
              fontSize: "2.5rem",
              color: "#000000",
            }}
          >
            {translate("User information")}
          </Typography>
        </ThemeProvider>
        <Box
          sx={{
            borderRadius: 5,
            boxShadow: "inset 4px 4px 6px rgba(0, 0, 0, 0.25)",
            display: "inline-table",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            width: "21rem",
            "&:focus, &:focus-visible": {
              outline: "none",
            },
            padding: "1rem",
          }}
        >
          <ListItem
            alignItems="center"
            sx={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box>
              <Box>
                <Label2
                  inputName="name"
                  img={iconEdit}
                  placeholder={"Name"}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
                <Label2
                  inputName="surname"
                  img={iconEdit}
                  placeholder={"Surname"}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
                <Label2
                  inputName="email"
                  img={iconEdit}
                  placeholder={translate("Email")}
                  showHr={false}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
              </Box>
            </Box>
          </ListItem>
        </Box>
      </ListItem>

      <ListItem
        alignItems="center"
        sx={{
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "2rem",
        }}
      >
        <Box>
          <Box>
            <RoleDropdown
              roles={roles}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
          </Box>
        </Box>
      </ListItem>
    </Box>
  );
};
