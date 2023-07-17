import { Calendar, I18nConfig, NativeDateService } from "@ui-kitten/components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getWeekDates } from "../../../lib/calendar/get-week-dates";
import AppColors from "../../../utils/constants/colors";

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: (startDate: Date, endDate: Date) => void;
  onClose: () => void;
}

const i18n: I18nConfig = {
  dayNames: {
    short: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    long: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ],
  },
  monthNames: {
    short: [
      "Jan.",
      "Febr.",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "Aug.",
      "Sept.",
      "Okt.",
      "Nov.",
      "Dez.",
    ],
    long: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
  },
};

const localeDateService = new NativeDateService("de", {
  i18n,
  startDayOfWeek: 1,
});

const CalendarModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date[]>(
    getWeekDates(new Date())
  );

  const handleOverlayPress = () => {
    onClose();
  };

  console.log(selectedWeek);

  const handleSelect = (date: Date) => {
    setSelectedWeek(getWeekDates(date));
    //     const selectedDate = new Date(date);
    //     const dayOfWeek = selectedDate.getDay();

    //     const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 2;

    //     const startDate = new Date(selectedDate);
    //     startDate.setDate(selectedDate.getDate() - daysToMonday);

    //     const endDate = new Date(startDate);
    //     endDate.setDate(startDate.getDate() + 6);

    //     console.log("selected range", startDate, " - ", endDate);

    //     onConfirm(startDate, endDate);
    //     setDate(date);
  };

  return (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.line} />
            <TouchableWithoutFeedback>
              <Calendar
                style={styles.calendar}
                dateService={localeDateService}
                date={date}
                onSelect={handleSelect}
              />
            </TouchableWithoutFeedback>
          </View>
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
  },
});
