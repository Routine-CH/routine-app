export const getWeekDates = (date: Date) => {
  const dates = [];
  const dayOfWeek = date.getDay();

  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const startDate = new Date(date);

  if (dayOfWeek !== 1) {
    startDate.setDate(date.getDate() - (daysToMonday - 1));
  } else {
    startDate.setDate(date.getDate() - daysToMonday);
  }

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }

  return dates;
};
