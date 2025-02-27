import { Box, Stack } from "@mui/material";

interface ProfileEntryProps {
    img: string;
    text: string;
}

export const ProfileEntry: React.FC<ProfileEntryProps> = ({
    img,
    text,
}) => {
    return(
        <Box 
            sx={{
                width: '100%',
                padding: '1rem',
            }}
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
                        width: '1.5rem'
                    }}
                />
                {text}
            </Stack>
        </Box>
    );
};