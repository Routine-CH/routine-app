import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import React, { useEffect, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Text } from "react-native";
import AuthContext from "./src/contexts/auth-context";
import useUbuntuFont from "./src/hooks/use-fonts";
import "./src/i18n/config";
import i18n from "./src/i18n/config";
import HomeScreen from "./src/screens/home-screen";
import SessionScreen from "./src/screens/session-screen";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await useUbuntuFont();
        const token = await AsyncStorage.getItem("user_token");
        setUserToken(token);
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setAppIsReady(true);
        await hideAsync();
      }
    }

    prepare();
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

  if (!appIsReady) {
    return <Text>LOADING</Text>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <ApplicationProvider {...eva} theme={eva.light}>
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
        </ApplicationProvider>
      </AuthContext.Provider>
    </I18nextProvider>
  );
};

export default App;
