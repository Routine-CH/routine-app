import { format, startOfDay } from "date-fns";
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
  selectedDate: Date;
  onDayPress: (day: Day) => void;
}

const windowWidth = Dimensions.get("window").width;

const SimpleCalendarModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  setIsVisible,
  selectedDate,
  onDayPress,
}) => {
  const markedDates = {
    [format(selectedDate, "yyyy-MM-dd")]: { selected: true, marked: true },
  };

  const currentDate = format(startOfDay(new Date()), "yyyy-MM-dd");

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
              allowSelectionOutOfRange={false}
              markedDates={markedDates}
              initialDate={showSelectedDate}
              onDayPress={onDayPress}
              minDate={currentDate}
              theme={{
                textSectionTitleColor: AppColors.black70,
                textSectionTitleDisabledColor: AppColors.black70,
                selectedDayBackgroundColor: AppColors.blue100Muted20,
                selectedDayTextColor: AppColors.black70,
                todayTextColor: AppColors.black70,
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
    width: windowWidth * 0.9,
    height: 320,
  },
});
