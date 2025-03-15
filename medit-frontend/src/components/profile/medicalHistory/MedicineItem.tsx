import React from 'react';
import { Box, Typography } from '@mui/material';

interface MedicineItemProps {
    image: string;
    title: string;
    date: string;
}

export const MedicineItem: React.FC<MedicineItemProps> = ({ image, title, date }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                width: '100%',
            }}
        >
            <Box
                component="img"
                src={image}
                alt={title}
                sx={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '0.5rem',
                }}
            />
            <Box sx={{ paddingLeft: '1rem' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        fontFamily: "Montserrat, Arial, sans-serif",
                        paddingBottom: '0.5rem',
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: "Montserrat, Arial, sans-serif",
                        color: "#505050",
                    }}
                >
                    {date}
                </Typography>
            </Box>
        </Box>
    );
};

export default MedicineItem;