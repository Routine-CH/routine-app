import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { addDays, format, startOfDay } from "date-fns";
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
  const todaysDate = new Date().toDateString();
  const today = selectedDate;
  const tomorrow = addDays(startOfDay(selectedDate), 1);
  const nextSevenDaysEnd = addDays(manualDate ? today : tomorrow, 6);
  const [startDate, setStartDate] = useState<Date | null>(new Date(tomorrow));
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(nextSevenDaysEnd)
  );

  const { upcomingTodos, setUpcomingTodos, isLoadingUpcomingTodos } =
    useUserTodos();

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

  console.log(upcomingTodos);

  const todaysTodo = Object.entries(upcomingTodos)
    .filter(([date]) => {
      const todoDate = new Date(date).toDateString(); // Convert the date to a string
      return todoDate === todaysDate;
    })
    .map(([, todos]) => todos)
    .flat();

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

      setUpcomingTodos((prevTodos) =>
        Object.keys(prevTodos).reduce<{ [date: string]: UserTodo[] }>(
          (updatedUpcomingTodos, date) => {
            updatedUpcomingTodos[date] = prevTodos[date].map((t) =>
              t.id === updatedTodo.id ? updatedTodo : t
            );
            return updatedUpcomingTodos;
          },
          {}
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

  // step 1:
  // first adjust the fetch to only go to the endpoing of the upcoming todos
  // adjust the existing logic so that it has the same functionality as before
  // that means, heutige todos have only the todos of today
  // and the upcoming todos have the todos of the next 7 days OR the selected week, which will be furhter in step 2

  // step 2:
  // new function to filter setting the upcoming todos
  // you can start from the dates of week, because this is the one that is being used to display the calendar
  // those are the right dates to use
  // filter the the userTodos plannedDate with the datesOfWeek
  // you can see something like it in the journal-card.tsx as a reference, it's not the same logic
  // but it's the same idea
  // once you have the filtered todos, you can set them to the upcomingTodos state
  console.log(
    datesOfWeek.map((date) => format(date, "yyyy-MM-dd"), { locale: de })
  );

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor="white"
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <TodosSection
          isLoading={isLoadingUpcomingTodos}
          userTodos={todaysTodo}
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
