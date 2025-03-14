import { ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserInfoLabel } from "./UserInfoLabel";
import { ReturnIcon } from "../login/ReturnIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { RoleDropdown } from "./RoleDropdown";
import { useState } from "react";
import { useLogin } from "../login/LoginContext";
import iconEdit from "../../assets/icon/edit.svg";
import iconPatient from "../../assets/icon/icon_patient.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const UserInformations: React.FC = () => {
  const { translate } = useLanguage();
  const roles = ["Patient", "Caregiver"];
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const { user } = useLogin();

  return (
    <Box
      sx={{
        background: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "6rem",
        width: "100%",
        overflowX: "hidden",
        height: "100vh",
        [theme.breakpoints.down("md")]: {
          "@media (orientation: landscape)": {
            height: "175vh",
          },
        },
      }}
    >
      <ReturnIcon path="/profile" color="black" />
      <ListItem
        sx={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: "bold",
              paddingBottom: "2rem",
              fontSize: "2rem",
              color: "#000000",
              textTransform: "capitalize",
              textAlign: "center",
              width: "90%",
            }}
          >
            {translate("userInfo")}
          </Typography>
        </ThemeProvider>

        <Box
          sx={{
            borderRadius: 5,
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
                <UserInfoLabel
                  inputName="name"
                  img={iconEdit}
                  placeholder={translate("firstName")}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
                <UserInfoLabel
                  inputName="surname"
                  img={iconEdit}
                  placeholder={translate("lastName")}
                  style={{
                    color: "black",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
                <UserInfoLabel
                  inputName="email"
                  img={iconEdit}
                  placeholder={translate("email")}
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          [theme.breakpoints.down("md")]: {
            "@media (orientation: landscape)": {
              width: "35%",
            },
          },
        }}
      >
        {user?.role == "caregiver" ? (
          <RoleDropdown
            roles={roles}
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
            sx={{
              "& .MuiSelect-select": {
                textAlign: "left",
              },
            }}
          />
        ) : (
          <Box
            sx={{
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "20rem",
              justifyContent: "flex-start",
              padding: "0.5rem 1rem",
              height: "3rem",
              fontSize: "1.2rem",
              color: "black",
              fontWeight: "600",
              fontFamily: "Montserrat, Arial",
            }}
          >
            <img
              src={iconPatient}
              alt="patient icon"
              style={{ width: "3rem", marginRight: "0.5rem" }}
            />
            {translate("patient")}
          </Box>
        )}
      </Box>
    </Box>
  );
};
