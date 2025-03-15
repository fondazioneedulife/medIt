import { Box, Typography } from '@mui/material';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ReturnIcon } from '../../login/ReturnIcon';
import { MedicineItem } from './MedicineItem';
import sampleMedicineImage from '../../../assets/icon/immagine.jpg';

export const MedicalHistoryPage: React.FC = () => {

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
                            fontFamily: "Montserrat, Arial, sans-serif",
                            fontWeight: "bold",
                        }}
                    >
                        {translate('medicalHistory')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "80%",
                        maxWidth: "20rem",
                        borderRadius: "1rem",
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <MedicineItem
                        image={sampleMedicineImage}
                        title="Tachipirina"
                        date="Mar 15, 2025"
                    />
                    <hr />
                    <MedicineItem
                        image={sampleMedicineImage}
                        title="Medicine 2"
                        date="Mar 15, 2025"
                    />
                    <hr />
                    <MedicineItem
                        image={sampleMedicineImage}
                        title="Medicine 2"
                        date="Mar 15, 2025"
                    />
                    <hr />
                    <MedicineItem
                        image={sampleMedicineImage}
                        title="Medicine 2"
                        date="Mar 15, 2025"
                    />
                    <hr />
                    <MedicineItem
                        image={sampleMedicineImage}
                        title="Medicine 2"
                        date="Mar 15, 2025"
                    />
                </Box>
            </Box>
        </>
    );
};