import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BadgesScreen from "../../../screens/badges-screen";
import ProfileScreen from "../../../screens/profile-screen";

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
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
