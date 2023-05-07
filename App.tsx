import * as eva from "@eva-design/eva";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import React, { useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Text, View } from "react-native";
import AuthProvider, { AuthContext } from "./src/contexts/auth-context";
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

const MainApp: React.FC = () => {
  const { userIsAuthenticated } = useContext(AuthContext);
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect to load user token from AsyncStorage and load fonts
  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await useUbuntuFont();
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setAppIsReady(true);
        await hideAsync();
      }
    }

    prepare();
  }, []);

  // if app is not ready, return loading screen
  if (!appIsReady) {
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  }

  console.log(userIsAuthenticated);

  return (
    <I18nextProvider i18n={i18n}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {userIsAuthenticated ? (
            <AuthenticatedNavigator />
          ) : (
            <UnauthenticatedNavigator />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </I18nextProvider>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
