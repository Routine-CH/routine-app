import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CalendarData from "../components/calendar/calendar-data";
import ChipContainer from "../components/calendar/chip-container";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { useCalendarData } from "../hooks/calendar/use-calendar-data";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor } from "../utils/types/enums";

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const startDateOfWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const endDateOfWeek = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const datesOfWeek = eachDayOfInterval({
    start: startDateOfWeek,
    end: endDateOfWeek,
  });
  const weekStart = format(startDateOfWeek, "dd MMMM", {
    locale: de,
  });
  const weekEnd = format(endDateOfWeek, "dd MMMM yyyy", {
    locale: de,
  });
  const currentWeek = `${weekStart} - ${weekEnd}`;

  const selectedWeek = datesOfWeek.map((date) => {
    return format(date, "yyyy-MM-dd");
  });

  const { weekData, isLoading } = useCalendarData(selectedDate, selectedWeek);

  const onDayPress = (day: Day) => {
    setSelectedDate(new Date(day.dateString));
    setIsModalVisible(false);
  };

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <ChipContainer />
      <TouchableOpacity onPress={handleModalPress}>
        <AppText fontStyle={"body"} colorStyle='black64' style={styles.margin}>
          {currentWeek}
        </AppText>
      </TouchableOpacity>
      <View style={styles.margin}>
        {isLoading ? (
          <AppText>Loading...</AppText>
        ) : (
          <CalendarData calendar={weekData} />
        )}
      </View>
      <CalendarModal
        isVisible={isModalVisible}
        datesOfWeek={datesOfWeek}
        onDayPress={onDayPress}
        onClose={closeModal}
      />
    </ScrollViewScreenWrapper>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  margin: {
    marginTop: 30,
  },
});
