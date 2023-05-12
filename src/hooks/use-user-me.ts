import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import apiClient from "../utils/config/api-client";
import { API_BASE_URL } from "../utils/config/config";
import { UserMe } from "../utils/types/types";

const useUserMe = () => {
  const [currentUser, setCurrentUser] = useState<UserMe | null>(null);
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

        setCurrentUser(response.data.data);
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

export default useUserMe;
