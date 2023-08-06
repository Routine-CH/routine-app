import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import FlatButton from "../components/common/buttons/flat-button";
import WorldIcon from "../components/common/icons-svg/world-icon";
import { LoadingIndicator } from "../components/common/loading-indicator";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import AppText from "../components/common/typography/app-text";
import Todo from "../components/todos/todo";
import { useGoalStore } from "../store/goals-store";
import { useTodoStore } from "../store/todos-store";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { UserTodo } from "../utils/types/types";

type GoalsViewScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "GoalsView"
>;

type GoalsViewProps = {
  route: GoalsViewScreenRouteProps;
};

const windowWidth = Dimensions.get("window").width;

const GoalViewScreen: React.FC<GoalsViewProps> = ({ route }) => {
  const goalId = route.params.id;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todos, setTodos] = useState<UserTodo[]>([]);
  const { getGoalById, isLoading } = useGoalStore();
  const { getTodosByGoalId } = useTodoStore();
  const goal = getGoalById(goalId);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      const todos = await getTodosByGoalId(goalId);
      setTodos(todos);
    }

    fetchData();
  }, [goalId]);

  const allTodosCompleted = todos.every((todo) => todo.completed);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseGoal = async () => {
    console.log("pressed");
  };

  const deleteNote = async () => {};

  const navigateToGoalEditScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("SubRoutes", {
      screen: "GoalsEdit",
      params: { id: goalId },
    });
  };

  return !isLoading && goal ? (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <View style={styles.buttonContainer}>
        <BackButton type={true} style={styles.buttonStyle} />
        <Pressable onPress={handleModalPress}>
          <Icon
            name={"ellipsis-vertical"}
            size={26}
            color={AppColors.black64}
          />
        </Pressable>
      </View>
      <View style={styles.titleSection}>
        <Svg width='72' height='72'>
          <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <Stop offset='0%' stopColor='rgba(41, 104, 121, 1)' />
            <Stop offset='100%' stopColor='rgba(111, 153, 165, 1)' />
          </LinearGradient>
          <Rect
            x='0'
            y='0'
            width='72'
            height='72'
            rx='50'
            fill='url(#gradient)'
          />
          <View style={styles.iconContainer}>
            <WorldIcon />
          </View>
        </Svg>
        <AppText
          colorStyle='black64'
          style={{
            marginLeft: 10,
            fontFamily: AppFontStyle.heading1.fontFamily,
            fontSize: AppFontStyle.heading4.fontSize,
            maxWidth: windowWidth * 0.64,
          }}
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {goal.title}
        </AppText>
      </View>
      <View style={styles.contentSection}>
        <AppText colorStyle='black64' fontStyle='bodyMedium'>
          {t("goals.description")}
        </AppText>
        <AppText
          colorStyle='black64'
          style={{
            marginTop: windowWidth * 0.02,
            fontFamily: AppFontStyle.body.fontFamily,
            fontSize: windowWidth * 0.048,
          }}
        >
          {goal.description}
        </AppText>
      </View>
      {todos.length > 0 && (
        <View style={styles.contentSection}>
          {todos.map((todo) => {
            return (
              <View key={todo.id} style={styles.todoContainer}>
                <Todo
                  title={todo.title}
                  completed={todo.completed}
                  description={todo.description}
                />
              </View>
            );
          })}
        </View>
      )}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <FlatButton
          disabled={!allTodosCompleted}
          style={{
            fontFamily: AppFontStyle.bodyMedium.fontFamily,
            fontSize: windowWidth * 0.06,
            textTransform: "uppercase",
            color: allTodosCompleted ? AppColors.white : AppColors.black64,
          }}
          buttonStyle={{
            backgroundColor: allTodosCompleted ? AppColors.blue100 : "#CECECE",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
          }}
          onPress={handleCloseGoal}
        >
          {t("goals.finish-goal")}
        </FlatButton>
        {!allTodosCompleted && (
          <AppText
            colorStyle='black64'
            fontStyle='information'
            style={{
              textAlign: "center",
              marginTop: windowWidth * 0.03,
              maxWidth: windowWidth * 0.8,
              marginBottom: 60,
            }}
          >
            {t("goals.complete-all-todos")}
          </AppText>
        )}
      </View>
      <EditDeleteModal
        title={t("modals.are-you-sure")}
        description={t("modals.notes")}
        actionText={t("modals.delete")}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onConfirm={deleteNote}
        navigateTo={() => navigateToGoalEditScreen()}
      />
      <RoutineToast />
    </ScrollViewScreenWrapper>
  ) : (
    <LoadingIndicator />
  );
};

export default GoalViewScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: AppColors.blueMuted20,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: windowWidth * 0.06,
  },
  iconContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  contentSection: {
    marginTop: windowWidth * 0.07,
  },
  todoContainer: {
    height: 72,
    width: "100%",
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 10,
    borderRadius: 6,
  },
});
