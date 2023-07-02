import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";

export const createUserJournalRequest = async (
  title: string,
  moodDescription: string,
  activity: string,
  toImprove: string
) => {
  try {
    if (title && moodDescription && activity && toImprove) {
      console.log("Data has been filled out");

      const token = await AsyncStorage.getItem("access_token");
      if (token) {
            console.log("Token available")

            const newJournalData = {
          title: title,
          moodDescription: moodDescription,
          activity: activity,
          toImprove: toImprove,
        };

        const response = await apiClient.post(
          `${API_BASE_URL}journals`, newJournalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Journal created successfully", response);
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error) {
    console.error("Failed to create user journal", error);
  }
};
