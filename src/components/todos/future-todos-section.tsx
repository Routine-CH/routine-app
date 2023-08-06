import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { UserTodo } from "../../utils/types/types";
import DateCard from "../common/calendar/date-card";
import EmptyState from "../common/empty-state";
import { LoadingIndicator } from "../common/loading-indicator";
import AppText from "../common/typography/app-text";
import Todo from "./todo";

type FutureTodosSectionProps = {
  handleModalPress: () => void;
  currentWeek: string;
  isLoadingUpcomingTodos: boolean;
  upcomingTodos: {
    [date: string]: UserTodo[];
  };
  handleTodoModalPress: (todo: UserTodo) => void;
  handleIconPress: (todo: UserTodo) => Promise<void>;
  onDeleteTodo: (todo: UserTodo) => void;
  onEditTodo: (todo: UserTodo) => void;
};

const FutureTodosSection: React.FC<FutureTodosSectionProps> = ({
  handleModalPress,
  currentWeek,
  isLoadingUpcomingTodos,
  upcomingTodos,
  handleTodoModalPress,
  handleIconPress,
  onDeleteTodo,
  onEditTodo,
}) => {
  const { t } = useTranslation();

  // filter out all todos which are completed
  const filteredTodos = Object.fromEntries(
    Object.entries(upcomingTodos).filter(([_, todos]) =>
      todos.some((todo: UserTodo) => !todo.completed)
    )
  );

  return (
    <View style={styles.container}>
      <AppText
        fontStyle='heading3'
        colorStyle='black64'
        style={{ marginTop: 60, marginBottom: 30 }}
      >
        {t("todos.future")} {t("profile.gamification.todos")}
      </AppText>
      <TouchableWithoutFeedback onPress={handleModalPress}>
        <AppText fontStyle={"body"} colorStyle='black64'>
          {currentWeek}
        </AppText>
      </TouchableWithoutFeedback>
      <View style={[styles.calendarContainer, { marginTop: 30 }]}>
        {isLoadingUpcomingTodos ? (
          <LoadingIndicator />
        ) : filteredTodos && Object.keys(filteredTodos).length > 0 ? (
          Object.entries(filteredTodos).map(([date, todos]) => (
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
                    futureTodo={true}
                    onPress={() => handleTodoModalPress(todo)}
                    onPressIcon={() => handleIconPress(todo)}
                    onDeleteTodo={() => onDeleteTodo(todo)}
                    onEditTodo={() => onEditTodo(todo)}
                  />
                ))}
              </View>
            </View>
          ))
        ) : (
          <EmptyState
            type='todo'
            title={t("todos.no-todos-title")}
            description={t("todos.no-future-todos")}
            style={{ backgroundColor: AppColors.greenMuted30 }}
          />
        )}
      </View>
    </View>
  );
};

export default FutureTodosSection;

const styles = StyleSheet.create({
  container: { marginBottom: 50 },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
});
