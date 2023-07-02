import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";

export const createNoteRequest = async (
  title: string,
  description: string,
) => {
  try {
    if (title && description) {
      console.log("Data has been filled out");

      const token = await AsyncStorage.getItem("access_token");
      if (token) {
            console.log("Token available")

            const newNoteData = {
          title: title,
          description: description,
        };

        const response = await apiClient.post(
          `${API_BASE_URL}notes`, newNoteData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Note created successfully", response);
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error) {
    console.error("Failed to create user note", error);
  }
};