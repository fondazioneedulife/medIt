import React, { useState } from 'react';
import { Box, Menu, MenuItem, Stack } from '@mui/material';
import { useLanguage } from '../../../contexts/LanguageContext';
import enFlag from '../../../assets/flags/en.svg';
import itFlag from '../../../assets/flags/it.svg';
import selectLanguageIcon from '../../../assets/profile/settings/select_language_icon.svg';
import translations from "../../../locales/translations.json";

const languages = [
    { code: 'en', name: 'English', flag: enFlag },
    { code: 'it', name: 'Italiano', flag: itFlag },
];

export const SelectLanguage: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (code: string) => {
        setLanguage(code as 'en' | 'it');
        handleClose();
    };

    return (
        <>
            <Box 
                sx={{
                    width: '100%',
                    padding: '1rem',
                    cursor: 'pointer'
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    onClick={handleClick}
                >
                    <img
                        src={selectLanguageIcon}
                        alt="icon"
                        style={{
                            height: '1.5rem',
                            width: '1.5rem',
                            marginRight: "1rem"
                        }}
                    />
                    {translations[language]['selectLanguage'] || 'Select language'}
                </Stack>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ borderRadius: "0.5rem" }}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                        <img src={lang.flag} alt={lang.name} style={{ width: '1.5rem', marginRight: '0.5rem' }} />
                        {lang.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};