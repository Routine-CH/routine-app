import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../utils/config/config";
import { UserSettings } from "../../utils/types/types";

export const useMinimalUser = (userId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserSettings | null>(null);

  useEffect(() => {
    async function getUserById() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await fetch(`${API_BASE_URL}users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          setUser(data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserById();
  }, [userId]);

  return { user, isLoading };
};
