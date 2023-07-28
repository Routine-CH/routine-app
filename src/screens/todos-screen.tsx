import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
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
import { useCalendarData } from "../hooks/calendar/use-calendar-data";
import { useUserTodos } from "../hooks/todos/use-user-todos";
import AppColors from "../utils/constants/colors";
import { CalendarDataTypes } from "../utils/types/calendar/types";
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
  const [selectedChip, setSelectedChip] = useState<CalendarDataTypes>();
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

  const { weekData } = useCalendarData(
    selectedDate,
    selectedWeek,
    selectedChip
  );

  const { userTodos, isLoading, setUserTodos } = useUserTodos();

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(new Date(day.dateString));
    setIsModalVisible(false);
  };

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleTodoModalPress = (todo: UserTodo) => {
    setSelectedTodo(todo);
    setIsTodoModalVisible(true);
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

  const closeTodoModal = () => {
    setIsTodoModalVisible(false);
  };

  const todaysTodo = userTodos.filter((todo) => {
    const todoDate = new Date(todo.plannedDate);
    const today = new Date();
    const sameDay = isSameDay(todoDate, today);
    return sameDay;
  });

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
          {isLoading ? (
            <AppText>Loading Future Todos</AppText>
          ) : userTodos ? (
            userTodos.map((todo) => {
              return (
                <View
                  key={todo.id}
                  style={{
                    flexDirection: "row",
                    gap: 30,
                    width: "100%",
                  }}
                >
                  <View style={{ flexShrink: 1 }}>
                    <DateCard date={new Date(todo.plannedDate)} />
                  </View>
                  <View style={{ flexShrink: 1, flexGrow: 1 }}>
                    <Todo
                      title={todo.title}
                      key={todo.id}
                      completed={todo.completed}
                    />
                  </View>
                </View>
              );
            })
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
