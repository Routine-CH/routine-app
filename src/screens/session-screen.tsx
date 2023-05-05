import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, View } from "react-native";
import FlatButton from "../components/common/buttons/flat-button";
import IconInputField from "../components/common/input/icon-input-field";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AuthContext from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const SessionScreen: React.FC = () => {
  const { signIn } = useContext(AuthContext)!;
  const { t } = useTranslation();

  console.log(JSON.stringify(t("login")));

  const handleLogin = async () => {
    const token = "your_jwt_token";
    await signIn(token);
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.blue100}
      statusBarColor={StatusBarColor.light}
    >
      <View style={styles.outerContainer} />
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/logo/logo.png")}
          style={{ width: 270, height: 41 }}
        />
        <AppText
          fontStyle='headingBold'
          colorStyle='blue100'
          fontSize={25}
          style={{ marginTop: 88 }}
        >
          {t("login.welcome")}
        </AppText>
        <View style={styles.formContainer}>
          <IconInputField
            iconName='person'
            size={24}
            placeholder='Benutzername'
          />
          <IconInputField
            style={{ marginTop: 30 }}
            iconName='lock-closed'
            size={24}
            placeholder='Passwort'
          />
          <FlatButton
            fontStyle='bodyMedium'
            colorStyle='white'
            fontSize={18}
            buttonStyle={styles.loginButton}
          >
            LOGIN
          </FlatButton>
        </View>
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='blue100'
          fontSize={18}
          style={{ lineHeight: 25 }}
        >
          Passwort vergessen?
        </FlatButton>
      </View>
      <View style={styles.outerContainer}>
        <View style={styles.registerContainer}>
          <AppText
            fontStyle='bodyMedium'
            colorStyle='white'
            fontSize={18}
            style={{ lineHeight: 30 }}
          >
            Noch kein account?
          </AppText>
          <FlatButton
            fontStyle='bodyMedium'
            colorStyle='white'
            fontSize={18}
            style={{ marginLeft: 5, lineHeight: 30 }}
          >
            Registrier dich!
          </FlatButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({
  outerContainer: { backgroundColor: AppColors.blue100, flex: 1 },
  innerContainer: {
    backgroundColor: AppColors.white,
    flex: Platform.OS === "ios" ? 10 : 8,
    borderRadius: 20,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 30,
    width: "100%",
    marginBottom: 27.5,
  },
  loginButton: {
    backgroundColor: AppColors.blue100,
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  registerContainer: {
    width: "100%",
    marginTop: 21,
    flexDirection: "row",
    justifyContent: "center",
  },
});
