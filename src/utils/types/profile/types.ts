type Badge = {
  userId: string;
  badgeId: string;
  assignedAt: string;
  badge: {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    activityType: string;
    requiredCountOrDuration: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type JournalDay = {
  date: string;
};

export type UserGamification = {
  id: string;
  username: string;
  avatarUrl: string | null;
  createdAt: Date;
  badgeCount: number;
  badges: Badge[];
  experience: number;
  userStreakCount: number;
  completedTodoCount: number;
  completedGoalsCount: number;
  meditationMinutes: number;
  journalCount: number;
  journalDaysThisWeek: JournalDay[];
};
