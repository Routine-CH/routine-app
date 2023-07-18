type GoalTodoJournal = {
  id: string;
  title: string;
  createdAt: string;
  plannedDate?: string;
};

type CalendarData = {
  goals: GoalTodoJournal[];
  todos: GoalTodoJournal[];
  journals: GoalTodoJournal[];
};

export type CalendarItem = {
  date: string;
  data: CalendarData;
};

export type CalendarResponse = {
  data: CalendarItem[];
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
