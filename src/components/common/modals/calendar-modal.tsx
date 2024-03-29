import { format } from "date-fns";
import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AppColors from "../../../utils/constants/colors";
import { Day } from "../../../utils/types/calendar/types";

interface ConfirmationModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  datesOfWeek: Date[];
  onDayPress: (day: Day) => void;
  initialDate?: string;
}

const windowWidth = Dimensions.get("window").width;

const CalendarModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  setIsVisible,
  datesOfWeek,
  onDayPress,
  initialDate,
}) => {
  // convert dates to string format 'yyyy-MM-dd' and create marked dates object
  const markedDates = datesOfWeek.reduce((accumulator, date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return {
      ...accumulator,
      [dateString]: { selected: true, marked: true },
    };
  }, {});

  const showSelectedDate: string | undefined = markedDates
    ? Object.keys(markedDates)[0]
    : undefined;

  const handleClickedOnLayout = () => {
    setIsVisible(false);
  };

  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback onPress={handleClickedOnLayout}>
        <View style={styles.overlay}>
          <Pressable onPress={stopPropagation} style={styles.modalContainer}>
            <View style={styles.line} />
            <Calendar
              style={styles.calendar}
              firstDay={1}
              monthFormat='MMMM yyyy'
              enableSwipeMonths={true}
              allowSelectionOutOfRange={
                initialDate !== undefined ? false : true
              }
              minDate={initialDate !== undefined ? initialDate : undefined}
              markedDates={markedDates}
              initialDate={showSelectedDate}
              onDayPress={onDayPress}
              theme={{
                textSectionTitleColor: AppColors.black70,
                textSectionTitleDisabledColor: AppColors.black70,
                selectedDayBackgroundColor: AppColors.blue100Muted20,
                selectedDayTextColor: AppColors.black70,
                todayTextColor: initialDate
                  ? AppColors.grey
                  : AppColors.black70,
                dayTextColor: AppColors.black70,
                textDisabledColor: AppColors.grey,
                dotColor: AppColors.blue100Muted20,
                selectedDotColor: AppColors.blue100Muted20,
                arrowColor: AppColors.blue100,
                disabledArrowColor: AppColors.blue300,
              }}
            />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarModal;

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
    width: windowWidth * 0.9,
    height: 380,
  },
});
