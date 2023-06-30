import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditJournalScreen from "../../../screens/edit-journals-screen";
import EditToolsScreen from "../../../screens/edit-tools-screen";
import GoalsScreen from "../../../screens/goals-screen";
import HomeScreen from "../../../screens/home-screen";
import JournalsScreen from "../../../screens/journals-screen";
import NotesScreen from "../../../screens/notes-screen";
import TimerScreen from "../../../screens/timer-screen";
import TodosScreen from "../../../screens/todos-screen";

// declare stack navigator
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="UserHome"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="UserHome" component={HomeScreen} />
      <HomeStack.Screen name="Timer" component={TimerScreen} />
      <HomeStack.Screen name="Journals" component={JournalsScreen} />
      <HomeStack.Screen name="JournalEdit" component={EditJournalScreen} />
      <HomeStack.Screen name="Todos" component={TodosScreen} />
      <HomeStack.Screen name="Notes" component={NotesScreen} />
      <HomeStack.Screen name="Goals" component={GoalsScreen} />
      <HomeStack.Screen name="EditTools" component={EditToolsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
