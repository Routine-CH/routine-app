import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";

export const createUserJournalRequest = async (
  title: string,
  moodDescription: string,
  activity: string,
  toImprove: string,
  thoughtsAndIdeas: string,
  moods: {id: string; type: string}[]
) => {
      const [errorMessage, setErrorMessage] = useState("")

  try {
    if (title && moodDescription && activity && toImprove && thoughtsAndIdeas) {
      console.log("Data has been filled out");

      const token = await AsyncStorage.getItem("access_token");
      if (token) {
            console.log("Token available")

            const newJournalData = {
          title: title,
          moodDescription: moodDescription,
          activity: activity,
          toImprove: toImprove,
          thoughtsAndIdeas: thoughtsAndIdeas,
          moods: moods.map((mood) => mood.id)
        };

        console.log(newJournalData)

        const response = await apiClient.post(
          `${API_BASE_URL}journals`, newJournalData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 201) {
            showToast(ToastType.error, response.data.message)
        }
        console.log("Journal created successfully", response);
      }
    } else {
      console.log("Some data is empty");
    }
  } catch (error) {
      
    const onErrors = (errors: any) => {
      if (errors.title) {
            setErrorMessage(errors.title)
      } else if (errors.moodDescription) {
            setErrorMessage(errors.moodDescription.message)
      } else if (errors.activity) {
            setErrorMessage(errors.activity.message)
      } else if (errors.toImprove) {
            setErrorMessage(errors.toImprove)
      }
    }
    useEffect(() => {
      if (errorMessage) {
            showToast(ToastType.error, errorMessage)
            setErrorMessage("")
      }
}, [errorMessage])
  }
};