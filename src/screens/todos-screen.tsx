import { NavigationProp, useNavigation } from "@react-navigation/native";
import { addDays, format, startOfDay } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import FutureTodosSection from "../components/todos/future-todos-section";
import TodoModal from "../components/todos/todo-modal";
import TodosSection from "../components/todos/todos-section";
import { deleteTodoRequest } from "../data/todo/delete-request";
import { updateUserTodoCompletedRequest } from "../data/todo/update-completed-request";
import {
  filterAndFormatUpcomingTodos,
  getDatesOfWeek,
  getFormattedWeekEnd,
  getFormattedWeekStart,
} from "../lib/todos/todo-dates";
import { useToastMessageStore } from "../store/toast-messages-store";
import { UpcomingTodos, useTodoStore } from "../store/todos-store";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { UserTodo } from "../utils/types/types";

const TodosScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [_, setIsConfirmationModalVisible] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const [isTodoModalVisible, setIsTodoModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<UserTodo | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [manualDate, setManualDate] = useState<boolean>(false);
  const today = new Date().toDateString();
  const showToast = useToastMessageStore((state) => state.showToast);
  const { startLoading, stopLoading } = useToastMessageStore();

  const {
    userTodos,
    isLoading,
    loadUserTodos,
    dataUpdated,
    setDataUpdated,
    setUserTodos,
  } = useTodoStore();

  useEffect(() => {
    loadUserTodos();
  }, [dataUpdated]);

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

  const todaysTodo = Object.entries(userTodos)
    .filter(([date]) => {
      const todoDate = new Date(date).toDateString();
      return todoDate === today;
    })
    .map(([, todos]) => todos)
    .flat();

  const futureTodos = useMemo(() => {
    return filterAndFormatUpcomingTodos(userTodos, datesOfWeek);
  }, [userTodos, datesOfWeek]);

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

      setUserTodos((prevTodos: UpcomingTodos) =>
        Object.keys(prevTodos).reduce<UpcomingTodos>(
          (updatedUpcomingTodos, date) => {
            updatedUpcomingTodos[date] = prevTodos[date].map((t) =>
              t.id === updatedTodo.id ? updatedTodo : t
            );
            return updatedUpcomingTodos;
          },
          {}
        )
      );
      setDataUpdated(true);
    } catch (error) {
      console.error("Something is wrong: ", error);
    }
  };

  const navigateToTodoEditScreen = (todo: UserTodo) => {
    if (todo) {
      navigation.navigate("SubRoutes", {
        screen: "TodosEdit",
        params: { id: todo.id },
      });
    }
  };

  const onDeleteTodo = async (todo: UserTodo) => {
    try {
      startLoading();
      await deleteTodoRequest(todo);
      setDataUpdated(true);
      showToast(ToastType.success, "Todo wurde gelöscht.");
    } catch (error) {
      console.error("Failed to delete todo", error);
      stopLoading();
    } finally {
      setIsConfirmationModalVisible(false);
      stopLoading();
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
    navigation.navigate("SubRoutes", { screen: "TodosNew" });
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
          userTodos={todaysTodo}
          todaysTodo={todaysTodo}
          handleTodoModalPress={handleTodoModalPress}
          handleIconPress={handleIconPress}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={navigateToTodoEditScreen}
        />
        <FutureTodosSection
          handleModalPress={handleModalPress}
          currentWeek={currentWeek}
          isLoadingUpcomingTodos={isLoading}
          upcomingTodos={futureTodos}
          handleTodoModalPress={handleTodoModalPress}
          handleIconPress={handleIconPress}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={navigateToTodoEditScreen}
        />
        <CalendarModal
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
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
      <RoutineToast />
    </>
  );
};

export default TodosScreen;
