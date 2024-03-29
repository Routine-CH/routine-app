import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config/config";

export const getUserNotes = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const notesData = response.data.data;

  return notesData.length > 0 ? notesData : [];
};

export const getNoteById = async (noteId: string) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      const response = await axios.get(`${API_BASE_URL}notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
