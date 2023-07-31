import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditJournalScreen from "../../../screens/edit-journals-screen";
import EditNotesScreen from "../../../screens/edit-notes-screen";
import EditTodosScreen from "../../../screens/edit-todos-screen";
import EditToolsScreen from "../../../screens/edit-tools-screen";
import GoalsScreen from "../../../screens/goals-screen";
import HomeScreen from "../../../screens/home-screen";
import JournalsScreen from "../../../screens/journals-screen";
import NewJournalScreen from "../../../screens/new-journal-screen";
import NewNotesScreen from "../../../screens/new-notes-screen";
import NewTodosScreen from "../../../screens/new-todos-screen";
import NoteViewScreen from "../../../screens/note-view-screen";
import NotesScreen from "../../../screens/notes-screen";
import TimerScreen from "../../../screens/timer-screen";
import TodosScreen from "../../../screens/todos-screen";
import { CameraView } from "../camera/camera-view";

// declare stack navigator
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='UserHome'
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Navigator
        initialRouteName='UserHome'
        screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen name='UserHome' component={HomeScreen} />
        <HomeStack.Screen name='CameraView' component={CameraView} />
        <HomeStack.Screen name='Timer' component={TimerScreen} />
        <HomeStack.Screen name='Journals' component={JournalsScreen} />
        {/* @ts-ignore: TODO: fix this */}
        <HomeStack.Screen name='JournalEdit' component={EditJournalScreen} />
        <HomeStack.Screen name='JournalNew' component={NewJournalScreen} />
        <HomeStack.Screen name='Todos' component={TodosScreen} />
        {/* @ts-ignore: TODO: fix this */}
        <HomeStack.Screen name='TodosEdit' component={EditTodosScreen} />
        <HomeStack.Screen name='TodosNew' component={NewTodosScreen} />
        <HomeStack.Screen name='Notes' component={NotesScreen} />
        {/* @ts-ignore: TODO: fix this */}
        <HomeStack.Screen name='NotesEdit' component={EditNotesScreen} />
        <HomeStack.Screen name='NotesNew' component={NewNotesScreen} />
        {/* @ts-ignore: TODO: fix this */}
        <HomeStack.Screen name='NoteView' component={NoteViewScreen} />
        <HomeStack.Screen name='Goals' component={GoalsScreen} />
        <HomeStack.Screen name='EditTools' component={EditToolsScreen} />
      </HomeStack.Navigator>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
