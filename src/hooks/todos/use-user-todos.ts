import { useEffect, useState } from "react";
import { getUserTodos } from "../../data/todo/fetch-requests";
import { UserTodo } from "../../utils/types/types";

 const useUserTodos = () => {
  const [userTodos, setUserTodos] = useState<UserTodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserTodos()
    .then(setUserTodos)
    .catch((error) => console.error("Failed to get Future User Todos", error))
    .finally(() => setIsLoading(false))
  }, []);

  return { userTodos, isLoading, setUserTodos };
};

export { useUserTodos };

