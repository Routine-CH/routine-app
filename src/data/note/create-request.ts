import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";
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
  console.log("Data received");
  try {
    if (title && description) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        console.log("token available");
        console.log("here images", images);

        // Initialize newNoteData as FormData
        let newNoteData = new FormData();
        newNoteData.append("title", title);
        newNoteData.append("description", description);

        // Check if images are available before adding to newNoteData
        if (images && images.length > 0) {
          images.forEach((image) => {
            const randomIndex = Math.floor(Math.random() * images.length);
            // @ts-ignore: Unreachable code error
            newNoteData.append("images", {
              uri: image.uri.replace("file://", ""),
              type: image.type || "image/jpeg",
              name: `image${randomIndex}.${
                image.type ? image.type.split("/")[1] : "jpg"
              }}`,
            });
          });
        }

        console.log(newNoteData);

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
          showToast(
            ToastType.error,
            response.data?.message || "Note creation failed"
          );
          throw new Error("Note creation failed");
        }

        console.log("Note created successfully", response);
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
