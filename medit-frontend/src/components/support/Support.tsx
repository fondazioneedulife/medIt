import {
  Box,
  ListItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import iconEmail from "../../assets/icon/icon-email.svg";
import iconPhone from "../../assets/icon/icon-phone.svg";
import iconForm from "../../assets/icon/contact-form.svg";
import iconFaqs from "../../assets/icon/icon-faqs.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { ReturnIcon } from "../changePassword/return2";
import { SupportLabel } from "./SupportLabel";

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

export const Support: React.FC = () => {
  const { translate } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <ReturnIcon path="/profile" color="#666666" />
        <Box
          sx={{
            fontSize: isMobile ? "2.5rem" : "3.5rem",
            fontWeight: "bold",
            lineHeight: "1",
            color: "black",
            marginTop: "8rem",
          }}
        >
          {translate('support')}
        </Box>
        <Box
          sx={{
            height: "5rem",
          }}
        ></Box>
        <Box
          sx={{
            height: "10rem",
          }}
        ></Box>
        <Box
          sx={{
            borderRadius: 5,
            display: "inline-table",
            backgroundColor: "rgb(255, 255, 255)",
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
                <SupportLabel
                  inputName="phone"
                  img={iconPhone}
                  placeholder={translate("phone")}
                />
                <SupportLabel
                  inputName="email"
                  img={iconEmail}
                  placeholder={translate("email")}
                  showHr={false}
                />
              </div>
            </div>
          </ListItem>
        </Box>
        <Box
          sx={{
            height: "10rem",
          }}
        ></Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            width: isMobile ? "78%" : "27rem",
            backgroundColor: "rgb(255, 255, 255)",
            padding: "1rem",
            borderRadius: 5,
            boxShadow: "inset 4px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2.3rem",
              marginLeft: isMobile ? "0" : "1rem",
            }}
          >
            <img src={iconForm} alt="Form Icon" style={{ width: "2.3rem" }} />
            <Typography
              sx={{
                fontSize: "1.2rem",
                color: "#707070",
                fontWeight: "600",
              }}
            >
              {translate("contactForm")}
            </Typography>
          </Box>
          <TextField
            placeholder={translate("writeAMessage")}
            multiline
            rows={4}
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          ></TextField>
        </Box>

        <Box>
          <ListItem
            alignItems="center"
            style={{
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                height: "3rem",
              }}
            ></Box>
            <Box
              sx={{
                height: "6rem",
                backgroundColor: "#ffffff",
                borderRadius: 5,
                minWidth: isMobile ? "110%" : "20rem",
                width: isMobile ? "100%" : "28rem",
              }}
            >
              <div>
                <div>
                  <SupportLabel
                    inputName="faqs"
                    img={iconFaqs}
                    placeholder={translate("FAQs")}
                    showHr={false}
                    style={{ marginTop: "1.3rem" }}
                  />
                </div>
              </div>
            </Box>
          </ListItem>
        </Box>
        <Box
          sx={{
            height: "7rem",
          }}
        ></Box>
      </Box>
    </ThemeProvider>
  );
};
