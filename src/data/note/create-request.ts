import AsyncStorage from "@react-native-async-storage/async-storage";

import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import {
  AxiosErrorWithData,
  IFormNoteInputs,
  Image,
} from "../../utils/types/types";

export const createNoteRequest = async ({
  title,
  description,
  images,
}: IFormNoteInputs & { images: Image[] }) => {
  try {
    if (title && description) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        // Initialize newNoteData as FormData
        let newNoteData = new FormData();
        newNoteData.append("title", title);
        newNoteData.append("description", description);

        // Check if images are available before adding to newNoteData
        if (images && images.length > 0) {
          images.forEach((image) => {
            const randomIndex = Math.floor(Math.random() * 500);
            // @ts-ignore: Unreachable code error
            newNoteData.append("images", {
              uri: image.uri.replace("file://", ""),
              type: image.type || "image/jpeg",
              name: `image${randomIndex}.jpg`,
            });
          });
        }

        const response = await apiClient.post(
          `${API_BASE_URL}notes`,
          newNoteData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 201) {
          throw new Error("Note creation failed");
        }

        return response;
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error) {
    const axiosError = error as AxiosErrorWithData;
    console.log("headers", axiosError.response.headers);
    console.log("data", axiosError.response.data);
    console.log("response", axiosError.response);
  }
};
