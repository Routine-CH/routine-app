import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import {
  addDays,
  eachDayOfInterval,
  format,
  isSameDay,
  startOfDay,
} from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import DateCard from "../components/common/calendar/date-card";
import EmptyState from "../components/common/empty-state";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import Todo from "../components/todos/todo";
import TodoModal from "../components/todos/todo-modal";
import { updateUserTodoCompletedRequest } from "../data/todo/update-completed-request";
import { useUserTodos } from "../hooks/todos/use-user-todos";
import AppColors from "../utils/constants/colors";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList, UserTodo } from "../utils/types/types";

const TodosScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const [isTodoModalVisible, setIsTodoModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<UserTodo | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [manualDate, setManualDate] = useState<boolean>(false);
  const today = selectedDate;
  const initialDate = format(addDays(startOfDay(new Date()), 1), "yyyy-MM-dd");
  const tomorrow = addDays(startOfDay(selectedDate), 1);
  const nextSevenDaysEnd = addDays(manualDate ? today : tomorrow, 6);
  const datesOfWeek = eachDayOfInterval({
    start: manualDate ? today : tomorrow,
    end: nextSevenDaysEnd,
  });
  const weekStart = format(manualDate ? today : tomorrow, "dd. MMMM", {
    locale: de,
  });
  const weekEnd = format(nextSevenDaysEnd, "dd. MMMM yyyy", { locale: de });
  const currentWeek = `${weekStart} - ${weekEnd}`;
  const [startDate, setStartDate] = useState<Date | null>(new Date(tomorrow));
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(nextSevenDaysEnd)
  );

  const {
    userTodos,
    isLoading,
    setUserTodos,
    upcomingTodos,
    isLoadingUpcomingTodos,
  } = useUserTodos();

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const handleTodoModalPress = (todo: UserTodo) => {
    setSelectedTodo(todo);
    setIsTodoModalVisible(true);
  };

  const closeTodoModal = () => {
    setIsTodoModalVisible(false);
  };

  const handleIconPress = async (todo: UserTodo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateUserTodoCompletedRequest(updatedTodo);

      setUserTodos((prevTodos) =>
        prevTodos.map((t: UserTodo) =>
          t.id === updatedTodo.id ? updatedTodo : t
        )
      );
    } catch (error) {
      console.error("Something is wrong: ", error);
    }
  };

  const onDayPress = (day: Day | { startDate: Date; endDate: Date }) => {
    console.log("Startdate: ", startDate);
    if ("dateString" in day) {
      setSelectedDate(new Date(day.dateString));
      setIsModalVisible(false);
      setStartDate(new Date(day.dateString));
      setEndDate(null);
      setManualDate(
        format(selectedDate, "dd. MMMM yyyy", { locale: de }) ===
          format(addDays(new Date(), 1), "dd. MMMM yyyy", { locale: de })
          ? false
          : true
      );
    } else {
      setSelectedDate(day.startDate);
      setIsModalVisible(false);
      setStartDate(day.startDate);
      setEndDate(day.endDate);
      setManualDate(
        format(selectedDate, "dd. MMMM yyyy", { locale: de }) ===
          format(addDays(new Date(), 1), "dd. MMMM yyyy", { locale: de })
          ? false
          : true
      );
    }
  };

  const todaysTodo = userTodos.filter((todo) => {
    const todoDate = new Date(todo.plannedDate);
    const today = new Date();
    const sameDay = isSameDay(new Date(todoDate), new Date(today));
    return sameDay;
  });

  const filterTodosByDateRange = (
    todos: { [date: string]: UserTodo[] },
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const filteredTodos: { [date: string]: UserTodo[] } = {};
    if (startDate && endDate) {
      Object.entries(todos).forEach(([date, todos]) => {
        const todoDate = new Date(date);
        if (todoDate >= startDate && todoDate <= endDate) {
          filteredTodos[date] = todos;
        }
      });
    }
    return filteredTodos;
  };

  const navigateToNewTodoScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("TodosNew");
  };

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor="white"
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <View>
          <AppText
            fontStyle="heading3"
            colorStyle="black64"
            style={{ marginVertical: 30 }}
          >
            {t("todos.todays")} {t("profile.gamification.todos")}
          </AppText>
          {isLoading ? (
            <AppText>Loading...</AppText>
          ) : userTodos && todaysTodo.length > 0 ? (
            todaysTodo.map((todo) => (
              <Todo
                completed={todo.completed}
                key={todo.id}
                title={todo.title}
                description={todo.description}
                style={{ width: 240 }}
                onPress={() => handleTodoModalPress(todo)}
                onPressIcon={() => handleIconPress(todo)}
              />
            ))
          ) : (
            <EmptyState
              type="todo"
              title={t("todos.no-todos-title")}
              description={t("todos.no-todos")}
              style={{ backgroundColor: AppColors.blueMuted30 }}
            />
          )}
        </View>
        <AppText
          fontStyle="heading3"
          colorStyle="black64"
          style={{ marginTop: 60, marginBottom: 30 }}
        >
          {t("todos.future")} {t("profile.gamification.todos")}
        </AppText>
        <TouchableWithoutFeedback onPress={handleModalPress}>
          <AppText fontStyle={"body"} colorStyle="black64">
            {currentWeek}
          </AppText>
        </TouchableWithoutFeedback>
        <View style={[styles.calendarContainer, { marginTop: 30 }]}>
          {isLoadingUpcomingTodos ? (
            <AppText>Loading Future Todos</AppText>
          ) : upcomingTodos && Object.keys(upcomingTodos).length > 0 ? (
            Object.entries(
              filterTodosByDateRange(upcomingTodos, startDate, endDate)
            ).map(([date, todos]: [string, UserTodo[]]) => (
              <View
                key={date}
                style={{ flexDirection: "row", gap: 30, width: "100%" }}
              >
                <View style={{ flexShrink: 1 }}>
                  <DateCard date={new Date(date)} />
                </View>
                <View style={{ flexShrink: 1, flexGrow: 1 }}>
                  {todos.map((todo: UserTodo) => (
                    <Todo
                      title={todo.title}
                      key={todo.id}
                      completed={todo.completed}
                      onPress={() => handleTodoModalPress(todo)}
                      onPressIcon={() => handleIconPress(todo)}
                    />
                  ))}
                </View>
              </View>
            ))
          ) : (
            <EmptyState
              type="todo"
              title={t("todos.no-todos-title")}
              description={t("todos.no-future-todos")}
              style={{ backgroundColor: AppColors.greenMuted30 }}
            />
          )}
        </View>
        <CalendarModal
          isVisible={isModalVisible}
          datesOfWeek={datesOfWeek}
          onDayPress={onDayPress}
          initialDate={initialDate}
        />
        <TodoModal
          isVisible={isTodoModalVisible}
          onClose={closeTodoModal}
          todo={selectedTodo}
        />
      </ScrollViewScreenWrapper>
      <AddButton navigateTo={() => navigateToNewTodoScreen()} />
    </>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});
