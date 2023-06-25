import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../../contexts/auth-context";
import AppColors from "../../../utils/constants/colors";
import FlatButton from "../../common/buttons/flat-button";
import AppText from "../../common/typography/app-text";

const LogOut: React.FC = () => {
  const { t } = useTranslation();

  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <AppText fontStyle="heading3" colorStyle="black70">
        {t("profile.profile-settings.logout")}
      </AppText>
      <AppText
        fontStyle="body"
        colorStyle="black70"
        style={{ marginVertical: 30 }}
      >
        {t("profile.profile-settings.logout-text")}
      </AppText>
      <View style={styles.buttonContainer}>
        <FlatButton
          fontStyle="bodyMedium"
          colorStyle="white"
          buttonStyle={styles.logoutButton}
          onPress={handleLogout}
        >
          {t("profile.profile-settings.logout-cap")}
        </FlatButton>
      </View>
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
  container: { marginTop: 60 },
  buttonContainer: {
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: AppColors.blue100,
    height: 50,
    width: "70%",
    alignItems: "center",
    borderRadius: 13,
    paddingVertical: 12,
  },
});
