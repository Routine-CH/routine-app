import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { format, getMonth } from "date-fns";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { CalendarItem } from "../../utils/types/calendar/types";

export const useCalendarData = (selectedDate: Date) => {
  const [isLoading, setIsLoading] = useState(true);
  const [calendar, setCalendar] = useState<CalendarItem[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState(getMonth(selectedDate));
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const newMonth = getMonth(selectedDate);

  const getCalendarData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        console.log("fetching");
        const response = await axios.post(
          `${API_BASE_URL}calendar`,
          {
            selectedDate: formattedDate,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCalendar(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCalendarData();
  }, [currentMonth]);

  useEffect(() => {
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);
    }
  }, [selectedDate]);

  return { calendar, isLoading };
};
