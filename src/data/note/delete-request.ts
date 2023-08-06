import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserNotes } from "../../utils/types/types";

export const deleteNoteRequest = async (note: UserNotes | undefined) => {
  try {
    if (note) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const noteId = note.id;

        const response = await apiClient.delete(
          `${API_BASE_URL}notes/${noteId}`,
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
    console.error("Failed to delete note", error);
  }
};
