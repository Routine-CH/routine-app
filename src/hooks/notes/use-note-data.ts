import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { UserNotes } from "../../utils/types/types";

export const useNoteData = (noteId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState<UserNotes | null>(null);

  useEffect(() => {
    async function getNoteById() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(
            `${API_BASE_URL}notes/${noteId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setNote(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getNoteById();
  }, [noteId]);

  return { note, isLoading };
};
