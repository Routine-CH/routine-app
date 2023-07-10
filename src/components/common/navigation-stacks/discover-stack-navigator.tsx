import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AudioScreen from "../../../screens/audio-screen";
import DiscoverScreen from "../../../screens/discover-screen";
import GoalsScreen from "../../../screens/goals-screen";
import JournalsScreen from "../../../screens/journals-screen";
import NotesScreen from "../../../screens/notes-screen";
import TimerScreen from "../../../screens/timer-screen";
import TodosScreen from "../../../screens/todos-screen";

// declare stack navigator
const DiscoverStack = createNativeStackNavigator();

//
const DiscoverStackNavigator: React.FC = () => {
  return (
    <DiscoverStack.Navigator
      initialRouteName="DiscoverHome"
      screenOptions={{ headerShown: false }}
    >
      <DiscoverStack.Screen name="DiscoverHome" component={DiscoverScreen} />
      <DiscoverStack.Screen name="DiscoverTimer" component={TimerScreen} />
      <DiscoverStack.Screen
        name="DiscoverJournals"
        component={JournalsScreen}
      />
      <DiscoverStack.Screen name="DiscoverTodos" component={TodosScreen} />
      <DiscoverStack.Screen name="DiscoverNotes" component={NotesScreen} />
      <DiscoverStack.Screen name="DiscoverGoals" component={GoalsScreen} />
      <DiscoverStack.Screen name="DiscoverAudio" component={AudioScreen} />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackNavigator;
