import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import DeteleAccount from "../components/profile/profile-settings/delete-account";
import LogOut from "../components/profile/profile-settings/log-out";
import Notifications from "../components/profile/profile-settings/notifications";
import ResetPassword from "../components/profile/profile-settings/reset-password";
import YourInformation from "../components/profile/profile-settings/your-information";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
  FullUserData,
} from "../utils/types/types";

type ProfileSettingsRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "Profile"
> & {
  params: {
    ProfileSettings: {
      currentUser: FullUserData | null;
    };
  };
};

type ProfileSettingsProps = {
  route: ProfileSettingsRouteProp;
};

const ProfileSettingsScreen: React.FC<ProfileSettingsProps> = ({ route }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const currentUser = route.params.ProfileSettings.currentUser;

  const navigateToProfileNotifications = (screenName: string) => {
    navigation.navigate("Profile", { screen: screenName });
  };

  const defaultAvatar = "../assets/misc/stones.jpg";

  return (
    <ScrollViewScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View style={styles.profilePictureContainer}>
        <Image source={require(defaultAvatar)} style={styles.profilePicture} />
        <TouchableOpacity style={styles.button}>
          <Icon name='pencil' size={15} color={AppColors.white} />
        </TouchableOpacity>
      </View>
      <YourInformation />
      <ResetPassword />
      <Notifications
        navigateTo={() =>
          navigateToProfileNotifications("ProfileNotifications")
        }
      />
      <LogOut />
      <DeteleAccount />
    </ScrollViewScreenWrapper>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  profilePictureContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    height: 125,
    width: 125,
    borderRadius: 100,
    marginBottom: 30,
  },
  button: {
    backgroundColor: AppColors.blue100,
    width: 25,
    height: 25,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 110,
    top: 95,
  },
});
