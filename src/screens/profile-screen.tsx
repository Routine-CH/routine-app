import { DateTime } from "luxon";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Image, StyleSheet, View } from "react-native";

import IconButton from "../components/common/buttons/icon-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import Badge from "../components/profile/badge";
import BadgesView from "../components/profile/badges-view";
import WeekView from "../components/profile/week-view";
import YearCard from "../components/profile/year-card";
import { AuthContext } from "../contexts/auth-context";
import useUserMe from "../hooks/use-user-me";
import { StatusBarColor } from "../utils/types/enums";

const ProfileScreen = () => {
  // TODO: REMOVE LOGOUT FROM HERE
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };
  const { t } = useTranslation();

  const currentUser = useUserMe();
  const defaultAvatar = "../assets/misc/stones.jpg";
  const createdAt = DateTime.fromISO(currentUser.currentUser?.createdAt);
  const formattedMonth = createdAt.toLocaleString({
    month: "long",
    year: "numeric",
  });

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
    >
      <Button title="Logout" onPress={handleLogout} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.iconContainer}>
          <IconButton iconName="pencil" />
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
        <AchievementCard />
        <BadgesView />
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
    right: 20,
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
