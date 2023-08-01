import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import FlatButton from "../../common/buttons/flat-button";
import InputField from "../../common/input/input-field";
import AppText from "../../common/typography/app-text";

type UserInformationProps = {
  username: string;
  email: string;
};

const windowHeight = Dimensions.get("window").height;

const UserInformation: React.FC<UserInformationProps> = ({
  username,
  email,
}) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppText fontStyle='heading3' colorStyle='black70'>
        {t("profile.profile-settings.your-information")}
      </AppText>
      <View style={styles.formContainer}>
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={{ marginBottom: 15 }}
        >
          {t("shared-auth.username")}
        </AppText>
        <InputField defaultValue={username} />
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={styles.textContainer}
        >
          {t("shared-auth.email")}
        </AppText>
        <InputField defaultValue={email} />
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

export default UserInformation;

const styles = StyleSheet.create({
  container: { marginTop: 30 },
  formContainer: {
    height: windowHeight * 0.35,
    width: "100%",
    borderRadius: 13,
    backgroundColor: AppColors.blueMuted30,
    padding: 15,
    marginBottom: 30,
    marginTop: 30,
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 30,
    marginBottom: 15,
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
