import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProfileEntryProps {
    img: string;
    text: string;
    path: string;
}

export const ProfileEntry: React.FC<ProfileEntryProps> = ({
    img,
    text,
    path
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path); // Sostituisci '/desired-route' con la route che desideri
    };

    return(
        <Box 
            sx={{
                width: '100%',
                padding: '1rem',
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                <img
                    src={img}
                    alt="icon"
                    style={{
                        height: '1.5rem',
                        width: '1.5rem',
                        marginRight: "1rem"
                    }}
                />
                {text}
            </Stack>
        </Box>
    );
};