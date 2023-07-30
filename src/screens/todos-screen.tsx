import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { de } from "date-fns/locale";
import { useMemo, useState } from "react";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import FutureTodosSection from "../components/todos/future-todos-section";
import TodoModal from "../components/todos/todo-modal";
import TodosSection from "../components/todos/todos-section";
import { updateUserTodoCompletedRequest } from "../data/todo/update-completed-request";
import { useUserTodos } from "../hooks/todos/use-user-todos";
import {
  getDatesOfWeek,
  getFormattedWeekEnd,
  getFormattedWeekStart,
} from "../lib/todos/todo-dates";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList, UserTodo } from "../utils/types/types";

const TodosScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const [isTodoModalVisible, setIsTodoModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<UserTodo | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [manualDate, setManualDate] = useState<boolean>(false);
  const today = selectedDate;
  const tomorrow = addDays(startOfDay(selectedDate), 1);
  const nextSevenDaysEnd = addDays(manualDate ? today : tomorrow, 6);
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

  const { initialDate, datesOfWeek, currentWeek } = useMemo(() => {
    const today = selectedDate;
    const initialDate = format(
      addDays(startOfDay(new Date()), 1),
      "yyyy-MM-dd",
      { locale: de }
    );
    const tomorrow = addDays(startOfDay(selectedDate), 1);
    const nextSevenDaysEnd = addDays(manualDate ? today : tomorrow, 6);

    const datesOfWeek = getDatesOfWeek(
      manualDate ? today : tomorrow,
      nextSevenDaysEnd
    );
    const weekStart = getFormattedWeekStart(manualDate ? today : tomorrow);
    const weekEnd = getFormattedWeekEnd(nextSevenDaysEnd);
    const currentWeek = `${weekStart} - ${weekEnd}`;
    return {
      start: tomorrow,
      end: nextSevenDaysEnd,
      datesOfWeek,
      currentWeek,
      initialDate,
    };
  }, [selectedDate, manualDate]);

  const todaysTodo = userTodos.filter((todo) => {
    const todoDate = new Date(todo.plannedDate);
    const today = new Date();
    const sameDay = isSameDay(new Date(todoDate), new Date(today));
    return sameDay;
  });

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

  const onDayPress = (day: Day) => {
    setSelectedDate(new Date(day.dateString));
    setIsModalVisible(false);
    if (
      format(new Date(day.dateString), "yyyy-MM-dd", { locale: de }) !==
      format(new Date(), "yyyy-MM-dd", { locale: de })
    ) {
      setManualDate(true);
    }
  };

  const navigateToNewTodoScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("TodosNew");
  };

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor='white'
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <TodosSection
          isLoading={isLoading}
          userTodos={userTodos}
          todaysTodo={todaysTodo}
          handleTodoModalPress={handleTodoModalPress}
          handleIconPress={handleIconPress}
        />
        <FutureTodosSection
          handleModalPress={handleModalPress}
          currentWeek={currentWeek}
          isLoadingUpcomingTodos={isLoadingUpcomingTodos}
          upcomingTodos={upcomingTodos}
          startDate={startDate}
          endDate={endDate}
          handleTodoModalPress={handleTodoModalPress}
          handleIconPress={handleIconPress}
        />
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
