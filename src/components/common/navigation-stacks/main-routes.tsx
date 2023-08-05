import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import CalendarScreen from "../../../screens/calendar-screen";
import DiscoverScreen from "../../../screens/discover-screen";
import HomeScreen from "../../../screens/home-screen";
import ProfileScreen from "../../../screens/profile-screen";
import AppColors from "../../../utils/constants/colors";

const CalendarClearOutlineSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" x="48" y="80" width="416" height="384" rx="48"/><line fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" x1="128" y1="48" x2="128" y2="80"/><line fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" x1="384" y1="48" x2="384" y2="80"/><line fill="none" stroke="#00000099" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" x1="464" y1="160" x2="48" y2="160"/></svg>
`;

const CalendarClearSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,128a64,64,0,0,0-64-64H400V48.45c0-8.61-6.62-16-15.23-16.43A16,16,0,0,0,368,48V64H144V48.45c0-8.61-6.62-16-15.23-16.43A16,16,0,0,0,112,48V64H96a64,64,0,0,0-64,64v12a4,4,0,0,0,4,4H476a4,4,0,0,0,4-4Z"/><path d="M32,416a64,64,0,0,0,64,64H416a64,64,0,0,0,64-64V180a4,4,0,0,0-4-4H36a4,4,0,0,0-4,4Z"/></svg>
`;

const windowHeight = Dimensions.get("window").height;

const MainRoutes: React.FC = () => {
  const MainStack = createBottomTabNavigator();

  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: windowHeight * 0.11,
          paddingTop: windowHeight * 0.02,
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
      <MainStack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={windowHeight * 0.045}
              color={color}
            />
          ),
        }}
      />
      <MainStack.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            const xml = focused ? CalendarClearSvg : CalendarClearOutlineSvg;
            return (
              <SvgXml
                xml={xml}
                width={windowHeight * 0.045}
                height={windowHeight * 0.045}
                fill={color}
              />
            );
          },
        }}
      />
      <MainStack.Screen
        name='Discover'
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "search" : "search-outline"}
              size={windowHeight * 0.045}
              color={color}
            />
          ),
        }}
      />
      <MainStack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              size={windowHeight * 0.045}
              color={color}
            />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainRoutes;
