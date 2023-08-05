import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { formatISO } from "date-fns";
import { API_BASE_URL } from "../../utils/config/config";

export const getTodaysJournals = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const currentDate = formatISO(new Date(), { representation: "date" });

  const response = await axios.get(
    `${API_BASE_URL}journals?date=${currentDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const journalsData = response.data.data;

  if (journalsData.length > 0) {
    const journalId = journalsData[0].id;

    const journalIdResponse = await axios.get(
      `${API_BASE_URL}journals/${journalId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return journalIdResponse.data.data;
  } else {
    return null;
  }
};

export const getUserJournals = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}journals`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const journalsData = response.data.data;

  return journalsData.length > 0 ? journalsData : [];
};
