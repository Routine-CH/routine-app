import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import ForgotPasswordScreen from "./src/screens/forgot-password-screen";
import HomeScreen from "./src/screens/home-screen";
import LoginScreen from "./src/screens/login-screen";
import RegisterScreen from "./src/screens/register-screen";

// initialize navigation stacks
const UnauthenticatedStack = createNativeStackNavigator();
const AutnehticatedStack = createBottomTabNavigator();

// initialize navigation screens for unauthenticated users
const UnauthenticatedNavigator = () => (
  <UnauthenticatedStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <UnauthenticatedStack.Screen name='Login' component={LoginScreen} />
    <UnauthenticatedStack.Screen name='Register' component={RegisterScreen} />
    <UnauthenticatedStack.Screen
      name='ForgotPw'
      component={ForgotPasswordScreen}
    />
  </UnauthenticatedStack.Navigator>
);

// initialize navigation screens for authenticated users
const AuthenticatedNavigator = () => (
  <AutnehticatedStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AutnehticatedStack.Screen name='Home' component={HomeScreen} />
  </AutnehticatedStack.Navigator>
);

const App: React.FC = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect to load user token from AsyncStorage and load fonts
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

  // useMemo to memoize authContextValue
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

  // if app is not ready, return loading screen
  if (!appIsReady) {
    return <Text>LOADING</Text>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AuthContext.Provider value={authContextValue}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {userToken ? (
              <AuthenticatedNavigator />
            ) : (
              <UnauthenticatedNavigator />
            )}
          </NavigationContainer>
        </ApplicationProvider>
      </AuthContext.Provider>
    </I18nextProvider>
  );
};

export default App;
