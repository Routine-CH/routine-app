import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";
import { IFormJournalInputs } from "../../utils/types/types";

export const createUserJournalRequest = async ({
  title,
  moodDescription,
  activity,
  toImprove,
  thoughtsAndIdeas,
  moods,
}: IFormJournalInputs) => {
  let errorMessage = "";

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
          showToast(ToastType.error, response.data.message);
          throw new Error("Journal Creation failed")
        }
        console.log("Journal created successfully", response);
        return response
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error: any) {
    errorMessage = error;
    console.log(error);
    return errorMessage
}
};
