// auth-context.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import apiClient from "../utils/config/api-client";
import { API_BASE_URL } from "../utils/config/config";

type AuthContextType = {
  userIsAuthenticated: boolean;
  signIn: (access_token: string, refresh_token: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ status: number; data: any }>;
  login: (
    username: string,
    password: string
  ) => Promise<{ status: number; data: any }>;
};

const defaultAuthContext: AuthContextType = {
  userIsAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
  register: async () => {
    return { status: 0, data: {} }; //placeholder, returns something from the backend
  },
  login: async () => {
    return { status: 0, data: {} }; //placeholder, returns something from the backend
  },
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      const access_token = await AsyncStorage.getItem("access_token");
      const refresh_token = await AsyncStorage.getItem("refresh_token");

      if (!access_token || !refresh_token) {
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}auth/refresh-token`, {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
            "x-refresh-token": refresh_token,
          },
        });
        if (response.status === 200) {
          await AsyncStorage.multiRemove(["access_token", "refresh_token"])
            .then(() => {
              AsyncStorage.multiSet([
                ["access_token", response.data.data.access_token],
                ["refresh_token", response.data.data.refresh_token],
              ]);
            })
            .finally(() => {
              setUserIsAuthenticated(true);
            });
        }
      } catch (error) {
        await AsyncStorage.multiRemove(["access_token", "refresh_token"]).then(
          () => {
            setUserIsAuthenticated(false);
          }
        );
      }
    }

    restoreSession();
  }, []);

  const signIn = async (access_token: string, refresh_token: string) => {
    try {
      await AsyncStorage.multiSet([
        ["access_token", access_token],
        ["refresh_token", refresh_token],
      ]);
      setUserIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to store token", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      setUserIsAuthenticated(false);
    } catch (error) {
      console.error("Failed to remove token", error);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const signUpResponse = await apiClient.post(
        `${API_BASE_URL}auth/signup`,
        {
          username,
          email,
          password,
        }
      );
      if (signUpResponse.status === 201) {
        const data = signUpResponse.data.data;
        await login(username, password);
        return { status: signUpResponse.status, data: data };
      } else {
        return {
          status: signUpResponse.status,
          data: { message: "Unexpected status code." },
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: error.response.data };
      }
      console.error("Registration failed:", error);
      // default value return
      return { status: 500, data: { message: "Unexpected error occurred" } };
    }
  };

  const login = async (username: string, password: string) => {
    console.log("username", username);
    console.log("password", password);
    try {
      console.log("Attempting to reach:", `${API_BASE_URL}auth/login`); // Add this
      const response = await apiClient.post(`${API_BASE_URL}auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data.data;
        // save token to AsyncStorage
        await signIn(data.access_token, data.refresh_token);
        return { status: response.status, data: data };
      } else {
        // If response status is not 200, return response status and an error message
        return {
          status: response.status,
          data: { message: "Unexpected status code." },
        };
      }
    } catch (error) {
      console.log("API Call Error:", error); // Add this
      if (axios.isAxiosError(error) && error.response) {
        console.log("Login failed:", error.response.data);
        console.log("Login failed:", error.response.headers);
        console.log("Login failed:", error.response.status);
        return { status: error.response.status, data: error.response.data };
      } else {
        console.error("Login failed:", error);
        // default value return
        return { status: 500, data: { message: "Unexpected error occurred" } };
      }
    }
  };

  const authContextValue: AuthContextType = {
    userIsAuthenticated,
    signIn,
    signOut,
    register,
    login,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
