import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";
import { IFormNoteInputs } from "../../utils/types/types";

export const updateNoteRequest = async ({
 noteId,
  title,
  description,
  images = [],
}: IFormNoteInputs) => {
  try {
    if (noteId && title && description) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        console.log("Token available");

        const newNoteData = new FormData();
        newNoteData.append("title", title);
        newNoteData.append("description", description);

        if (images && images.length > 0) {
          images.forEach((image, index) => {
            newNoteData.append(`images[${index}][id]`, image.id);
            newNoteData.append(`images[${index}][imageUrl]`, image.imageUrl);
          });
        }

        const response = await apiClient.patch(
          `${API_BASE_URL}notes/${noteId}`,
          newNoteData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) {
          showToast(
            ToastType.error,
            response.data?.message || "Note update failed"
          );
          throw new Error("Note update failed");
        }

        console.log("Note updated successfully", response);
        return response;
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error) {
    console.log(error);
  }
};