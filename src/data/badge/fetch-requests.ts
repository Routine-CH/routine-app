import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config/config";

export async function getUserBadgeById(id: string) {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) return;
    const response = await axios.get(`${API_BASE_URL}badges/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const badge = response.data.data;

    return badge;
  } catch (error) {
    console.error("Failed to get user badges", error);
  }
}
