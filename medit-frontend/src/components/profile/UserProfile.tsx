import { Navbar } from '../Navbar/Navbar';
import { Box, Typography, Button, Stack } from '@mui/material';
import { ReturnIcon } from '../login/ReturnIcon';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ExampleUserProfile from "../../assets/profile/example_patient_profile_image.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router';
import { ProfileEntry } from './ProfileEntry';
import userInfo from "../../assets/profile/user_information.svg";
import supportIcon from "../../assets/profile/support_icon.svg";
import settingsIcon from "../../assets/profile/settings_icon.svg";
import patientListIcon from "../../assets/profile/patient_list_icon.svg";
import logoutIcon from "../../assets/profile/logoutIcon.svg"

export const UserProfile: React.FC = () => {
    
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

    const { translate } = useLanguage();

    const navigate = useNavigate();

    const qrCodeHandleClick = () => {
        // TODO: correct right patient qr code route
        navigate("/login");
    };

    const patientListHandleClick = () => {
        // TODO: correct right patient qr code route
        navigate("/login");
    };

    return(
        <>
            <Navbar />
            <Box
                sx={{
                    height: "89vh",  /* navbar height is 11vh */
                    width: "100vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f7f7f7",
                    [theme.breakpoints.up('lg')]: {
                        height: "140vh",
                    },
                }} 
            >
                <ReturnIcon path="/home" color="black"/>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            width: "80%",
                            maxWidth: "20rem",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            [theme.breakpoints.up('lg')]: {
                                marginTop: "-10rem",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                marginTop: "2rem",
                                marginBottom: "2rem"
                            }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ fontWeight: "bold"}}
                            >
                                {translate('profile')}
                            </Typography>
                            {/* if user role is patient, qr code is visible */}
                            <Button
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderRadius: "1rem",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    maxWidth: "3rem",
                                    height: "4rem",
                                }}
                                fullWidth
                                variant="contained"
                                onClick={qrCodeHandleClick}
                            >
                                <QrCodeIcon sx={{ fontSize: "2rem" }} />
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display:"flex",
                                alignItems:"center",
                                backgroundColor: "white",
                                borderRadius: "1rem"
                            }}
                        >
                            <img
                                src={ExampleUserProfile}
                                alt="user profile img"
                                style={{ width: "30%", padding: "0.5rem"}}
                            />
                            <Box ml={2}>
                                <Typography variant="h6">Username</Typography>
                                <Box
                                    sx={{
                                        backgroundColor: "#00259D", /* if user role is patiente */
                                        // backgroundColor: "#FF0000", /* if user role is caregiver */
                                        color: "white",
                                        borderRadius: "12px",
                                        padding: "2px 8px",
                                    }}
                                >
                                    {/* if user role is patient */}
                                    {translate('patient').toLocaleLowerCase()}
                                    {/* if user role is caregiver */}
                                    {/* {translate('caregiver').toLocaleLowerCase()} */}
                                </Box>
                            </Box>
                        </Box>

                        {/* patient list link is visible if user role is caregiver */}
                        {/* <Box 
                            sx={{
                                marginTop: "2rem",
                                padding: "1rem",
                                backgroundColor: "#0B6BB2",
                                borderRadius: "1rem",
                                cursor: "pointer"
                            }}
                            onClick={patientListHandleClick}
                        >
                            <Stack
                                sx={{ width: '100%'}}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                color="white"
                            >
                                <img
                                    src={patientListIcon}
                                    alt="icon"
                                    style={{
                                        height: '1.5rem',
                                        width: '1.5rem',
                                        marginRight: "1rem"
                                    }}
                                />
                                {translate('patientList')}
                            </Stack>
                        </Box> */}

                        <Box sx={{
                            marginTop: "2rem",
                            marginBottom: "2rem",
                            backgroundColor: "white",
                            borderRadius: "1rem",
                            width: "100%"
                        }}>
                            <ProfileEntry 
                                img={userInfo}
                                text={translate('userInfo')}
                                path="/login"
                            />
                        </Box>

                        <Box sx={{
                            marginBottom: "2rem",
                            backgroundColor: "white",
                            borderRadius: "1rem",
                            width: "100%"
                        }}>
                            <ProfileEntry 
                                img={supportIcon}
                                text={translate('support')}
                                path="/login"
                            />
                            <hr />
                            <ProfileEntry 
                                img={settingsIcon}
                                text={translate('settings')}
                                path="/profile/settings"
                            />
                        </Box>

                        {/* logout */}
                        <Box 
                            sx={{
                                padding: "1rem",
                                backgroundColor: "#FF0000",
                                borderRadius: "1rem",
                                cursor: "pointer"
                            }}
                            onClick={patientListHandleClick}
                        >
                            <Stack
                                sx={{ width: '100%'}}
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                color="white"
                            >
                                <img
                                    src={logoutIcon}
                                    alt="logout icon"
                                    style={{
                                        height: "1.5rem",
                                        width: "1.5rem",
                                        marginRight: "1rem"
                                    }}
                                />
                                {translate('logout')}
                            </Stack>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Box>
        </>
    );
};