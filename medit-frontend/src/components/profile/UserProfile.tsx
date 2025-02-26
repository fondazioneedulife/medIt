import { Navbar } from '../Navbar/Navbar';
import { Box } from '@mui/system';
import { ReturnIcon } from '../login/ReturnIcon';

export const UserProfile: React.FC = () => {
    return(
        <>
            <Navbar />
            <Box
                sx={{
                    height: "89vh",  /* navbar height is 11vh */
                    width: "100vw",
                    backgroundColor: "green",
                }} 
            >
                <Box
                    sx={{
                        width: "80%",
                    }}
                >
                    <ReturnIcon path="/home" />
                </Box>
            </Box>
        </>
    );
};