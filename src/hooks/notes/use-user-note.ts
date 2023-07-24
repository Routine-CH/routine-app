import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { UserNotes } from "../../utils/types/types";

export const useUserNote = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);

  useEffect(() => {
      async function getUserNotes() {
            try {
                  const token = await AsyncStorage.getItem("access_token");
                  if (token) {
                    const response = await axios.get(
                      `${API_BASE_URL}notes`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
          
                    setUserNotes(response.data.data);
                    setIsLoading(false);
                  }
                } catch (error) {
                  console.log(error);
                }
            }
                getUserNotes();
  }, []);

  return {
    userNotes,
    isLoading,
  };
};
