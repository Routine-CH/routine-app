import { NotificationSettings } from "../types";

// types for Authentication Stack Navigation
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPw: undefined;
};

// types for Main Stack Navigation
export type AuthenticatedStackParamList = {
  Home: undefined;
  Journals: undefined;
  EditTools: undefined;
  JournalEdit: { id: string };
  JournalNew: undefined;
  Calendar: undefined;
  CameraView: undefined;
  SubRoutes: {
    screen?: string;
    params?: {
      id?: string;
      DiscoverAudio?: any;
    };
  };
  Notes: undefined;
  NoteView: { id: string };
  NotesEdit: { id: string };
  NotesNew: undefined;
  Todos: undefined;
  TodosEdit: { id: string };
  TodosNew: undefined;
  Goals: undefined;
  GoalsEdit: { id: string };
  GoalsNew: undefined;
  Timer: undefined;
  ProfileBadges?: undefined;
  Profile: undefined;
  ProfileNotifications: { notificationSettings: NotificationSettings };
  ProfileSettings: { id: string };
};