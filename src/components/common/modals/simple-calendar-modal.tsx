import { addDays, eachDayOfInterval, format, startOfDay } from "date-fns";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import AppColors from "../../../utils/constants/colors";
import { Day } from "../../../utils/types/calendar/types";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface MarkedDates {
  [date: string]: { selected: boolean; marked: boolean };
}

interface ConfirmationModalProps {
  isVisible: boolean;
  selectedDate?: Date;
  datesOfWeek?: Date[];
  onDayPress: (day: Day | DateRange) => void;
}

const SimpleCalendarModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  selectedDate,
  datesOfWeek,
  onDayPress,
}) => {
  const currentDate = format(startOfDay(new Date()), "yyyy-MM-dd");
  const tomorrow = addDays(startOfDay(new Date()), 1);
  const formattedTomorrow = format(tomorrow, "yyyy-MM-dd");
  const todayTextColor = datesOfWeek ? AppColors.grey : AppColors.black70;
  const [selectedWeek, setSelectedWeek] = useState<DateRange | null>(null);
  const [markedDatesState, setMarkedDatesState] = useState<MarkedDates>({});

  useEffect(() => {
    let newMarkedDates: MarkedDates = {};

    if (selectedDate) {
      newMarkedDates = {
        [format(selectedDate, "yyyy-MM-dd")]: { selected: true, marked: true },
      };
    }

    if (datesOfWeek && selectedWeek) {
      const { startDate, endDate } = selectedWeek;
      const weekRange = eachDayOfInterval({ start: startDate, end: endDate });
      weekRange.forEach((date) => {
        const dateString = format(date, "yyyy-MM-dd");
        newMarkedDates[dateString] = { selected: true, marked: true };
      });
    }

    setMarkedDatesState(newMarkedDates);
  }, [selectedDate, datesOfWeek, selectedWeek]);

  const handleDayPress = (day: Day) => {
    if (datesOfWeek) {
      const startDate = new Date(day.dateString);
      const endDate = addDays(startDate, 6);
      setSelectedWeek({ startDate, endDate });
      onDayPress({ startDate, endDate });
    } else {
      setSelectedWeek(null);
      onDayPress(day);
    }
  };

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.line} />
          <Calendar
            style={styles.calendar}
            firstDay={1}
            monthFormat="MMMM yyyy"
            enableSwipeMonths={true}
            allowSelectionOutOfRange={false}
            minDate={selectedDate ? currentDate : formattedTomorrow}
            markedDates={markedDatesState}
            onDayPress={(day) => handleDayPress(day)}
            theme={{
              textSectionTitleColor: AppColors.black70,
              textSectionTitleDisabledColor: AppColors.black70,
              selectedDayBackgroundColor: AppColors.blue100Muted20,
              selectedDayTextColor: AppColors.black70,
              todayTextColor: todayTextColor,
              dayTextColor: AppColors.black70,
              textDisabledColor: AppColors.grey,
              dotColor: AppColors.blue100Muted20,
              selectedDotColor: AppColors.blue100Muted20,
              arrowColor: AppColors.blue100,
              disabledArrowColor: AppColors.blue300,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SimpleCalendarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: `rgba(0, 0, 0, 0.1)`,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: "center",
    height: "auto",
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
  },
  calendar: {
    marginVertical: 30,
    minWidth: 350,
    height: 380,
  },
});
