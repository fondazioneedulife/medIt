import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PatientProfileCardProps {
    image: string;
    name: string;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ image, name }) => {
    return (
        <Box
            component="table"
            sx={{ width: "45%", textAlign: "center" }}
        >
            <Box component="tr">
                <Box component="td">
                    <img
                        src={image}
                        style={{ width: "8rem", height: "8rem", objectFit: "cover", borderRadius: "20px" }}
                        alt={`${name} profile image`}
                    />
                </Box>
            </Box>

            <Box component="tr">
                <Box component="td">
                    <Typography
                        sx={{
                            fontWeight: 600,
                            textAlign: "center",
                            fontFamily: "Montserrat, Arial, sans-serif",
                        }}>
                        {name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default PatientProfileCard;