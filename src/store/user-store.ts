import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { API_BASE_URL } from "../utils/config/config";
import { NotificationSettings, UserSettings } from "../utils/types/types";

type UserState = {
  user: UserSettings | null;
  isLoading: boolean;
  dataUpdated: boolean;
};

type UserAction = {
  fetchUser: (userId: string | null) => void;
  setDataUpdated: (value: boolean) => void;
  updateUserNotifications: (settings: {
    muteGamification?: boolean;
    muteAllNotifications?: boolean;
  }) => void;
};

export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  isLoading: false,
  dataUpdated: false,
  fetchUser: async (userId: string | null) => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token && userId) {
        const response = await fetch(`${API_BASE_URL}users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        set({
          user: data.data,
          isLoading: false,
          dataUpdated: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.log(error);
      set({
        isLoading: false,
        dataUpdated: false,
      });
    }
  },
  setDataUpdated: (value: boolean) => set({ dataUpdated: value }),
  updateUserNotifications: (settings: {
    muteGamification?: boolean;
    muteAllNotifications?: boolean;
  }) => {
    set((state) => {
      if (!state.user) return state;

      const newNotificationSettings: NotificationSettings = {
        ...state.user.notificationSettings,
        ...settings,
      };

      return {
        ...state,
        user: {
          ...state.user,
          notificationSettings: newNotificationSettings,
        },
      };
    });
  },
}));
