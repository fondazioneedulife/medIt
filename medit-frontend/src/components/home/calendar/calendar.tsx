import React from "react";
import {
  Datepicker,
  DatepickerEvent,
} from "@meinefinsternis/react-horizontal-date-picker";
import { enUS, it } from "date-fns/locale";
import classes from "./calendar.module.css";
import { Box } from "@mui/material";
import { UserComponent } from "../UserComponent/UserComponent";
import { useLanguage } from "../../../contexts/LanguageContext";

export const Calendar: React.FC = () => {
  const [date, setDate] = React.useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
  };

  const { language } = useLanguage();

  const locale = language === 'en' ? enUS : it;

  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: "white",
        width: "100%",
        top: "0",
        zIndex: "1",
      }}
    >
      <Datepicker
        onChange={handleChange}
        locale={locale}
        startValue={date.startValue}
        endValue={date.endValue}
        classNames={{
          dayLabel: classes.dayLabel,
          selectedDay: classes.selectedDay,
          rangeDays: classes.rangeDays,
          dateLabel: classes.dateLabel,
          monthLabel: classes.monthLabel,
        }}
      />
      <UserComponent />
    </Box>
  );
};
