import { Box, Typography } from '@mui/material';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ReturnIcon } from '../../login/ReturnIcon';
import { ProfileEntry } from '../ProfileEntry';
import { SelectLanguage } from './SelectLanguage';
import changePasswordIcon from '../../../assets/profile/settings/change_password_icon.svg';

export const SettingsPage: React.FC = () => {

    const { translate } = useLanguage();

    return(
        <>
            <ReturnIcon path="/profile" color="black"/>
            <Box
                sx={{
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start", 
                    alignItems: "center", 
                    backgroundColor: "#f7f7f7",
                    paddingTop: "6.5rem",
                    fontWeight: "bold",
                }} 
            >
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "20rem",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "2rem",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontFamily: "Montserrat, Arial, sans-serif",
                        }}
                    >
                        {translate('settings')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "20rem",
                        borderRadius: "1rem",
                        backgroundColor: "white"
                    }}
                >
                    <ProfileEntry
                        img={changePasswordIcon}
                        text={translate('changePassword')}
                        path="/profile/settings/change-password"
                    />
                    <hr />
                    <SelectLanguage />
                </Box>
            </Box>
        </>
    );
};