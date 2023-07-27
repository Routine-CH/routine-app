import { useEffect, useState } from "react";
import { getTodaysTodos, getUserTodos } from "../../data/todo/fetch-requests";
import { UserTodo } from "../../utils/types/types";

 const useUserTodos = () => {
  const [todaysTodo, setTodaysTodo] = useState<UserTodo | null>(null);
  const [userTodos, setUserTodos] = useState<UserTodo[]>([]);
  const [isLoadingTodaysTodo, setIsLoadingTodaysTodo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      getTodaysTodos()
      .then(setTodaysTodo)
      .catch((error) => console.error("Failed to get Todays User Todos", error))
      .finally(() => {setIsLoadingTodaysTodo(false)})

    getUserTodos()
    .then(setUserTodos)
    .catch((error) => console.error("Failed to get Future User Todos", error))
    .finally(() => setIsLoading(false))
  }, []);

  return { todaysTodo, isLoadingTodaysTodo, userTodos, isLoading };
};

export { useUserTodos };

