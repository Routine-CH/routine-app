import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { IFormTodoInputs } from "../../utils/types/types";

export const createTodoRequest = async ({
  title,
  description,
  plannedDate,
}: IFormTodoInputs) => {
  let errorMessage = "";

  try {
    if (title && description && plannedDate) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const formattedDate = plannedDate.toISOString().split("T")[0];
        const newTodoData = {
          title: title,
          description: description,
          plannedDate: formattedDate,
        };

        const response = await apiClient.post(
          `${API_BASE_URL}todos`,
          newTodoData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 201) {
          throw new Error("Todo creation failed");
        }

        return response;
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error: any) {
    errorMessage = error;
    return errorMessage;
  }
};
