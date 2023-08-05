import { create } from "zustand";
import { getUpcomingTodos } from "../data/todo/fetch-requests";
import { UserTodo } from "../utils/types/types";

export type TodoState = {
      userTodos: UserTodo[];
      isLoading: boolean;
      dataUpdated: boolean;
}

type TodoActions = {
      setUserTodos: (todos: UserTodo[]) => void;
      loadUserTodos: () => Promise<void>
      setDataUpdated: (updated: boolean) => void;
}

export const useTodoStore = create<TodoState & TodoActions>((set) => ({
      userTodos: [],
      isLoading: false,
      dataUpdated: false,
      setUserTodos: (todos) => set({userTodos: todos}),
      setDataUpdated: (updated) => set({dataUpdated: updated}),
      loadUserTodos:async () => {
            set({isLoading: true})
            try {
                  const todos = await getUpcomingTodos();
                  set({userTodos: todos, dataUpdated: false})
            } catch (error) {
                  console.error("Failed to get user Todos", error)
            } finally{
                  set({isLoading: false})
            }
      }
}))