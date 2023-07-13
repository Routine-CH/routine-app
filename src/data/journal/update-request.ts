import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { IFormJournalInputs } from "../../utils/types/types";

export const updateUserJournalRequest = async ({
      journalId,
      title,
      moodDescription,
      activity,
      toImprove,
      thoughtsAndIdeas,
      moods,
    }: IFormJournalInputs) => {
      let errorMessage = "";

      try {
        if (journalId && title && moodDescription && activity && toImprove && moods.length !== 0) {
          const token = await AsyncStorage.getItem("access_token");
          if (token) {
            const updatedJournalData = {
              title: title,
              moodDescription: moodDescription,
              activity: activity,
              toImprove: toImprove,
              thoughtsAndIdeas: thoughtsAndIdeas,
              moods: moods.map((mood) => ({ id: mood.id })),
            };
    
            const response = await apiClient.put(
              `${API_BASE_URL}journals/${journalId}`,
              updatedJournalData,
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
    
