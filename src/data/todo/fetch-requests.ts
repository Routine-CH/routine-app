import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../utils/config/config";

export const getUpcomingTodos = async () => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}todos/upcoming`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const upcomingTodos = response.data.data;

  return upcomingTodos;
};

export const getUserTodoById = async (todoId: string) => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}todos/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const todoData = response.data.data;

  return todoData;
};

export const getUserTodosByGoalId = async (goalId: string) => {
  const token = await AsyncStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found.");
  }

  const response = await axios.get(`${API_BASE_URL}todos/goal/${goalId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const todosData = response.data.data;

  return todosData;
};

export const getAllUserTodos = async () => {
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

  return todosData;
};
