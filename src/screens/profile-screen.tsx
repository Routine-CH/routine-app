import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import Badge from "../components/profile/badge";
import BadgesView from "../components/profile/badges-view";
import WeekView from "../components/profile/week-view";
import YearCard from "../components/profile/year-card";
import { AuthContext } from "../contexts/auth-context";
import useUserMe from "../hooks/use-user-me";
import AppColors from "../utils/constants/colors";

const ProfileScreen = () => {
  // TODO: REMOVE LOGOUT FROM HERE
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };
  const { t } = useTranslation();

  const currentUser = useUserMe();
  console.log(currentUser);
  const defaultAvatar = "../assets/misc/stones.jpg";

  return (
    <ScrollView style={{ backgroundColor: AppColors.white }}>
      <ScreenWrapper>
        <Button title="Logout" onPress={handleLogout} />
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.iconContainer}>
            <IconButton iconName="pencil" />
          </View>
          {currentUser ? (
            <View style={styles.userInformation}>
              <Image
                source={require(defaultAvatar)}
                style={styles.profilePicture}
              />
              <AppText
                fontStyle="bodyMedium"
                style={[styles.textColor, { marginBottom: 10 }]}
              >
                {t("profile.hi")} {currentUser.currentUser?.username} 😄
              </AppText>
              <AppText fontStyle="body" style={styles.textColor}>
                {t("profile.since")} {currentUser.currentUser?.createdAt}
                {t("profile.here")}
              </AppText>
            </View>
          ) : (
            <AppText> {t("general.no-user-data")} </AppText>
          )}
          <AchievementCard />
          <BadgesView />
        </View>
        <Badge />
        <View style={styles.wrapper}>
          <YearCard currentUser={currentUser} />
        </View>
        <WeekView />
      </ScreenWrapper>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  iconContainer: {
    position: "absolute",
    right: 20,
  },
  userInformation: {
    alignItems: "center",
  },
  textColor: {
    color: AppColors.black64,
  },
  profilePicture: {
    height: 125,
    width: 125,
    borderRadius: 100,
    marginBottom: 30,
  },
});
