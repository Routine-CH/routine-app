import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config/config";

export async function adjustAllNotifications(id: string, isEnabled: boolean) {
  const token = await AsyncStorage.getItem("access_token");

  try {
    if (token) {
      const response = await axios.patch(
        `${API_BASE_URL}users/${id}/notification-settings`,
        {
          notificationType: "muteAllNotifications",
          isEnabled: isEnabled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to update all notifications", error);
  }
}

export async function adjustGamificationNotification(
  id: string,
  isEnabled: boolean
) {
  const token = await AsyncStorage.getItem("access_token");

  try {
    if (token) {
      const response = await axios.patch(
        `${API_BASE_URL}users/${id}/notification-settings`,
        {
          notificationType: "muteGamification",
          isEnabled: isEnabled,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to update gamification notification", error);
  }
}
