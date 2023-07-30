import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { UserGamification } from "../../utils/types/profile/types";
import { AxiosErrorWithData } from "../../utils/types/types";

export const useGamificationUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfileData, setUserProfileData] =
    useState<UserGamification | null>(null);

  useEffect(() => {
    async function getUserGamification() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await apiClient.get(
            `${API_BASE_URL}users/me/gamification`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserProfileData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        const axiosError = error as AxiosErrorWithData;
        console.log(axiosError);
      }
    }
    getUserGamification();
  }, []);

  return { isLoading, userProfileData };
};
