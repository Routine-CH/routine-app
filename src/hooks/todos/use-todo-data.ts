import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { UserTodo } from "../../utils/types/types";

export const useTodoData = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState<UserTodo | null>(null);

  useEffect(() => {
    async function getNoteById() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(
            `${API_BASE_URL}todos/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setTodo(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getNoteById();
  }, [id]);

  return { todo, isLoading };
};
