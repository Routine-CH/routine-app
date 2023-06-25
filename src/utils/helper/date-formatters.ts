import { DateTime } from "luxon";

export const formatMonthYear = (date: string) => {
  const createdAt = DateTime.fromISO(date);
  const formattedMonth = createdAt.isValid
    ? createdAt.toLocaleString({
        month: "long",
        year: "numeric",
      })
    : "Invalid date";

  return formattedMonth;
};
