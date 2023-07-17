
export const getWeekDates = (date: Date) => {
      const startDate = new Date(date);
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1); 
    
      const endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 6);
    
      return { startDate, endDate };
    };
    