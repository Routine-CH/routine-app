import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { IFormNoteInputs } from "../../utils/types/types";

export const updateNoteRequest = async ({
  noteId, title, description, images = []
}: IFormNoteInputs) => {
  let errorMessage = "";
      
  try {
    if (noteId && title && description) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const updatedNotesData = {
          title: title,
          description: description,
          images: images.map((image) => ({
            id: image.id,
            imageUrl: image.imageUrl,
          })),
        };

        const response = await apiClient.patch(
          `${API_BASE_URL}notes/${noteId}`,
          updatedNotesData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response;
      }
    } else {
        return {error: "Bitte wähle alle Felder an"}
    }
  } catch (error: any) {
        errorMessage = error;
        return errorMessage
  }
};