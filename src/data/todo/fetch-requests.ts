import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { formatISO } from "date-fns";
import { API_BASE_URL } from "../../utils/config/config";

export const getTodaysTodos = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const currentDate = formatISO(new Date(), { representation: "date" });

  const response = await axios.get(
    `${API_BASE_URL}todos?date=${currentDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const todosData = response.data.data

  console.log(todosData)

  return todosData

/*   const todosData = response.data.data;

  const todaysTodos = todosData.filter(
      (todo: UserTodo) => todo.plannedDate.toISOString().slice(0, 10) === currentDate
    );
console.log(todaysTodos)

  return todaysTodos */
};

export const getUserTodos = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const todosData = response.data.data;

  return todosData.length > 0 ? todosData : null;
};
