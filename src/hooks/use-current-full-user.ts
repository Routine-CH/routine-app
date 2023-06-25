import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import apiClient from "../utils/config/api-client";
import { API_BASE_URL } from "../utils/config/config";
import { FullUserData } from "../utils/types/types";

const useCurrentFullUser = () => {
  const [currentUser, setCurrentUser] = useState<FullUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("access_token");
        if (!accessToken) {
          setLoading(false);
          return;
        }
        const response = await apiClient.get(`${API_BASE_URL}users/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const currentUser = response.data.data;
        setCurrentUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, loading };
};

export default useCurrentFullUser;
