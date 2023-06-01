import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";

export const setFavouriteToolsRequest = async ({
  favouriteToolsId,
  currentUserId,
}: {
  favouriteToolsId: string[];
  currentUserId: string | undefined;
}) => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");

    const response = await apiClient.patch(
      `${API_BASE_URL}users/${currentUserId}/favourite-tools`,
      { toolIds: favouriteToolsId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Favourite tools updated successfully!",
        data: response.data.data,
      };
    }
  } catch (error) {
    console.error("Editing favourite tools failed:", error);
  }
};
