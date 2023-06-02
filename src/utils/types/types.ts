// types for Authentication Stack Navigation
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPw: undefined;
};

// types for Main Stack Navigation
export type AuthenticatedStackParamList = {
  Home: {
    screen?: string;
    params?: {
      Timer: undefined;
      Journals: undefined;
      Todos: undefined;
      Notes: undefined;
      Goals: undefined;
      EditTools: undefined;
    };
  };
  Calendar: undefined;
  Discover: {
    screen?: string;
    params?: {
      DiscoverTimer: undefined;
      DiscoverJournals: undefined;
      DiscoverTodos: undefined;
      DiscoverNotes: undefined;
      DiscoverGoals: undefined;
    };
  };
  Profile: {
      screen?: string;
      params?: {
            ProfileBadges: undefined;
      }
  };
};

export type UserBadges = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  activityType: string;
};

interface UserLogins {
  id: string;
  streakCount: number;
  loginCount: number;
  lastBonusDate: Date;
}

export type UserJournals = {
  id: string;
  title: string;
  mood: string;
  moodDescription: string;
  activity: string;
  toImprove: string;
};

export type AllUserJournals = UserJournals[];


export type UserGoals = {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  completed: boolean;
  todos: UserTodo[];
};
export interface UserTool {
  id: string;
  screenName: string;
  titleKey: string;
}

export type UserTodo = {
  id: string;
  goalId?: string;
  title: string;
  description: string;
  plannedDate: Date;
  completed: boolean;
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
  id: string;
  goalsEmailNotification: boolean;
  goalsPushNotification: boolean;
  todosEmailNotification: boolean;
  todosPushNotification: boolean;
  journalsEmailNotification: boolean;
  journalsPushNotification: boolean;
  muteAllEmailNotification: boolean;
  muteGamification: boolean;
};

export interface FullUserData
  extends UserBadges,
    UserLogins,
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
  experience: number;
}

export interface UserMe {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  userGoals: UserGoals[];
  userTools: { tool: UserTool }[];
  createdAt: string | undefined;
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
