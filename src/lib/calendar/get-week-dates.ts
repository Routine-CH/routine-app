import { DateTime } from "luxon";

export const getWeekDates = (date: Date) => {
  const dt = DateTime.fromJSDate(date);
  const dayOfWeek = dt.weekday;

  const daysToMonday = dayOfWeek === 1 ? 0 : dayOfWeek - 1;

  const startDateLuxon = dt.minus({ days: daysToMonday });
  const startDate = startDateLuxon.toJSDate();
  const endDate = startDateLuxon.plus({ days: 6 }).toJSDate();

  return { startDate, endDate };
};
