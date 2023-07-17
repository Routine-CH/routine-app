import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { UserJournals } from "../../utils/types/types";

export const useJournalData = (journalId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [journal, setJournal] = useState<UserJournals | null>(null);

  useEffect(() => {
    async function getJournalById() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(
            `${API_BASE_URL}journals/${journalId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setJournal(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getJournalById();
  }, [journalId]);

  return { journal, isLoading };
};
