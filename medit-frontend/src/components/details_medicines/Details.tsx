import {
  Box,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLanguage } from "../../contexts/LanguageContext";
import { ReturnIcon } from "./returnIcon";
import Medicine from "../../assets/icon/medicine.svg";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const Details: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "#f7f7f7",
          backgroundSize: "200% 120%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100vw",
          height: "100vh",
          margin: 0,
          paddingTop: "2rem",
          [theme.breakpoints.down("md")]: {
            "@media (orientation: landscape)": {
              height: "175vh",
            },
          },
        }}
      >
        <ReturnIcon path="#" />
        <Stack sx={{ width: "100%", maxWidth: "650px", marginTop: "1rem" }}>
          <TableContainer sx={{ backgroundColor: "transparent" }}>
            <Table
              sx={{
                minWidth: 650,
                borderCollapse: "collapse",
                "@media (max-width: 600px)": {
                  minWidth: "100%",
                },
              }}
              aria-label="simple table"
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    rowSpan={3}
                    sx={{
                      border: "none",
                      textAlign: "left",
                      verticalAlign: "middle",
                      marginLeft: "1rem",
                      "@media (max-width: 600px)": {
                        textAlign: "right",
                        marginLeft: 0,
                      },
                    }}
                  >
                    <img
                      src={Medicine}
                      alt="Medicine"
                      style={{
                        width: "100%",
                        maxWidth: "100px",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight={550}>
                      Name
                    </Typography>
                    <Typography fontSize="h8" color="#0B6BB2" fontWeight={520}>
                      Medicine
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight={550}>
                      Pill Dosage
                    </Typography>
                    <Typography fontSize="h8" color="#0B6BB2" fontWeight={520}>
                      100 mg
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight={550}>
                      Next Dose
                    </Typography>
                    <Typography fontSize="h8" color="#0B6BB2" fontWeight={520}>
                      tomorrow
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer
            sx={{ backgroundColor: "transparent", marginTop: "2rem" }}
          >
            <Table
              sx={{
                minWidth: 650,
                borderCollapse: "collapse",
                "@media (max-width: 600px)": {
                  minWidth: "100%",
                },
              }}
              aria-label="additional table"
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h5" fontWeight={550}>
                      Dose
                    </Typography>
                    <Typography fontSize="h7" color="#505050" fontWeight={520}>
                      1 times | 9 am, 3 pm
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h5" fontWeight={550}>
                      Program
                    </Typography>
                    <Typography fontSize="h7" color="#505050" fontWeight={520}>
                      Total 8 weeks | 6 weeks left
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h5" fontWeight={550}>
                      Quantity
                    </Typography>
                    <Typography fontSize="h7" color="#505050" fontWeight={520}>
                      Total 20 capsules | 10 capsules left
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: "none",
                      "@media (max-width: 600px)": {
                        textAlign: "left",
                      },
                    }}
                  >
                    <Typography variant="h5" fontWeight={550}>
                      Add information
                    </Typography>
                    <Typography fontSize="h7" color="#505050" fontWeight={520}>
                      Worem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                      dignissim, metus nec fringilla accumsan, risus sem
                      sollicitudin lacus, ut interdum tellus elit sed risus.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
