import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserJournals } from "../../utils/types/types";

export const updateUserJournal = async (
  journal: UserJournals | null,
  updatedTitle: string,
  updatedMoodDescription: string,
  updatedActivity: string,
  updatedToImprove: string
) => {
  try {
    if (journal !== null) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {

        const updatedJournalData = {
          title: updatedTitle,
          moodDescription: updatedMoodDescription,
          activity: updatedActivity,
          toImprove: updatedToImprove,
        };

        const response = await apiClient.patch(
          `${API_BASE_URL}journals/${journal.id}`,
          updatedJournalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Journal updated successfully", response);
      }
    }
  } catch (error) {
    console.error("Failed to update user journal", error);
  }
};
