import { NavigationProp, useNavigation } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import { LoadingIndicator } from "../components/common/loading-indicator";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import Badge from "../components/profile/badge";
import BadgesView from "../components/profile/badges-view";
import WeekView from "../components/profile/week-view";
import YearCard from "../components/profile/year-card";
import { useGamificationUser } from "../hooks/profile/use-gamification-user";
import { useUserStore } from "../store/user-store";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { userProfileData } = useGamificationUser();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(userProfileData && userProfileData.id);
  }, [userProfileData]);

  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const defaultAvatar = "../assets/misc/stones.jpg";
  const navigateToBadgesScreen = () => {
    navigation.navigate("SubRoutes", {
      screen: "ProfileBadges",
      params: { badges: userProfileData && userProfileData.badges },
    });
  };

  const navigateToProfileSettingsScreen = () => {
    if (userProfileData && userProfileData.id !== null) {
      navigation.navigate("SubRoutes", {
        screen: "ProfileSettings",
        params: { id: userProfileData.id },
      });
    } else {
      console.log("No user gamification data");
    }
  };

  return userProfileData ? (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={styles.iconContainer}>
            <IconButton
              iconName='pencil'
              onPress={() => navigateToProfileSettingsScreen()}
            />
          </View>
          <View style={styles.userInformation}>
            <Image
              source={require(defaultAvatar)}
              style={styles.profilePicture}
            />
            <AppText
              fontStyle='bodyMedium'
              colorStyle='black70'
              style={{ marginBottom: 10 }}
            >
              {t("profile.hi")} {userProfileData.username} 😄
            </AppText>
            <AppText fontStyle='body' colorStyle='black64'>
              {`${t("profile.since")} ${format(
                parseISO(userProfileData.createdAt.toString()),
                "MMMM yyyy"
              )} ${t("profile.here")}`}
            </AppText>
          </View>
        </View>
        {user?.notificationSettings.muteGamification && (
          <>
            <AchievementCard
              exp={userProfileData.experience}
              badgesCount={userProfileData.badges.length}
              streakCount={userProfileData.userStreakCount}
            />
            <BadgesView
              navigateTo={navigateToBadgesScreen}
              badges={userProfileData.badges}
            />
            <Badge badges={userProfileData.badges} />
          </>
        )}
      </View>
      <View style={styles.wrapper}>
        <YearCard currentUser={userProfileData} />
      </View>
      <WeekView journalDays={userProfileData.journalDaysThisWeek} />
    </ScrollViewScreenWrapper>
  ) : (
    <LoadingIndicator />
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 60,
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
