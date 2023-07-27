import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { IFormTodoInputs } from "../../utils/types/types";

export const updateUserTodoCompletedRequest = async ({
id,  title, description, plannedDate, completed
    }: IFormTodoInputs) => {
      let errorMessage = "";

      try {
        if (id && title && description && plannedDate) {
          const token = await AsyncStorage.getItem("access_token");
          
          if (token) {
            const updatedTodoData = {
              title: title,
              description: description,
              plannedDate: plannedDate,
              completed: completed
            };

            const response = await apiClient.patch(
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
            return {error: "Etwas ging schief"}
        }
      } catch (error: any) {
            errorMessage = error;
            return errorMessage
      }
    };
    
