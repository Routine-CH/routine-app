import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config/config";

export const getUserTodos = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const todosData = response.data.data;

  return todosData.length > 0 ? todosData : null;
};

export const getUpcomingTodos =async () => {
      const token = await AsyncStorage.getItem("access_token")
      if (!token) {
            throw new Error("No access token found.");
      }

      const response = await axios.get(`${API_BASE_URL}todos/upcoming`, {
            headers: {
                  Authorization: `Bearer ${token}`,
                },
      })

      const upcomingTodos = response.data.data

      // return upcomingTodos.length > 0 ? upcomingTodos : null
      return upcomingTodos
}