import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";
import { IFormNoteInputs } from "../../utils/types/types";

export const createNoteRequest = async ({ 
  title,
  description,
  image
}: IFormNoteInputs) => {
let errorMessage = "";

  try {
    if (title && description) {

      const token = await AsyncStorage.getItem("access_token");
      if (token) {
      const newNoteData = {
          title: title,
          description: description,
          image: image,
        };

        const response = await apiClient.post(
          `${API_BASE_URL}notes`, newNoteData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
          if (response.status !== 201) {
            showToast(ToastType.error, response.data.message)
            throw new Error("Note Creation failed")
          }
          console.log("Note created successfully", response)
          return response
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error: any) {
      errorMessage = error;
      console.log("Error", error.response);
      return errorMessage
 }
};