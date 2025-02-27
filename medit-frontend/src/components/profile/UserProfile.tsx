import { Navbar } from '../Navbar/Navbar';
import { Box, Typography, Button } from '@mui/material';
import { ReturnIcon } from '../login/ReturnIcon';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LogoutIcon from '@mui/icons-material/Logout';
import ExampleUserProfile from "../../assets/profile/example_patient_profile_image.svg";
import { useLanguage } from "../../contexts/LanguageContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router';


export const UserProfile: React.FC = () => {
    
    const theme = createTheme({
        typography: {
            fontFamily: "Montserrat, Arial",
        },
    });

    const { translate } = useLanguage();

    const navigate = useNavigate();

    const handleQrCodeClick = () => {
        // TODO: correct right patient qr code route
        navigate("/login/scan-qrcode");
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
                    backgroundColor: "#f7f7f7"
                }} 
            >
                <ReturnIcon path="/home" color="black"/>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            width: "80%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
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
                                onClick={handleQrCodeClick}
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
                                <Typography variant="h6">{translate('profile')}</Typography>
                                <Box
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '2px 8px',
                                    }}
                                >
                                    {translate('patient').toLocaleLowerCase()}
                                </Box>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="center" p={2}>
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<LogoutIcon />}
                                sx={{ color: 'white', borderRadius: '12px' }}
                            >
                                {translate('logout')}
                            </Button>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Box>
        </>
    );
};