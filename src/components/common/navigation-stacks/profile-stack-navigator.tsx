import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BadgesScreen from "../../../screens/badges-screen";
import NotificationsScreen from "../../../screens/notifications-screen";
import ProfileScreen from "../../../screens/profile-screen";
import ProfileSettingsScreen from "../../../screens/profile-settings-screen";

// declare stack navigator
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} />
      <ProfileStack.Screen name="ProfileBadges" component={BadgesScreen} />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
      />
      <ProfileStack.Screen
        name="ProfileNotifications"
        component={NotificationsScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
