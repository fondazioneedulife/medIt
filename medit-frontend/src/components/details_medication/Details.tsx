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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMedicationById,
  getRemindersByMedicationId,
} from "../../database/indexedDB";

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
  const { id } = useParams<{ id: string }>();
  const [medication, setMedication] = useState<any>(null);
  const [nextDose, setNextDose] = useState<string | null>(null);
  const [program, setProgram] = useState<string | null>(null);
  const [reminder, setReminder] = useState<any>(null);

  useEffect(() => {
    const fetchMedication = async () => {
      if (id) {
        const med = await getMedicationById(Number(id));
        setMedication(med);

        const now = new Date();
        const futureReminders = med.reminders.filter(
          (reminder: any) => new Date(reminder.reminder_date_time) > now
        );
        if (futureReminders.length > 0) {
          const nextReminder = futureReminders.reduce((prev: any, curr: any) =>
            new Date(prev.reminder_date_time) <
            new Date(curr.reminder_date_time)
              ? prev
              : curr
          );
          const farthestReminder = futureReminders.reduce(
            (prev: any, curr: any) =>
              new Date(prev.reminder_date_time) >
              new Date(curr.reminder_date_time)
                ? prev
                : curr
          );
          setNextDose(
            new Date(nextReminder.reminder_date_time).toLocaleString()
          );
          setProgram(
            new Date(farthestReminder.reminder_date_time).toLocaleString()
          );
        }

        const reminders = await getRemindersByMedicationId(Number(id));
        const futureRemindersById = reminders.filter(
          (reminder: any) => new Date(reminder.reminder_date_time) > now
        );
        if (futureRemindersById.length > 0) {
          const firstFutureReminder = futureRemindersById.reduce(
            (prev: any, curr: any) =>
              new Date(prev.reminder_date_time) <
              new Date(curr.reminder_date_time)
                ? prev
                : curr
          );
          setReminder(firstFutureReminder);
        }
      }
    };

    fetchMedication();
  }, [id]);

  if (!medication) {
    return <div>Loading...</div>;
  }

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
        <ReturnIcon path="/home" />
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
                      src={medication.image || Medicine}
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
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, fontSize: "1.5rem" }}
                    >
                      {translate("name")}
                    </Typography>
                    <Typography
                      fontSize="h8"
                      color="#0B6BB2"
                      sx={{ fontWeight: 600, fontSize: "1.3rem" }}
                    >
                      {medication.name}
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
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, fontSize: "1.5rem" }}
                    >
                      {translate("pillDosage")}
                    </Typography>
                    <Typography
                      fontSize="h8"
                      color="#0B6BB2"
                      sx={{ fontWeight: 600, fontSize: "1.3rem" }}
                    >
                      {medication.dose} {medication.unit}
                    </Typography>
                  </TableCell>
                </TableRow>
                {nextDose && (
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "none",
                        "@media (max-width: 600px)": {
                          textAlign: "left",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "1.5rem" }}
                      >
                        {translate("nextDose")}
                      </Typography>
                      <Typography
                        fontSize="h8"
                        color="#0B6BB2"
                        sx={{ fontWeight: 600, fontSize: "1.3rem" }}
                      >
                        {nextDose}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer
            sx={{ backgroundColor: "transparent", marginTop: "2rem", ml: 2 }}
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
                    {reminder && (
                      <>
                        <Typography variant="h5" fontWeight={550}>
                          {translate("frequency")}
                        </Typography>
                        <Typography
                          fontSize="h7"
                          color="#505050"
                          fontWeight={520}
                        >
                          {reminder.frequency}
                        </Typography>
                      </>
                    )}
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
                    {program && (
                      <>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 600, fontSize: "1.8rem" }}
                        >
                          {translate("program")}
                        </Typography>
                        <Typography
                          fontSize="h7"
                          color="#505050"
                          sx={{ fontWeight: 600, fontSize: "1.3rem" }}
                        >
                          {program}
                        </Typography>
                      </>
                    )}
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
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 600, fontSize: "1.8rem" }}
                    >
                      {translate("quantity")}
                    </Typography>
                    <Typography
                      fontSize="h7"
                      color="#505050"
                      sx={{ fontWeight: 600, fontSize: "1.3rem" }}
                    >
                      {medication.quantity}
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
                    {medication.note && (
                      <>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 600, fontSize: "1.8rem" }}
                        >
                          {translate("additionalInformation")}
                        </Typography>
                        <Typography
                          fontSize="h7"
                          color="#505050"
                          sx={{ fontWeight: 600, fontSize: "1.3rem" }}
                        >
                          {medication.note}
                        </Typography>
                      </>
                    )}
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
