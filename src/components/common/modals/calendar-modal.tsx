import { format } from "date-fns";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import AppColors from "../../../utils/constants/colors";
import { Day } from "../../../utils/types/calendar/types";

interface ConfirmationModalProps {
  isVisible: boolean;
  datesOfWeek: Date[];
  onDayPress: (day: Day) => void;
  onClose: () => void;
}

const CalendarModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  datesOfWeek,
  onDayPress,
  onClose,
}) => {
  const handleOverlayPress = () => {
    onClose();
  };

  // convert dates to string format 'yyyy-MM-dd' and create marked dates object
  const markedDates = datesOfWeek.reduce((accumulator, date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return {
      ...accumulator,
      [dateString]: { selected: true, marked: true },
    };
  }, {});

  return (
    <Modal visible={isVisible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.line} />
          <Calendar
            style={styles.calendar}
            firstDay={1}
            monthFormat='MMMM yyyy'
            enableSwipeMonths={true}
            allowSelectionOutOfRange={true}
            markedDates={markedDates}
            onDayPress={onDayPress}
            theme={{
              textSectionTitleColor: AppColors.black70,
              textSectionTitleDisabledColor: AppColors.black70,
              selectedDayBackgroundColor: AppColors.blue100Muted20,
              selectedDayTextColor: AppColors.black70,
              todayTextColor: AppColors.black70,
              dayTextColor: AppColors.black70,
              textDisabledColor: AppColors.black70,
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
    minWidth: 350,
    height: 380,
  },
});
