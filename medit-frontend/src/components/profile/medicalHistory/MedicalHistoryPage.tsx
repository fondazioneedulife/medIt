import { Box, Typography } from '@mui/material';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ReturnIcon } from '../../login/ReturnIcon';
import { MedicineItem } from './MedicineItem';
import { useEffect, useState } from 'react';
import { useLogin } from '../../login/LoginContext';
import { getTakenMedicationsByPatientId } from '../../../database/indexedDB';
import sampleMedicineImage from '../../../assets/icon/immagine.jpg';

export const MedicalHistoryPage: React.FC = () => {

    const { translate } = useLanguage();
    const { user } = useLogin();
    const [takenMedicines, setTakenMedications] = useState<any[]>([]);
    
    useEffect(() => {
    const fetchTakenMedications = async () => {
        const medications = await getTakenMedicationsByPatientId(user?.id as number);
        setTakenMedications(medications);
    };

    fetchTakenMedications();
    }, []);

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
                    {takenMedicines.map((takenMedicineItem, index) => (
                        <>
                            <MedicineItem
                                key={index}
                                image={takenMedicineItem.image ? takenMedicineItem.image : sampleMedicineImage}
                                title={takenMedicineItem.name}
                                date={translate('month' + takenMedicineItem.month) + ' ' + takenMedicineItem.day + ', ' + takenMedicineItem.year + ' ' + takenMedicineItem.hour} 
                            />
                            {index < takenMedicines.length - 1 && <hr />}
                        </>
                    ))}
                </Box>
            </Box>
        </>
    );
};