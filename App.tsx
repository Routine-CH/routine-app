import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import React, { useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import DiscoverStackNavigator from "./src/components/common/navigation-stacks/discover-stack-navigator";
import HomeStackNavigator from "./src/components/common/navigation-stacks/home-stack-navigator";
import ProfileStackNavigator from "./src/components/common/navigation-stacks/profile-stack-navigator";
import AuthProvider, { AuthContext } from "./src/contexts/auth-context";
import useUbuntuFont from "./src/hooks/use-fonts";
import "./src/i18n/config";
import i18n from "./src/i18n/config";
import CalendarScreen from "./src/screens/calendar-screen";
import ForgotPasswordScreen from "./src/screens/forgot-password-screen";
import LoginScreen from "./src/screens/login-screen";
import RegisterScreen from "./src/screens/register-screen";
import AppColors from "./src/utils/constants/colors";

const CalendarClearOutlineSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" x="48" y="80" width="416" height="384" rx="48"/><line fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" x1="128" y1="48" x2="128" y2="80"/><line fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" x1="384" y1="48" x2="384" y2="80"/><line fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" x1="464" y1="160" x2="48" y2="160"/></svg>
`;

const CalendarClearSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,128a64,64,0,0,0-64-64H400V48.45c0-8.61-6.62-16-15.23-16.43A16,16,0,0,0,368,48V64H144V48.45c0-8.61-6.62-16-15.23-16.43A16,16,0,0,0,112,48V64H96a64,64,0,0,0-64,64v12a4,4,0,0,0,4,4H476a4,4,0,0,0,4-4Z"/><path d="M32,416a64,64,0,0,0,64,64H416a64,64,0,0,0,64-64V180a4,4,0,0,0-4-4H36a4,4,0,0,0-4,4Z"/></svg>
`;

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
  <>
    <AutnehticatedStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 85,
          paddingTop: 20,
          paddingHorizontal: 20,
          shadowColor: "#959DA5",
          shadowOffset: { width: 0, height: 9 } as {
            width: number;
            height: number;
          },
          shadowOpacity: 0.35,
          shadowRadius: 11.9,
        },
        tabBarInactiveTintColor: AppColors.black60,
        tabBarActiveTintColor: AppColors.blue100,
      }}
    >
      <AutnehticatedStack.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={35}
              color={color}
            />
          ),
        }}
      />
      <AutnehticatedStack.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            const xml = focused ? CalendarClearSvg : CalendarClearOutlineSvg;
            return <SvgXml xml={xml} width={35} height={35} fill={color} />;
          },
        }}
      />
      <AutnehticatedStack.Screen
        name='Discover'
        component={DiscoverStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "search" : "search-outline"}
              size={35}
              color={color}
            />
          ),
        }}
      />
      <AutnehticatedStack.Screen
        name='Profile'
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              size={35}
              color={color}
            />
          ),
        }}
      />
    </AutnehticatedStack.Navigator>
  </>
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
