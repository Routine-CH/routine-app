import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import axios from "axios";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import Calendar from "../components/common/calendar/calendar-card";
import DateCard from "../components/common/calendar/date-card";
import EmptyState from "../components/common/empty-state";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import Todo from "../components/todos/todo";
import TodoModal from "../components/todos/todo-modal";
import { useUserTodos } from "../hooks/todos/use-user-todos";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { UserTodo } from "../utils/types/types";

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

  const { userTodos, isLoading } = useUserTodos();
  const [futureTodos, setFutureTodos] = useState<{ [key: string]: UserTodo[] }>(
    {}
  );
  const [_, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTodoModalVisible, setIsTodoModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<UserTodo | null>(null);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<{
    startDate: Date;
    endDate: Date;
  }>({ startDate: startOfCurrentWeek, endDate: endOfCurrentWeek });
  const [formattedDateRange, setFormattedDateRange] =
    useState(formattedCurrentWeek);

  // Get Future Todos
  useEffect(() => {
    async function getFutureTodos() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}todos/upcoming`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setFutureTodos(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get future todos", error);
      } finally {
        setIsLoading(false);
      }
    }
    getFutureTodos();
  }, []);

  useEffect(() => {
    const uniqueDates = Object.keys(futureTodos);
    setUniqueDates(uniqueDates);
  }, [futureTodos]);

  useEffect(() => {
    const filteredDates = Object.keys(futureTodos).filter((date) => {
      const currentDate = new Date(date);
      return (
        currentDate >= selectedWeek.startDate &&
        currentDate <= selectedWeek.endDate
      );
    });
    setUniqueDates(filteredDates);
  }, [futureTodos, selectedWeek]);

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

  const handleConfirm = (startDate: Date, endDate: Date) => {
    setSelectedWeek({ startDate, endDate });
    const formattedStartDate = format(startDate, "dd MMMM", { locale: de });
    const formattedEndDate = format(endDate, "dd MMMM yyyy", { locale: de });
    const formattedRange = `${formattedStartDate} - ${formattedEndDate}`;
    setFormattedDateRange(formattedRange);
  };

  const closeTodoModal = () => {
    setIsTodoModalVisible(false);
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
            {t("todos.today")} {t("profile.gamification.todos")}
          </AppText>
          {isLoading ? (
            // IMPLEMENT LOADING SCREEN
            <AppText>Loading...</AppText>
          ) : userTodos.filter((todo) => {
              const todoDate = new Date(todo.plannedDate);
              const today = new Date();
              return (
                todoDate.getFullYear() === today.getFullYear() &&
                todoDate.getMonth() === today.getMonth() &&
                todoDate.getDate() === today.getDate()
              );
            }).length > 0 ? (
            userTodos
              .filter((todo) => {
                const todoDate = new Date(todo.plannedDate);
                const today = new Date();
                return (
                  todoDate.getFullYear() === today.getFullYear() &&
                  todoDate.getMonth() === today.getMonth() &&
                  todoDate.getDate() === today.getDate()
                );
              })
              .map((todo) => (
                <Todo
                  icon={todo.completed === false ? "stop-outline" : "checkbox"}
                  key={todo.id}
                  title={todo.title}
                  description={todo.description}
                  style={{ width: 240 }}
                  onPress={() => handleTodoModalPress(todo)}
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
            {formattedDateRange}
          </AppText>
        </TouchableWithoutFeedback>
        <View style={[styles.calendarContainer, { marginTop: 30 }]}>
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
        </View>
        <CalendarModal
          isVisible={isModalVisible}
          onClose={closeModal}
          onConfirm={handleConfirm}
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
