// types for Authentication Stack Navigation
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPw: undefined;
};

// types for Main Stack Navigation
export type AuthenticatedStackParamList = {
  Home: undefined;
  Calendar: undefined;
  Discover: {
    screen?: string;
    params?: {
      Timer: undefined;
      Journals: undefined;
      Todos: undefined;
      Notes: undefined;
      Goals: undefined;
    };
  };
  Profile: undefined;
};

interface UserBadges {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  activityType: string;
}

interface UserLogins {
  id: string;
  streakCount: number;
  loginCount: number;
  lastBonusDate: Date;
}

interface UserJournals {
  id: string;
  title: string;
  mood: string;
  moodDescription: string;
  activity: string;
  toImprove: string;
}

interface UserGoals {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  completed: boolean;
  todos: UserTodo[];
}

interface UserTodo {
  id: string;
  goalId?: string;
  title: string;
  description: string;
  plannedDate: Date;
  completed: boolean;
}

interface UserPomodoroTimers {
  id: string;
  totalDuration: number;
}

interface UserMeditations {
  id: string;
  totalDuration: number;
}

interface NotificationSettings {
  id: string;
  goalsEmailNotification: boolean;
  goalsPushNotification: boolean;
  todosEmailNotification: boolean;
  todosPushNotification: boolean;
  journalsEmailNotification: boolean;
  journalsPushNotification: boolean;
  muteAllEmailNotification: boolean;
  muteGamification: boolean;
}

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
}
