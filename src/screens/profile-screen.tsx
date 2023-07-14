import { DateTime } from "luxon";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/common/buttons/icon-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import Badge from "../components/profile/badge";
import BadgesView from "../components/profile/badges-view";
import WeekView from "../components/profile/week-view";
import YearCard from "../components/profile/year-card";
import useUserMe from "../hooks/use-user-me";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

const ProfileScreen = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const currentUser = useUserMe();
  const defaultAvatar = "../assets/misc/stones.jpg";
  const createdAt = DateTime.fromISO(currentUser.currentUser?.createdAt);
  const formattedMonth = createdAt.toLocaleString({
    month: "long",
    year: "numeric",
  });

  const navigateToScreen = (screenName: string) => {
    navigation.navigate("Profile", { screen: screenName });
  };

  const navigateToProfileSettingsScreen = (screenName: string) => {
    navigation.navigate("Profile", { screen: screenName });
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={styles.iconContainer}>
            <IconButton
              iconName="pencil"
              onPress={() => navigateToProfileSettingsScreen("ProfileSettings")}
            />
          </View>

          <View style={styles.userInformation}>
            <Image
              source={require(defaultAvatar)}
              style={styles.profilePicture}
            />
            <AppText
              fontStyle="bodyMedium"
              colorStyle="black70"
              style={{ marginBottom: 10 }}
            >
              {t("profile.hi")} {currentUser.currentUser?.username} 😄
            </AppText>
            <AppText fontStyle="body" colorStyle="black64">
              {t("profile.since")} {formattedMonth} {t("profile.here")}
            </AppText>
          </View>
        </View>
        <AchievementCard />
        <BadgesView navigateTo={() => navigateToScreen("ProfileBadges")} />
      </View>
      <Badge />
      <View style={styles.wrapper}>
        <YearCard currentUser={currentUser} />
      </View>
      <WeekView />
    </ScrollViewScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 60,
    marginHorizontal: 20,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
  },
  userInformation: {
    alignItems: "center",
  },
  profilePicture: {
    height: 125,
    width: 125,
    borderRadius: 100,
    marginBottom: 30,
  },
});
