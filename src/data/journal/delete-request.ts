import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserJournals } from "../../utils/types/types";

export const deleteUserJournalRequest = async (
  journal: UserJournals | null,
) => {
  try {
    if (journal !== null) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {

        const response = await apiClient.delete(
          `${API_BASE_URL}journals/${journal.id}`,
                    {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Journal deleted successfully", response);
      }
    }
  } catch (error) {
    console.error("Failed to delete user journal", error);
  }
};
