import { daysOfWeek } from "./SetReminder";

interface ReminderData {
  medication_id: string;
  reminder_date_time: string;
  days: string[];
  frequency: string;
  id_group: string;
  synced_at: Date;
  dayOfMonth?: number;
  dayOfYear?: number;
  monthOfYear?: number;
  endDate?: Date | null;
}

export const generateReminders = (data: ReminderData) => {
  const reminders = [];
  const {
    medication_id,
    reminder_date_time,
    days,
    frequency,
    id_group,
    synced_at,
    dayOfMonth,
    dayOfYear,
    monthOfYear,
    endDate,
  } = data;
  const times = reminder_date_time.split(", ");
  const currentDate = new Date();

  const getNextDate = (day: string, current: Date) => {
    const dayIndex = daysOfWeek.findIndex((d) => d.value === day);
    const currentDayIndex = current.getDay();

    const adjustedCurrentDayIndex =
      currentDayIndex === 0 ? 6 : currentDayIndex - 1;

    let diff = dayIndex - adjustedCurrentDayIndex;

    if (diff < 0) {
      diff += 7;
    }

    const resultDate = new Date(current);
    resultDate.setDate(current.getDate() + diff);

    return resultDate;
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addWeeks = (date: Date, weeks: number) => addDays(date, weeks * 7);

  const addMonths = (date: Date, months: number) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const addYears = (date: Date, years: number) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
  };

  const generateDates = (startDate: Date, frequency: string) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const finalEndDate = endDate || addMonths(startDate, 6);

    while (currentDate <= finalEndDate) {
      if (currentDate >= new Date()) {
        dates.push(new Date(currentDate));
      }
      if (frequency === "daily") {
        currentDate = addDays(currentDate, 1);
      } else if (frequency === "weekly") {
        currentDate = addWeeks(currentDate, 1);
      } else if (frequency === "monthly") {
        currentDate = addMonths(currentDate, 1);
      } else if (frequency === "yearly") {
        currentDate = addYears(currentDate, 1);
      }
    }

    return dates;
  };

  if (frequency === "daily") {
    const startDate = new Date();
    const dates = generateDates(startDate, frequency);

    for (const date of dates) {
      for (const time of times) {
        const [hour, period] = time.split(" ");
        let [hours, minutes] = hour.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        const reminderDate = new Date(date);
        reminderDate.setUTCHours(hours, minutes, 0, 0);

        reminders.push({
          medication_id,
          reminder_date_time: reminderDate.toISOString(),
          frequency,
          id_group,
          synced_at,
        });
      }
    }
  } else if (frequency === "weekly") {
    for (const day of days) {
      const startDate = getNextDate(day, currentDate);
      const dates = generateDates(startDate, frequency);

      for (const date of dates) {
        for (const time of times) {
          const [hour, period] = time.split(" ");
          let [hours, minutes] = hour.split(":").map(Number);

          if (period === "PM" && hours !== 12) {
            hours += 12;
          } else if (period === "AM" && hours === 12) {
            hours = 0;
          }

          const reminderDate = new Date(date);
          reminderDate.setUTCHours(hours, minutes, 0, 0);

          reminders.push({
            medication_id,
            reminder_date_time: reminderDate.toISOString(),
            frequency,
            id_group,
            synced_at,
          });
        }
      }
    }
  } else if (frequency === "monthly" && dayOfMonth) {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayOfMonth + 1
    );
    const dates = generateDates(startDate, frequency);

    for (const date of dates) {
      for (const time of times) {
        const [hour, period] = time.split(" ");
        let [hours, minutes] = hour.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        const reminderDate = new Date(date);
        reminderDate.setUTCHours(hours, minutes, 0, 0);

        reminders.push({
          medication_id,
          reminder_date_time: reminderDate.toISOString(),
          frequency,
          id_group,
          synced_at,
        });
      }
    }
  } else if (frequency === "yearly" && dayOfYear && monthOfYear) {
    const startDate = new Date(
      currentDate.getFullYear(),
      monthOfYear - 1,
      dayOfYear + 1
    );
    const dates = generateDates(startDate, frequency);

    for (const date of dates) {
      for (const time of times) {
        const [hour, period] = time.split(" ");
        let [hours, minutes] = hour.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        const reminderDate = new Date(date);
        reminderDate.setUTCHours(hours, minutes, 0, 0);

        reminders.push({
          medication_id,
          reminder_date_time: reminderDate.toISOString(),
          frequency,
          id_group,
          synced_at,
        });
      }
    }
  }

  return reminders;
};
