import { useEffect, useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { useTodoStore } from "../../store/todos-store";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import { UserGoals, UserTodo } from "../../utils/types/types";
import DropdownButton from "../common/buttons/dropdown-button";
import IconTextButton from "../common/buttons/icon-text-button";
import AppText from "../common/typography/app-text";
import CreateAndLinkTodoModal from "./create-and-link-todo-modal";

type GoalAddTodoViewProps = {
  control: Control<FieldValues, any>;
  isEditable: boolean;
  goal?: UserGoals | undefined;
};

const windowWidth = Dimensions.get("window").width;

const GoalAddTodoView: React.FC<GoalAddTodoViewProps> = ({
  control,
  isEditable,
  goal,
}) => {
  const [todos, setTodos] = useState<UserTodo[]>([]);
  const [allTodos, setAllTodos] = useState<UserTodo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getTodosByGoalId } = useTodoStore();
  const { getAllTodos } = useTodoStore();

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    async function fetchData() {
      if (!goal) return;
      const todos = await getTodosByGoalId(goal.id);
      setTodos(todos);
    }
    fetchData();
  }, [goal]);

  useEffect(() => {
    async function fetchData() {
      const allTodos = await getAllTodos();
      setAllTodos(allTodos);
    }
    fetchData();
  }, []);

  const handleSelect = (option: string) => {
    console.log(`Selected: ${option}`);
  };

  return (
    <View style={styles.container}>
      <IconTextButton
        iconName='add-outline'
        size={30}
        title='Neues Todo erstellen'
        style={styles.iconTextButton}
        handleModalPress={handleModalPress}
        isEditable={!isEditable}
        noIcon
      />
      <DropdownButton
        title='Existierendes Todo verknüpfen'
        onSelect={handleSelect}
        allTodos={allTodos}
        hasMarginTop={true}
      />
      {todos.length > 0 && (
        <View style={{ marginVertical: 30, position: "relative", zIndex: 10 }}>
          <View
            style={{
              position: "relative",
              height: 1,
              width: windowWidth * 0.9,
              backgroundColor: "rgba(0, 0, 0, 0.20)",
            }}
          />
          <AppText
            fontStyle='bodyMedium'
            colorStyle='black70'
            style={{ marginTop: 30 }}
          >
            Verknüpfte todos
          </AppText>
          <View style={{ marginTop: 20 }}>
            {todos.map((todo) => {
              return (
                <View key={todo.id} style={styles.todoContainer}>
                  <AppText
                    colorStyle='black70'
                    style={{
                      fontFamily: AppFontStyle.bodyMedium.fontFamily,
                      fontSize: 17,
                    }}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {todo.title}
                  </AppText>
                  <AppText
                    colorStyle='black70'
                    style={{
                      fontFamily: AppFontStyle.body.fontFamily,
                      fontSize: 15,
                      marginTop: 5,
                    }}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {todo.description}
                  </AppText>
                </View>
              );
            })}
          </View>
        </View>
      )}
      <CreateAndLinkTodoModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isEditable={isEditable}
      />
    </View>
  );
};

export default GoalAddTodoView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 30,
  },
  iconTextButton: {
    backgroundColor: AppColors.blue100Muted20,
    marginVertical: 15,
  },
  inputField: {
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 15,
  },
  todoContainer: {
    backgroundColor: AppColors.blueMuted40,
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
