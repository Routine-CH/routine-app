import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import FlatButton from "../../common/buttons/flat-button";
import LabelInputField from "../../common/input/label-input-field";
import AppText from "../../common/typography/app-text";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppText fontStyle='heading3' colorStyle='black70'>
        {t("profile.profile-settings.reset-password")}
      </AppText>
      <View style={styles.formContainer}>
        <LabelInputField
          placeholder={
            t("profile.profile-settings.current") +
            " " +
            t("shared-auth.password")
          }
          style={styles.labelInput}
        />
        <LabelInputField
          placeholder={
            t("profile.profile-settings.new") + " " + t("shared-auth.password")
          }
          style={styles.labelInput}
        />
        <LabelInputField
          placeholder={
            t("profile.profile-settings.new") +
            " " +
            t("shared-auth.password") +
            " " +
            t("profile.profile-settings.repeat")
          }
          style={styles.labelInput}
        />
      </View>
      <View style={styles.buttonContainer}>
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='white'
          buttonStyle={styles.button}
          onPress={() => navigation.goBack()}
        >
          {t("profile.profile-settings.save-cap")}
        </FlatButton>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: { marginTop: 60 },
  formContainer: {
    width: "100%",
    marginBottom: 30,
    marginTop: 30,
    justifyContent: "center",
  },
  labelInput: {
    backgroundColor: AppColors.blueMuted20,
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: AppColors.blue100,
    height: 50,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
});
