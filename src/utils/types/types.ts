import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

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

export type AllUserGoals = UserGoals[];

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

export type AllUserNotes = UserNotes[];

export type UserTodo = {
  id: string;
  goalId?: string;
  title: string;
  description: string;
  plannedDate: Date;
  completed: boolean;
  createdAt: Date;
};

export type AllUserTodos = UserTodo[];

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
  setUserJounals?: Dispatch<SetStateAction<AllUserJournals | null>>;
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
  id?: string;
  imageUrl?: string;
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
