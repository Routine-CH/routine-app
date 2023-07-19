type GoalTodoJournal = {
  id: string;
  title: string;
  createdAt?: string;
  plannedDate?: string;
  completed?: boolean;
};

export type CalendarData = {
  goals: GoalTodoJournal[];
  todos: GoalTodoJournal[];
  journals: GoalTodoJournal[];
};

export type CalendarItems = {
  date: string;
  data: CalendarData;
};

export type CalendarResponse = {
  data: CalendarItems[];
};

export enum CalendarDataTypes {
  GOALS = "Ziele",
  TODOS = "Todos",
  JOURNALS = "Journal",
}

export interface Day {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
