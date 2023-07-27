import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserTodo } from "../../utils/types/types";

export const updateUserTodoCompletedRequest = async ({
id,  completed
    }: UserTodo) => {
      let errorMessage = "";

      try {
        if (id && completed) {
          const token = await AsyncStorage.getItem("access_token");
          if (token) {
            const updatedTodoData = {
              completed: completed
            };
    
            const response = await apiClient.put(
              `${API_BASE_URL}todos/${id}`,
              updatedTodoData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
    
            return response;
          }
        } else {
            return {error: "Etwas ging schied"}
        }
      } catch (error: any) {
            errorMessage = error;
            return errorMessage
      }
    };
    
