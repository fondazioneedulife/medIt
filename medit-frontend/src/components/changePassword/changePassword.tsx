import { Box, ListItem, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Label } from "./labell";
import iconKey from "../../assets/icon/icon-key.svg";
import LockPassword from "../../assets/icon/lock-password.svg";
import { Select } from "../login/buttons";
import { useLanguage } from "../../contexts/LanguageContext";
import { ReturnIcon } from "./return2";
import { SaveBtn } from "./saveBtn"; // Importa il nuovo componente

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

export const ChangePWD: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "#F7F7F7",
          backgroundSize: "200% 120%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          [theme.breakpoints.down("md")]: {
            "@media (orientation: landscape)": {
              height: "175vh",
            },
          },
        }}
      >
        <ReturnIcon path="#" color="#666666" />
        <Box
          sx={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            lineHeight: "1",
            color: "black",
          }}
        >
          Change <br /> Password
        </Box>
        <Box
          sx={{
            height: "7rem",
          }}
        ></Box>
        <Box
          sx={{
            borderRadius: 5,
            display: "inline-table",
            backgroundColor: "rgb(255, 255, 255)",
            width: "100%",
            maxWidth: "21rem",
          }}
        >
          <ListItem
            alignItems="center"
            style={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <div>
                <Label
                  inputName="currentPassword"
                  img={LockPassword}
                  placeholder={"current password"}
                />
                <Label
                  inputName="NewPassword"
                  img={iconKey}
                  placeholder={"new password"}
                />
                <Label
                  inputName="confirmNewPassword"
                  img={iconKey}
                  placeholder={"confirm new password"}
                  showHr={false}
                />
              </div>
            </div>
          </ListItem>
        </Box>
        <SaveBtn>{translate("save")}</SaveBtn>
      </Box>
    </ThemeProvider>
  );
};
