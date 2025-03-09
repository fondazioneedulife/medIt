import { Box, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLanguage } from "../../contexts/LanguageContext";
import { ReturnIcon } from "../login/ReturnIcon";
import { ChangePwLabel } from "./ChangePwLabel";
import iconKey from "../../assets/icon/icon-key.svg";
import LockPassword from "../../assets/icon/lock-password.svg";

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

export const ChangePw: React.FC = () => {
    const { translate } = useLanguage();

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "100vh",
                    width: "100vw",
                    background: "#F7F7F7",
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
                        marginTop: "6rem",
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        lineHeight: "1",
                        color: "black",
                        textTransform: "capitalize",
                        width: "80%",
                        [theme.breakpoints.up("lg")]: {
                            textAlign: "center"
                        },
                    }}
                >
                    {translate('changePassword')}
                </Box>
            
                <Box
                    sx={{
                        marginTop: "3rem",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "100%",
                        maxWidth: "20rem",
                        borderRadius: 5,
                        display: "inline-table",
                        backgroundColor: "rgb(255, 255, 255)",
                        padding: "1rem",
                        boxSizing: "border-box",
                    }}
                >
                    <ChangePwLabel
                        inputName="currentPassword"
                        img={LockPassword}
                        placeholder={translate('currentPassword')}
                    />
                    <ChangePwLabel
                        inputName="newPassword"
                        img={iconKey}
                        placeholder={translate('newPassword')}
                        type="password"
                    />
                    <ChangePwLabel
                        inputName="confirmNewPassword"
                        img={iconKey}
                        placeholder={translate('confirmNewPassword')}
                        showHr={false}
                        type="password"
                    />
                </Box>
                
                <Box
                    sx={{
                        marginTop: "4rem",
                        width: "80%",
                        maxWidth: "20rem",
                    }}
                >
                    <Button
                        sx={{
                            width: "100%",
                            height: "3rem",
                            backgroundColor: "#0B6BB2",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: 3,
                            textTransform: "none"
                        }}
                    >
                        <Typography variant="h6">
                            {translate('save')}
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
