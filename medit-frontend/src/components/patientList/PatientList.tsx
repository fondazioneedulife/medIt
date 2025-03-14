import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";
import { ReturnIcon } from "../login/ReturnIcon";
import { useLanguage } from "../../contexts/LanguageContext";
import { useNavigate } from "react-router";
import examplePatientImage from "../../assets/profile/example_patient_profile_image.svg";

export const PatientList: React.FC = () => {
  const { translate } = useLanguage();

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
          paddingTop: "6.5rem",
        }}
      >
        <Box
          sx={{
            width: "75%",
            maxWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            marginBottom: "2rem",
            textAlign: "center",
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
            {translate("patientList")}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Montserrat, Arial, sans-serif",
              marginTop: "1rem",
            }}
          >
            {translate("patientListDescription")}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#F7F7F7",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            mt: "2rem",
            width: "100%",
            justifyContent: "center",
            ml: { xs: "1rem", sm: "3rem", md: "6.2rem" },
          }}
        >
          <Box component="table" sx={{ width: "30%", textAlign: "center" }}>
            <Box component="tr">
              <Box component="td">
                <img
                  src={examplePatientImage}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                  alt="example patient profile image"
                />
              </Box>
            </Box>

            <Box component="tr">
              <Box component="td">
                <Typography
                  sx={{
                    fontWeight: "light",
                    textAlign: "center",
                    fontFamily: "Montserrat, Arial, sans-serif",
                  }}
                >
                  Carlo Rossi
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            component="table"
            sx={{
              width: "30%",
              textAlign: "center",
              backgroundColor: "#F7F7F7",
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
                    fontWeight: "regular",
                    fontSize: "1.5rem",
                    textTransform: "none",
                    padding: "0",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "light",
                      fontFamily: "Montserrat, Arial, sans-serif",
                    }}
                  >
                    +
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "Montserrat, Arial, sans-serif" }}
                  >
                    {translate("add")}
                  </Typography>
                </Button>
              </Box>
            </Box>

            <Box component="tr">
              <Box component="td">
                <Typography
                  sx={{ fontWeight: "light", mt: "2rem", textAlign: "center" }}
                ></Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
