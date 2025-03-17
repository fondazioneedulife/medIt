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

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [date, setDate] = React.useState<{
    selectedDate: Date | null;
  }>({
    selectedDate: selectedDate,
  });

  const handleChange = (d: DatepickerEvent) => {
    const [selectedDate] = d;
    setDate({ selectedDate });
    onDateChange(selectedDate);
  };

  const { language } = useLanguage();

  const locale = language === "en" ? enUS : it;

  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: "white",
        width: "100%",
        top: "0",
        zIndex: "1",
        height: "100px",
      }}
    >
      <Datepicker
        onChange={handleChange}
        locale={locale}
        startValue={date.selectedDate}
        endValue={date.selectedDate}
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
