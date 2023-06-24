import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { AuthContext } from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const ProfileSettingsScreen: React.FC = () => {
  const { t } = useTranslation();

  const defaultAvatar = "../assets/misc/stones.jpg";
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };

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
          <Icon name="pencil" size={15} color={AppColors.white} />
        </TouchableOpacity>
      </View>
      <View>
        <AppText>Lets change some settings</AppText>
      </View>
      <Button title="Logout" onPress={handleLogout} />
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
