import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import {
  AxiosErrorWithData,
  IFormJournalInputs,
} from "../../utils/types/types";

export const createUserJournalRequest = async ({
  title,
  moodDescription,
  activity,
  toImprove,
  thoughtsAndIdeas,
  moods,
}: IFormJournalInputs) => {
  try {
    if (title && moodDescription && activity && toImprove && moods) {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const newJournalData = {
          title: title,
          moodDescription: moodDescription,
          activity: activity,
          toImprove: toImprove,
          thoughtsAndIdeas: thoughtsAndIdeas,
          moods: moods.map((mood) => ({ id: mood.id })),
        };

        const response = await apiClient.post(
          `${API_BASE_URL}journals`,
          newJournalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 201) {
          throw new Error("Journal Creation failed");
        }
        return response;
      }
    } else {
      return "Please fill in all the fields";
    }
  } catch (error) {
    const errorMessage = error as AxiosErrorWithData;
    return errorMessage.response.data.message;
  }
};
