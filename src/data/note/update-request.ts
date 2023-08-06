import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";
import { AxiosErrorWithData, IFormNoteInputs } from "../../utils/types/types";

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
        const newNoteData = new FormData();
        newNoteData.append("title", title);
        newNoteData.append("description", description);

        // check if images are available before adding to newNoteData
        if (images && images.length > 0) {
          images.forEach((image) => {
            const randomIndex = Math.floor(Math.random() * 500);

            let imageUri = image.uri;

            // if imageUrl exists, use it. Otherwise, stick to existing logic for URI.
            if (image.imageUrl) {
              imageUri = image.imageUrl;
            } else {
              imageUri = imageUri.replace("file://", "");
            }

            // @ts-ignore: Unreachable code error
            newNoteData.append("images", {
              uri: imageUri,
              type: image.type || "image/jpeg",
              name: `image${randomIndex}.jpg`,
            });
          });
        }

        const response = await apiClient.put(
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
        return response;
      }
    } else {
      console.error("Some data is empty");
    }
  } catch (error) {
    const axiosError = error as AxiosErrorWithData;
    console.log("headers", axiosError.response.headers);
    console.log("data", axiosError.response.data);
    console.log("response", axiosError.response);
  }
};
