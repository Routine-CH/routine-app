import { create } from "zustand";
import {
  getAllUserTodos,
  getUpcomingTodos,
  getUserTodosByGoalId,
} from "../data/todo/fetch-requests";
import { UserTodo } from "../utils/types/types";

export type UpcomingTodos = {
  [date: string]: UserTodo[];
};

export type TodoState = {
  userTodos: UpcomingTodos;
  isLoading: boolean;
  dataUpdated: boolean;
};

type TodoActions = {
  setUserTodos: (
    todos: UpcomingTodos | ((prev: UpcomingTodos) => UpcomingTodos)
  ) => void;
  loadUserTodos: () => Promise<void>;
  setDataUpdated: (updated: boolean) => void;
  getTodoById: (id: string) => UserTodo | undefined;
  getTodosByGoalId: (goalId: string) => Promise<UserTodo[]>;
  getAllTodos: () => Promise<UserTodo[]>;
};

export const useTodoStore = create<TodoState & TodoActions>((set, get) => ({
  userTodos: {},
  isLoading: false,
  dataUpdated: false,
  setUserTodos: (
    todosOrUpdater:
      | UpcomingTodos
      | ((prevTodos: UpcomingTodos) => UpcomingTodos)
  ) => {
    if (typeof todosOrUpdater === "function") {
      set((state) => ({ userTodos: todosOrUpdater(state.userTodos) }));
    } else {
      set({ userTodos: todosOrUpdater });
    }
  },
  setDataUpdated: (updated) => set({ dataUpdated: updated }),
  loadUserTodos: async () => {
    set({ isLoading: true });
    try {
      const todos = await getUpcomingTodos();
      set({ userTodos: todos, dataUpdated: false });
    } catch (error) {
      console.error("Failed to get user Todos", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getTodoById: (id: string) => {
    const todos = get().userTodos;
    for (const date in todos) {
      const todoFound = todos[date].find((todo) => todo.id === id);
      if (todoFound) return todoFound;
    }
    return undefined;
  },
  getTodosByGoalId: async (goalId: string) => {
    const todos = await getUserTodosByGoalId(goalId);
    return todos;
  },
  getAllTodos: async () => {
    const todos = await getAllUserTodos();
    return todos;
  },
}));
