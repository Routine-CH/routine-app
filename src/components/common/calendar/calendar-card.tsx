import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { AuthenticatedStackParamList } from "../../../utils/types/routes/types";
import { UserTodo } from "../../../utils/types/types";
import Todo from "../../todos/todo";
import CardContent from "./card-content";

enum CalendarCardType {
  JOURNAL = "Journal",
  TODOS = "Todos",
  GOALS = "Ziele",
}

interface DateProps {
  id: string;
  type?: string;
  title: string;
  description?: string;
  plannedDate?: string | undefined;
  icon?: string;
  iconStyle?: any;
  style?: StyleProp<ViewStyle>;
  journalStyles?: StyleProp<ViewStyle>;
  displayTodoCard?: boolean;
  setSelectedTodo?: Dispatch<SetStateAction<UserTodo | null>>;
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>;
}

const CalendarCard: React.FC<DateProps> = ({
  id,
  type,
  title,
  description,
  plannedDate,
  icon,
  style,
  iconStyle,
  journalStyles,
  displayTodoCard = false,
  setSelectedTodo,
  setIsModalVisible,
}) => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const navigateToDetailView = () => {
    if (type === CalendarCardType.JOURNAL) {
      navigation.navigate("SubRoutes", {
        screen: "JournalView",
        params: { id: id },
      });
    } else if (type === CalendarCardType.TODOS) {
      setSelectedTodo &&
        setSelectedTodo({
          id: id,
          title: title,
          // @ts-ignore
          description: description,
          // @ts-ignore
          plannedDate: plannedDate,
        });
      setIsModalVisible && setIsModalVisible(true);
    } else if (type === CalendarCardType.GOALS) {
      navigation.navigate("SubRoutes", {
        screen: "GoalsEdit",
        params: { id: id },
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.calendarContainer, style]}
      onPress={navigateToDetailView}
    >
      {displayTodoCard && <Todo title={title} />}
      {!displayTodoCard && (
        <CardContent
          type={type}
          title={title}
          icon={icon}
          iconStyle={iconStyle}
          cardStyle={journalStyles}
        />
      )}
    </TouchableOpacity>
  );
};

export default CalendarCard;

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});
