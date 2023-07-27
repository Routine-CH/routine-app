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
import { IFormTodoInputs, UserTodo } from "../utils/types/types";

const TodosScreen: React.FC = () => {
  const { t } = useTranslation();
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });
  const startOfCurrentWeekFormatted = format(startOfCurrentWeek, "dd MMMM", {
    locale: de,
  });
  const endOfCurrentWeekFormatted = format(endOfCurrentWeek, "dd MMMM yyyy", {
    locale: de,
  });
  const formattedCurrentWeek = `${startOfCurrentWeekFormatted} - ${endOfCurrentWeekFormatted}`;

  //   const { userTodos, isLoading } = useUserTodos();
  const [futureTodos, setFutureTodos] = useState<{ [key: string]: UserTodo[] }>(
    {}
  );
  const [_, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const { userTodos, isLoading } = useUserTodos();

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

  const handleIconPress = async (todo: IFormTodoInputs) => {
    console.log("Pressed");
    try {
      const response = await updateUserTodoCompletedRequest({
        todoId: todo.todoId,
        completed: todo.completed,
      });
    } catch (error) {
      console.error(error);
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
            {t("todos.today")} {t("profile.gamification.todos")}
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
        {/*         <View style={[styles.calendarContainer, { marginTop: 30 }]}>
          {isLoading ? (
            // IMPLEMENT LOADING SCREEN
            <AppText>Loading...</AppText>
          ) : uniqueDates.length > 0 ? (
            uniqueDates.map((date: string) => {
              const currentDate = new Date(date);
              if (
                currentDate >= selectedWeek.startDate &&
                currentDate <= selectedWeek.endDate
              ) {
                return (
                  <View
                    key={date}
                    style={{
                      flexDirection: "row",
                      gap: 30,
                      width: "100%",
                    }}
                  >
                    <View style={{ flexShrink: 1 }}>
                      <DateCard date={new Date(date)} />
                    </View>
                    <View style={{ flexShrink: 1, flexGrow: 1 }}>
                      {futureTodos[date].map((todo: UserTodo) => (
                        <Calendar
                          title={todo.title}
                          key={todo.id}
                          displayTodoCard={true}
                          icon={
                            todo.completed === false
                              ? "stop-outline"
                              : "checkbox"
                          }
                        />
                      ))}
                    </View>
                  </View>
                );
              }
              return null;
            })
          ) : (
            <EmptyState
              type="todo"
              title={t("todos.no-todos-title")}
              description={t("todos.no-future-todos")}
              style={{ backgroundColor: AppColors.greenMuted30 }}
            />
          )}
        </View> */}
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
      <AddButton />
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
