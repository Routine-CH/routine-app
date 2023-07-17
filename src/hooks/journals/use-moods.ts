// hooks/useMoods.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";

export const useMoods = () => {
  const [moods, setMoods] = useState<[{ id: string; type: string }]>();

  useEffect(() => {
    async function getJournalMoods() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}journals/moods`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setMoods(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get user notes", error);
      }
    }

    getJournalMoods();
  }, []);

  return { moods, setMoods };
};
