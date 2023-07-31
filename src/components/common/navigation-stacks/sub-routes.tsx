import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AudioScreen from "../../../screens/audio-screen";
import BadgesScreen from "../../../screens/badges-screen";
import EditJournalScreen from "../../../screens/edit-journals-screen";
import EditNotesScreen from "../../../screens/edit-notes-screen";
import EditTodosScreen from "../../../screens/edit-todos-screen";
import EditToolsScreen from "../../../screens/edit-tools-screen";
import GoalsScreen from "../../../screens/goals-screen";
import JournalsScreen from "../../../screens/journals-screen";
import NewJournalScreen from "../../../screens/new-journal-screen";
import NewNotesScreen from "../../../screens/new-notes-screen";
import NewTodosScreen from "../../../screens/new-todos-screen";
import NoteViewScreen from "../../../screens/note-view-screen";
import NotesScreen from "../../../screens/notes-screen";
import ProfileSettingsScreen from "../../../screens/profile-settings-screen";
import TimerScreen from "../../../screens/timer-screen";
import TodosScreen from "../../../screens/todos-screen";

const SubRoutes: React.FC = () => {
  const SubRoutesStack = createNativeStackNavigator();

  return (
    <SubRoutesStack.Navigator screenOptions={{ headerShown: false }}>
      <SubRoutesStack.Screen
        name='Timer'
        component={TimerScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='Journals'
        component={JournalsScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='JournalNew'
        component={NewJournalScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='JournalEdit'
        /* @ts-ignore: TODO: fix this */
        component={EditJournalScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='Notes'
        component={NotesScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='NotesNew'
        component={NewNotesScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='NoteView'
        /* @ts-ignore: TODO: fix this */
        component={NoteViewScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='NoteEdit'
        /* @ts-ignore: TODO: fix this */
        component={EditNotesScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='Todos'
        component={TodosScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='TodosNew'
        component={NewTodosScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='TodosEdit'
        /* @ts-ignore: TODO: fix this */
        component={EditTodosScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='Goals'
        component={GoalsScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='EditTools'
        component={EditToolsScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='Audio'
        component={AudioScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='ProfileSettings'
        /* @ts-ignore: TODO: fix this */
        component={ProfileSettingsScreen}
        options={{ headerShown: false }}
      />
      <SubRoutesStack.Screen
        name='ProfileBadges'
        component={BadgesScreen}
        options={{ headerShown: false }}
      />
    </SubRoutesStack.Navigator>
  );
};

export default SubRoutes;
