import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "../../../screens/discover-screen";
import GoalsScreen from "../../../screens/goals-screen";
import JournalsScreen from "../../../screens/journals-screen";
import NotesScreen from "../../../screens/notes-screen";
import TimerScreen from "../../../screens/timer-screen";
import TodosScreen from "../../../screens/todos-screen";

// Declare your stack navigator
const DiscoverStack = createNativeStackNavigator();

// Wrap your DiscoverScreen and the other screens in the stack navigator
const DiscoverStackNavigator: React.FC = () => {
  return (
    <DiscoverStack.Navigator
      initialRouteName='DiscoverHome'
      screenOptions={{ headerShown: false }}
    >
      <DiscoverStack.Screen name='DiscoverHome' component={DiscoverScreen} />
      <DiscoverStack.Screen name='Timer' component={TimerScreen} />
      <DiscoverStack.Screen name='Journals' component={JournalsScreen} />
      <DiscoverStack.Screen name='Todos' component={TodosScreen} />
      <DiscoverStack.Screen name='Notes' component={NotesScreen} />
      <DiscoverStack.Screen name='Goals' component={GoalsScreen} />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackNavigator;
