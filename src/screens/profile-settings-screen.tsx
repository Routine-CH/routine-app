import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import DeteleAccount from "../components/profile/profile-settings/delete-account";
import LogOut from "../components/profile/profile-settings/log-out";
import Notifications from "../components/profile/profile-settings/notifications";
import ResetPassword from "../components/profile/profile-settings/reset-password";
import UserInformation from "../components/profile/profile-settings/user-information";
import { useMinimalUser } from "../hooks/profile/use-minimal-user";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

type ProfileSettingsRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "ProfileSettings"
>;

type ProfileSettingsProps = {
  route: ProfileSettingsRouteProp;
};

const windowWidth = Dimensions.get("window").width;

const ProfileSettingsScreen: React.FC<ProfileSettingsProps> = ({ route }) => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const userId = route.params.id;
  const { user, isLoading } = useMinimalUser(userId);

  const navigateToProfileNotifications = () => {
    if (!user) return;
    navigation.navigate("ProfileNotifications", {
      notificationSettings: user.notificationSettings,
    });
  };

  const defaultAvatar = "../assets/misc/stones.jpg";

  return !isLoading && user ? (
    <ScrollViewScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View style={styles.profilePictureContainer}>
        <View style={styles.pictureContainer}>
          <Image
            source={require(defaultAvatar)}
            style={styles.profilePicture}
          />
          <View style={styles.pictureOuterStyle}>
            <TouchableOpacity style={styles.button}>
              <Icon
                name='pencil'
                size={windowWidth * 0.055}
                color={AppColors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <UserInformation username={user.username} email={user.email} />
      <ResetPassword />
      <Notifications
        navigateTo={navigateToProfileNotifications}
        mutedAllNotifications={user.notificationSettings.muteAllNotifications}
      />
      <LogOut />
      <DeteleAccount />
    </ScrollViewScreenWrapper>
  ) : (
    <></>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainer: {
    position: "relative",
  },
  pictureOuterStyle: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    position: "absolute",
    bottom: -5,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: AppColors.white,
  },
  profilePicture: {
    height: windowWidth * 0.4,
    width: windowWidth * 0.4,
    borderRadius: 100,
  },
  button: {
    backgroundColor: AppColors.blue100,
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
