import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserJournals } from "../../utils/types/types";

export const deleteUserJournalRequest = async (
  journal: UserJournals | null
) => {
  try {
    if (journal) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const journalId = journal.id;

        const response = await apiClient.delete(
          `${API_BASE_URL}journals/${journalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      }
    }
  } catch (error) {
    console.error("Failed to delete user journal", error);
  }
};
