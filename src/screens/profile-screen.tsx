import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AchievementCard from "../components/profile/achievement-card";
import Badge from "../components/profile/badge";
import BadgesView from "../components/profile/badges-view";
import WeekView from "../components/profile/week-view";
import YearCard from "../components/profile/year-card";
import { useGamificationUser } from "../hooks/profile/use-gamification-user";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { userProfileData } = useGamificationUser();

  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const defaultAvatar = "../assets/misc/stones.jpg";
  const navigateToScreen = (screenName: string) => {
    navigation.navigate("Profile", { screen: screenName });
  };

  const navigateToProfileSettingsScreen = () => {
    if (userProfileData && userProfileData.id !== null) {
      navigation.navigate("ProfileSettings", { id: userProfileData.id });
    } else {
      console.log("No user gamification data");
    }
  };

  return userProfileData ? (
    <ScrollViewScreenWrapper
      backgroundColor='white'
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
        <AchievementCard
          exp={userProfileData.experience}
          badgesCount={userProfileData.badges.length}
          streakCount={userProfileData.userStreakCount}
        />
        <BadgesView navigateTo={() => navigateToScreen("ProfileBadges")} />
      </View>
      <Badge />
      <View style={styles.wrapper}>
        <YearCard currentUser={userProfileData} />
      </View>
      <WeekView journalDays={userProfileData.journalDaysThisWeek} />
    </ScrollViewScreenWrapper>
  ) : (
    <></>
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
