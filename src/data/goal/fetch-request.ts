import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config/config";

export async function getUserGoals() {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      const response = await axios.get(`${API_BASE_URL}goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const goalsData = response.data.data;

      return goalsData.length > 0 ? goalsData : [];
    }
  } catch (error) {
    console.error("Failed to get user goals", error);
  }
}
