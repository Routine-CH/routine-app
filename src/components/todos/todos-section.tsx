import { useTranslation } from "react-i18next";
import { View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { UserTodo } from "../../utils/types/types";
import EmptyState from "../common/empty-state";
import AppText from "../common/typography/app-text";
import Todo from "./todo";

type TodosSectionProps = {
  isLoading: boolean;
  userTodos: UserTodo[];
  todaysTodo: UserTodo[];
  handleTodoModalPress: (todo: UserTodo) => void;
  handleIconPress: (todo: UserTodo) => Promise<void>;
  onDeleteTodo: (todo: UserTodo) => void;
};

const TodosSection: React.FC<TodosSectionProps> = ({
  isLoading,
  userTodos,
  todaysTodo,
  handleTodoModalPress,
  handleIconPress,
  onDeleteTodo,
}) => {
  const { t } = useTranslation();

  return (
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
            onDeleteTodo={() => onDeleteTodo(todo)}
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
  );
};

export default TodosSection;
