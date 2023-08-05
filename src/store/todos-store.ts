import { create } from "zustand";
import { getUpcomingTodos } from "../data/todo/fetch-requests";
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
};

export const useTodoStore = create<TodoState & TodoActions>((set) => ({
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
}));