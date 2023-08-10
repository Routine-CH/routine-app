import { UserBadge } from "../profile/types";
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
  EditTools: undefined;
  Calendar: undefined;
  CameraView: undefined;
  SubRoutes: {
    screen?: string;
    params?: {
      id?: string;
      DiscoverAudio?: any;
      editable?: boolean;
      badges?: UserBadge[] | null;
    };
  };
  Journals: undefined;
  JournalNew: undefined;
  JournalView: { id: string };
  JournalEdit: { id: string; editable?: boolean };
  Notes: undefined;
  NoteView: { id: string };
  NotesEdit: { id: string };
  NotesNew: undefined;
  Todos: undefined;
  TodosEdit: { id: string };
  TodosNew: undefined;
  Goals: undefined;
  GoalsView: { id: string };
  GoalsEdit: { id: string };
  GoalsNew: undefined;
  Timer: undefined;
  ProfileBadges: undefined;
  ProfileBadgesDetailView: undefined;
  Profile: undefined;
  ProfileNotifications: { notificationSettings: NotificationSettings };
  ProfileSettings: { id: string };
};
