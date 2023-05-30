import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { AuthenticatedStackParamList } from "../../utils/types/types";
import ToolCard from "./tool-card";
import GoalsIcon from "./tools-svg/goals-icon";
import JournalIcon from "./tools-svg/journal-icon";
import NotizIcon from "./tools-svg/notes-icon";
import TimerIcon from "./tools-svg/timer-icon";
import TodoIcon from "./tools-svg/todo-icon";

const ToolsContainer: React.FC = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const navigateToTimerScreen = () => {
    navigation.navigate("Discover", { screen: "Timer" });
  };

  const navigateToJournalsScreen = () => {
    navigation.navigate("Discover", { screen: "Journals" });
  };

  const navigateToTodosScreen = () => {
    navigation.navigate("Discover", { screen: "Todos" });
  };

  const navigateToNotesScreen = () => {
    navigation.navigate("Discover", { screen: "Notes" });
  };

  const navigateToGoalsScreen = () => {
    navigation.navigate("Discover", { screen: "Goals" });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.toolContainer}
          onPress={navigateToTimerScreen}
        >
          <ToolCard title='Timer'>
            <TimerIcon />
          </ToolCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolContainer}
          onPress={navigateToJournalsScreen}
        >
          <ToolCard title='Journal'>
            <JournalIcon />
          </ToolCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolContainer}
          onPress={navigateToTodosScreen}
        >
          <ToolCard title='Todo'>
            <TodoIcon />
          </ToolCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolContainer}
          onPress={navigateToNotesScreen}
        >
          <ToolCard title='Notizen'>
            <NotizIcon />
          </ToolCard>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolContainer}
          onPress={navigateToGoalsScreen}
        >
          <ToolCard title='Ziele'>
            <GoalsIcon />
          </ToolCard>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToolsContainer;

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  toolContainer: {
    height: 157.5,
    width: 157.5,
    borderRadius: 13,
    marginVertical: 7.5,
    backgroundColor: AppColors.blue100,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
