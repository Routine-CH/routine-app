import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../../contexts/auth-context";
import AppColors from "../../../utils/constants/colors";
import FlatButton from "../../common/buttons/flat-button";
import AppText from "../../common/typography/app-text";

const DeteleAccount: React.FC = () => {
  const { t } = useTranslation();

  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <AppText fontStyle="heading3" colorStyle="black70">
        {t("profile.profile-settings.delete-account")}
      </AppText>
      <AppText
        fontStyle="body"
        colorStyle="black70"
        style={{ marginVertical: 30 }}
      >
        {t("profile.profile-settings.delete-account-text-1")}
        <AppText fontStyle="bodyMedium" colorStyle="black70">
          {t("profile.profile-settings.delete-account-text-2")}
        </AppText>
        {t("profile.profile-settings.delete-account-text-3")}
      </AppText>
      <View style={styles.buttonContainer}>
        <FlatButton
          fontStyle="bodyMedium"
          colorStyle="white"
          buttonStyle={styles.button}
          onPress={handleLogout}
        >
          {t("profile.profile-settings.delete-account-cap")}
        </FlatButton>
      </View>
    </View>
  );
};

export default DeteleAccount;

const styles = StyleSheet.create({
  container: { marginVertical: 60 },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: AppColors.red,
    height: 50,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
});
