import { AxiosError, AxiosResponse } from "axios";

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

export type UserBadges = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  activityType: string;
}[];

interface UserLogins {
  id: string;
  streakCount: number;
  loginCount: number;
  lastBonusDate: Date;
}

export type UserJournals = {
  id: string;
  title: string;
  journalMoods: JournalMood[];
  moodDescription: string;
  activity: string;
  toImprove: string;
  createdAt: Date;
  thoughtsAndIdeas: string;
};

export type JournalMood = {
  id: string;
  mood: {
    id: any;
    type: string;
  };
};

export type AllUserJournals = UserJournals[];

export type UserGoals = {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  completed: boolean;
  todos: UserTodo[];
  createdAt: Date;
};

export interface UserTool {
  id: string;
  screenName: string;
  titleKey: string;
}

export interface UserNotes {
  id: string;
  title: string;
  description: string;
  images: Image[];
  createdAt: Date;
}

export type UserTodo = {
  id: string;
  goalId?: string;
  title: string;
  description: string;
  plannedDate: Date;
  completed: boolean;
  createdAt: Date;
};

export type UserPomodoroTimers = {
  id: string;
  totalDuration: number;
};

export type UserMeditations = {
  id: string;
  totalDuration: number;
};

export type NotificationSettings = {
  goalsEmailNotification: boolean;
  goalsPushNotification: boolean;
  todosEmailNotification: boolean;
  todosPushNotification: boolean;
  journalsEmailNotification: boolean;
  journalsPushNotification: boolean;
  muteAllNotifications: boolean;
  muteGamification: boolean;
};

export interface FullUserData
  extends UserLogins,
    UserJournals,
    UserGoals,
    UserTodo,
    UserPomodoroTimers,
    UserMeditations,
    NotificationSettings {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  password: string;
  badges: UserBadges[];
  userLogins: UserLogins[];
  experience: number;
  createdAt: Date;
}

export interface UserMe {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  userGoals: UserGoals[];
  userTools: { tool: UserTool }[];
  // TODO: FIX ANY TYPE
  createdAt: any;
}

export interface UserSettings {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  notificationSettings: NotificationSettings;
}

export interface AudioParams {
  title: string;
  image: any;
  minutes: string;
  informationText: string;
  toolsFor: string[];
}

export interface IFormLoginInputs {
  username: string;
  password: string;
}

export interface IFormRegisterInputs {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreeTerms: boolean;
}

export interface IFormJournalInputs {
  journal?: string;
  journalId?: string;
  title: string;
  moodDescription: string;
  activity: string;
  toImprove: string;
  thoughtsAndIdeas?: string;
  moods: { id: string; type: string }[];
}

export interface IFormNoteInputs {
  note?: string;
  noteId?: string;
  title: string;
  description: string;
  images?: Image[];
}

export interface IFormTodoInputs {
  todo?: string;
  id?: string;
  title?: string;
  description?: string;
  plannedDate: Date;
  completed?: boolean;
}

export interface Image {
  uri: string;
  type?: string;
  filename?: string;
}

export type AxiosErrorWithData = AxiosError & {
  response: AxiosResponse<ErrorResponse>;
};

type ErrorResponse = {
  message: string;
  errorCode: number;
};
