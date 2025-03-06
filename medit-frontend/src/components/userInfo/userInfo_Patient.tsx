import { ListItem, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label2 } from "./label2";
import { ReturnIcon } from "../login/ReturnIcon";
import iconEdit from "../../assets/icon/edit.svg";
import iconPatient from "../../assets/icon/icon_patient.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";

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

export const UserInfoPatient: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <Box
      sx={{
        background: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
      <ListItem
        sx={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
          }}
        >
          <ReturnIcon path="#" color="black" />
        </Box>
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
          <Box
            sx={{
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              width: "21rem",
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
            patient
          </Box>
        </Box>
      </ListItem>
    </Box>
  );
};
