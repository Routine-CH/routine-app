import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { format, getMonth } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import {
  CalendarData,
  CalendarDataTypes,
  CalendarItems,
} from "../../utils/types/calendar/types";

const calendarDataKeys: Record<CalendarDataTypes, keyof CalendarData> = {
  [CalendarDataTypes.GOALS]: "goals",
  [CalendarDataTypes.TODOS]: "todos",
  [CalendarDataTypes.JOURNALS]: "journals",
};

export const useCalendarData = (
  selectedDate: Date,
  selectedWeek: string[],
  selectedChip: CalendarDataTypes | undefined
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [calendar, setCalendar] = useState<CalendarItems[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState(getMonth(selectedDate));
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const newMonth = getMonth(selectedDate);

  const getCalendarData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
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
  const weekData = useMemo(() => {
    if (calendar && selectedWeek.length > 0) {
      let filteredCalendar = calendar.filter((item) =>
        selectedWeek.includes(item.date)
      );

      if (selectedChip) {
        filteredCalendar = filteredCalendar
          .map((item) => {
            const data: CalendarData = {
              goals: [],
              todos: [],
              journals: [],
            };

            data[calendarDataKeys[selectedChip]] =
              item.data[calendarDataKeys[selectedChip]];

            return {
              ...item,
              data,
            };
          })
          .filter(
            (item) => item.data[calendarDataKeys[selectedChip]].length > 0
          );
      }

      return filteredCalendar;
    }
    return null;
  }, [calendar, selectedWeek, selectedChip]);

  useEffect(() => {
    getCalendarData();
  }, [currentMonth]);

  useEffect(() => {
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);
    }
  }, [selectedDate]);

  return { weekData, isLoading };
};
