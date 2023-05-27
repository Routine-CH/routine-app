import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Declare your stack navigator
const DiscoverStack = createNativeStackNavigator();

// Wrap your DiscoverScreen and the other screens in the stack navigator
const DiscoverStackNavigator: React.FC = () => {
  return (
    <DiscoverStack.Navigator initialRouteName='Discover'>
      <DiscoverStack.Screen name='Discover' component={DiscoverScreen} />
      <DiscoverStack.Screen name='Timer' component={TimerScreen} />
      <DiscoverStack.Screen name='Journals' component={JournalsScreen} />
      <DiscoverStack.Screen name='Todos' component={TodosScreen} />
      <DiscoverStack.Screen name='Notes' component={NotesScreen} />
      <DiscoverStack.Screen name='Goals' component={GoalsScreen} />
    </DiscoverStack.Navigator>
  );
};
