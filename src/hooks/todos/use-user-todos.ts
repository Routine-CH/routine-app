import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { UserTodo } from "../../utils/types/types";

export const useUserTodos = () => {
  const [userTodos, setUserTodos] = useState<UserTodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserTodos = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}todos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserTodos(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get user todos", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTodos();
  }, []);

  return { userTodos, isLoading };
};
