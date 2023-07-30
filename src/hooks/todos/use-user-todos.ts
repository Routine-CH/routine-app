import { useEffect, useState } from "react";
import { getUpcomingTodos } from "../../data/todo/fetch-requests";
import { UserTodo } from "../../utils/types/types";

const useUserTodos = () => {
  const [upcomingTodos, setUpcomingTodos] = useState<{
    [date: string]: UserTodo[];
  }>({});
  const [isLoadingUpcomingTodos, setIsLoadingUpcomingTodos] = useState(true);

  useEffect(() => {
    getUpcomingTodos()
      .then(setUpcomingTodos)
      .catch((error) => console.error("Failed to get upcoming Todos", error))
      .finally(() => setIsLoadingUpcomingTodos(false));
  }, []);

  return {
    upcomingTodos,
    isLoadingUpcomingTodos,
    setUpcomingTodos,
  };
};

export { useUserTodos };
