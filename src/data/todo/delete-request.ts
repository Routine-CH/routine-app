import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserTodo } from "../../utils/types/types";

export const deleteTodoRequest = async (todo: UserTodo | null) => {
  try {
    if (todo) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const id = todo.id;

        const response = await apiClient.delete(`${API_BASE_URL}todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
    }
  } catch (error) {
    console.error("Failed to delete todo", error);
  }
};
