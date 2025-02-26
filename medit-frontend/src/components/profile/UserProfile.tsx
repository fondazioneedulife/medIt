import { Navbar } from '../Navbar/Navbar';
import { Box } from '@mui/system';

export const UserProfile: React.FC = () => {
    return(
        <>
            <Navbar />
            <Box
                sx={{
                    height: "89vh",  /* navbar height is 11vh */
                    backgroundColor: "green",
                }} 
            >

            </Box>
        </>
    );
};