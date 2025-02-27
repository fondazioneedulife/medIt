import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguage } from '../../contexts/LanguageContext';
import enFlag from '../../assets/flags/en.svg';
import itFlag from '../../assets/flags/it.svg';

const languages = [
    { code: 'en', name: 'English', flag: enFlag },
    { code: 'it', name: 'Italian', flag: itFlag },
];

export const ChoseLangIcon: React.FC = () => {
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
        <Box
            sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
            }}
        >
            <IconButton onClick={handleClick}>
                <LanguageIcon
                    sx={{
                        width: '2.5rem',
                        height: '2.5rem',
                        color: 'white'
                    }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                        <img src={lang.flag} alt={lang.name} style={{ width: '1.5rem', marginRight: '0.5rem' }} />
                        {lang.name}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};