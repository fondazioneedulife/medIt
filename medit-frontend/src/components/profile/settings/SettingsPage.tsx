import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ReturnIcon } from '../../login/ReturnIcon';

export const SettingsPage: React.FC = () => {

    const { translate } = useLanguage();

    const navigate = useNavigate();

    return(
        <>
            <ReturnIcon path="/profile" color="black"/>
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
            </Box>
        </>
    );
};