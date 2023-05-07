// auth-context.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/config/config";

type AuthContextType = {
  userIsAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
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
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setUserIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to restore session", error);
      }
    }

    restoreSession();
  }, []);

  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      setUserIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to store token", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
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
      const signUpResponse = await axios.post(`${API_BASE_URL}auth/signup`, {
        username,
        email,
        password,
      });

      if (signUpResponse) {
        login(username, password);
      }
    } catch (error) {}
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, {
        username,
        password,
      });

      const data = response.data;
      // save token to AsyncStorage
      await signIn(data.access_token);
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
