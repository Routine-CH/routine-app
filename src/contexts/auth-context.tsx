// auth-context.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
  userIsAuthenticated: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
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

  const register = async (email: string, password: string) => {
    // Add your registration logic here
    // Example:
    // const response = await api.register(email, password);
    // signIn(response.data.token);
  };

  const login = async (email: string, password: string) => {
    // Add your login logic here
    // Example:
    // const response = await api.login(email, password);
    // signIn(response.data.token);
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
