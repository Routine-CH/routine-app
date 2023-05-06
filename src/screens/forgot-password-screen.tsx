import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import FlatButton from "../components/common/buttons/flat-button";
import IconInputField from "../components/common/input/icon-input-field";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthStackParamList } from "../utils/types/types";

const ForgotPasswordScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();

  // submit login credentials
  const handleResetPw = async () => {
    const token = "your_jwt_token";
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.blueMuted30}
      statusBarColor={StatusBarColor.dark}
    >
      <View style={styles.container}>
        <BackButton />
        <AppText
          fontStyle='heading1'
          colorStyle='black64'
          style={{ marginTop: 26 }}
        >
          {t("shared-auth.forgot-pw")}
        </AppText>
        <View style={styles.descriptionContainer}>
          <AppText
            fontStyle='bodyBold'
            colorStyle='black64'
            style={{ lineHeight: 24 }}
          >
            {t("forgot-pw.dont-worry")}
          </AppText>
          <AppText
            fontStyle='body'
            colorStyle='black64'
            style={{ lineHeight: 24 }}
          >
            {t("forgot-pw.description")}
          </AppText>
        </View>
        <IconInputField
          iconName='mail'
          placeholder={t("shared-auth.email")}
          size={24}
          style={{ backgroundColor: AppColors.white, marginTop: 60 }}
        />
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='blue100'
          buttonStyle={styles.resetPasswordButton}
          onPress={handleResetPw}
        >
          {t("forgot-pw.send-email")}
        </FlatButton>
        <View style={styles.bottomContainer}>
          <AppText
            fontStyle='body'
            colorStyle='black64'
            style={{ marginRight: 5 }}
          >
            {t("shared-auth.no-account")}
          </AppText>
          <FlatButton
            fontStyle='bodyMedium'
            colorStyle='black64'
            onPress={navigateToRegisterScreen}
          >
            {t("shared-auth.register")}
          </FlatButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 30,
  },
  descriptionContainer: {
    marginTop: 30,
  },
  resetPasswordButton: {
    backgroundColor: AppColors.white,
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
});
