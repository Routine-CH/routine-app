import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CalendarData from "../components/common/calendar/calendar-data";
import ChipContainer from "../components/common/calendar/chip-container";
import { LoadingIndicator } from "../components/common/loading-indicator";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import TodoModal from "../components/todos/todo-modal";
import { useCalendarData } from "../hooks/calendar/use-calendar-data";
import { useCalendarStore } from "../store/calendar-store";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor } from "../utils/types/enums";

const CalendarScreen: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    isModalVisible,
    toggleModalVisibility,
    selectedChip,
    setSelectedChip,
    calendarDataUpdated,
    setCalendarDataUpdated,
    selectedTodo,
    setSelectedTodo,
    isTodoModalVisible,
    toggleTodoModalVisibility,
  } = useCalendarStore();

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

  const { weekData, isLoading, refetchData } = useCalendarData(
    selectedDate,
    selectedWeek,
    selectedChip
  );

  const onDayPress = (day: Day) => {
    setSelectedDate(new Date(day.dateString));
    toggleModalVisibility();
  };

  const handleModalPress = () => {
    toggleModalVisibility();
  };

  const closeTodoModal = () => {
    toggleTodoModalVisibility();
  };

  useEffect(() => {
    if (calendarDataUpdated) {
      refetchData();
      setCalendarDataUpdated(false);
    }
  }, [calendarDataUpdated, refetchData, setCalendarDataUpdated]);

  return (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <ChipContainer
        selectedChip={selectedChip}
        setSelectedChip={setSelectedChip}
      />
      <TouchableOpacity onPress={handleModalPress}>
        <AppText
          fontStyle={"body"}
          colorStyle='black64'
          style={styles.calendarText}
        >
          {currentWeek}
        </AppText>
      </TouchableOpacity>
      <View style={styles.margin}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <CalendarData
            calendar={weekData}
            setSelectedTodo={setSelectedTodo}
            setIsModalVisible={toggleTodoModalVisibility}
          />
        )}
      </View>
      <CalendarModal
        isVisible={isModalVisible}
        setIsVisible={toggleModalVisibility}
        datesOfWeek={datesOfWeek}
        onDayPress={onDayPress}
      />
      <TodoModal
        isVisible={isTodoModalVisible}
        onClose={closeTodoModal}
        todo={selectedTodo}
      />
    </ScrollViewScreenWrapper>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendarText: {
    marginTop: 30,
  },
  margin: {
    marginVertical: 30,
  },
});
