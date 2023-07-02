import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserNotes } from "../../utils/types/types";

export const updateNoteRequest = async (
  note: UserNotes | null,
  updatedTitle: string,
  updatedDescription: string,
) => {
  try {
    if (note !== null) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {

        const updatedNotesData = {
          title: updatedTitle,
          description: updatedDescription,
        };

        const response = await apiClient.patch(
          `${API_BASE_URL}notes/${note.id}`,
          updatedNotesData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Notes updated successfully", response);
      }
    }
  } catch (error) {
    console.error("Failed to update user notes", error);
  }
};