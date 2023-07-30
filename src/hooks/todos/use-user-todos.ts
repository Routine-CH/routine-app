import { useEffect, useState } from "react";
import { getUpcomingTodos, getUserTodos } from "../../data/todo/fetch-requests";
import { UserTodo } from "../../utils/types/types";

const useUserTodos = () => {
  const [userTodos, setUserTodos] = useState<UserTodo[]>([]);
  const [upcomingTodos, setUpcomingTodos] = useState<{
    [date: string]: UserTodo[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpcomingTodos, setIsLoadingUpcomingTodos] = useState(true);

  useEffect(() => {
    getUserTodos()
      .then(setUserTodos)
      .catch((error) => console.error("Failed to get User Todos", error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getUpcomingTodos()
      .then(setUpcomingTodos)
      .catch((error) => console.error("Failed to get upcoming Todos", error))
      .finally(() => setIsLoadingUpcomingTodos(false));
  }, []);

  //   console.log(upcomingTodos)

  return {
    userTodos,
    isLoading,
    setUserTodos,
    upcomingTodos,
    isLoadingUpcomingTodos,
    setUpcomingTodos,
  };
};

export { useUserTodos };
