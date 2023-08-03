import { NavigationContainer } from "@react-navigation/native";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import React, { useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingIndicator } from "./src/components/common/loading-indicator";
import AuthenticatedNavigator from "./src/components/common/navigation-stacks/authenticated-navigator";
import UnauthenticatedNavigator from "./src/components/common/navigation-stacks/unauthenticated-navigator";
import AuthProvider, { AuthContext } from "./src/contexts/auth-context";
import useUbuntuFont from "./src/hooks/use-fonts";
import "./src/i18n/config";
import i18n from "./src/i18n/config";

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

  if (!appIsReady) {
    return <LoadingIndicator />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <NavigationContainer>
          {userIsAuthenticated ? (
            <AuthenticatedNavigator />
          ) : (
            <UnauthenticatedNavigator />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
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
