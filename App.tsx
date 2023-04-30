import * as eva from "@eva-design/eva";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import React, { useEffect, useMemo, useState } from "react";
import AuthContext from "./src/contexts/auth-context";
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

  // load fonts
  const [fontsLoaded] = useFonts({
    UbuntuLight: require("./src/assets/fonts/Ubuntu-Light.ttf"),
    UbuntuLightItalic: require("./src/assets/fonts/Ubuntu-LightItalic.ttf"),
    Ubuntu: require("./src/assets/fonts/Ubuntu-Regular.ttf"),
    UbuntuItalic: require("./src/assets/fonts/Ubuntu-Italic.ttf"),
    UbuntuMedium: require("./src/assets/fonts/Ubuntu-Medium.ttf"),
    UbuntuMediumItalic: require("./src/assets/fonts/Ubuntu-MediumItalic.ttf"),
    UbuntuBold: require("./src/assets/fonts/Ubuntu-Bold.ttf"),
    UbuntuBoldItalic: require("./src/assets/fonts/Ubuntu-BoldItalic.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        const token = await AsyncStorage.getItem("user_token");
        setUserToken(token);
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setAppIsReady(true);
        await hideAsync();
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

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
    return null;
  }

  return (
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
  );
};

export default App;
