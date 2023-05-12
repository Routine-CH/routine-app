// auth-context.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  ) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
};

const defaultAuthContext: AuthContextType = {
  userIsAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
  register: async () => {},
  login: async () => {},
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          setUserIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to restore session", error);
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
        login(username, password);
      }
    } catch (error) {}
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.post(`${API_BASE_URL}auth/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data.data;
        // save token to AsyncStorage
        await signIn(data.access_token, data.refresh_token);
      }
    } catch (error) {
      console.error("Login failed:", error);
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
