import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import AuthContext from "./src/contexts/auth-context";
import HomeScreen from "./src/screens/home-screen";
import SessionScreen from "./src/screens/session-screen";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const theme = extendTheme({});

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("user_token");
        setUserToken(token);
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };

    loadToken();
  }, []);

  const authContextValue = useMemo(
    () => ({
      signIn: async (token: string) => {
        setUserToken(token);
        await AsyncStorage.setItem("user_token", token);
      },
      signOut: async () => {
        setUserToken(null);
        await AsyncStorage.removeItem("user_token");
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {userToken ? (
              <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name='Login'
                component={SessionScreen}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
};

export default App;
