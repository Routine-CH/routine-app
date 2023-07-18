import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ChipContainer from "../components/calendar/chip-container";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { useCalendarData } from "../hooks/calendar/use-calendar-data";
import AppColors from "../utils/constants/colors";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor } from "../utils/types/enums";

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(true);

  const { calendar, isLoading } = useCalendarData(selectedDate);

  if (calendar) {
    console.log(calendar.map((element) => console.log(element)));
  }

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

  const onDayPress = (day: Day) => {
    setSelectedDate(new Date(day.dateString));
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
      <TouchableWithoutFeedback
      //  onPress={handleModalPress}
      >
        <AppText fontStyle={"body"} colorStyle='black64' style={styles.margin}>
          {currentWeek}
        </AppText>
      </TouchableWithoutFeedback>
      <View style={styles.margin}>
        {/* {loading ? <AppText>Loading...</AppText> : renderCalendarData()} */}
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
  chipContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  margin: {
    marginTop: 30,
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  reached: {
    color: AppColors.blue100,
  },
  notReached: {
    color: AppColors.red,
  },
});
