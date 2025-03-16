import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";
import { ReturnIcon } from "../login/ReturnIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router";
import { PatientProfileCard } from "./PatientProfileCard";
import examplePatientImage from "../../assets/profile/example_patient_profile_image.svg";


export const PatientList: React.FC = () => {
    const {translate} = useLanguage();

    const navigate = useNavigate();

    const patientRegistrationHandleClick = () => {
        navigate("/profile/patient-list/patient-registration");
    };

    return (
        <>
            <ReturnIcon path="/profile" color="#666666" />
            <Box
                sx={{
                    backgroundColor: "#F7F7F7",
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start", 
                    alignItems: "center",
                    paddingTop: "6.5rem"
                }}
            >
                <Box
                    sx={{
                        width: "75%",
                        maxWidth: "20rem",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "2rem",
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold",
                            fontFamily: "Montserrat, Arial, sans-serif",
                        }}
                    >
                        {translate('patientList')}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "Montserrat, Arial, sans-serif",
                            marginTop: "1rem"
                        }}
                    >
                        {translate('patientListDescription')}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "#F7F7F7", 
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        mt: "2rem",
                        width: "75%",
                        justifyContent: "space-between",
                    }}
                >
                    <PatientProfileCard
                        imageSrc={examplePatientImage}
                        name="Carlo Rossi"
                    />

                    {/* add profile */}
                    <Box
                        component="table"
                        sx={{
                            width: "45%",
                            textAlign: "center",
                            backgroundColor: "#F7F7F7",
                            flex: "1 1 45%",
                            maxWidth: "45%",
                            alignSelf: "flex-start"
                        }}
                    >
                        <Box component="tr">
                            <Box component="td">
                                <Button
                                    onClick={patientRegistrationHandleClick}
                                    variant="contained"
                                    sx={{
                                        width: "8rem",
                                        height: "8rem",
                                        borderRadius: "20px",
                                        backgroundColor: "white",
                                        color: "black",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        fontWeight:"regular",
                                        fontSize: "1.5rem",
                                        textTransform: "none",
                                        padding: "0",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h3" sx={{
                                            fontWeight: "light",
                                            fontFamily: "Montserrat, Arial, sans-serif"
                                        }}
                                    >
                                        +
                                    </Typography>
                                    <Typography variant="h6" sx={{fontFamily: "Montserrat, Arial, sans-serif",}}>
                                        {translate('add')}
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>

                        <Box component="tr">
                            <Box component="td">
                                <Typography sx={{ fontWeight: "light", mt: "2rem", textAlign: "center" }}>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
