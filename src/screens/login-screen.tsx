import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Image, Platform, StyleSheet, View } from "react-native";
import FlatButton from "../components/common/buttons/flat-button";
import IconInputField from "../components/common/input/icon-input-field";
import ScreenWrapper from "../components/common/screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import { AuthContext } from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthStackParamList } from "../utils/types/types";

const LoginScreen: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // submit login credentials
  const handleLogin = async (username: string, password: string) => {
    const response = await login(username, password);
    if (response.status !== 200) {
      showToast(ToastType.error, response.data.message);
    } else {
      console.log(response);
    }
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const navigateToForgotPasswordScreen = () => {
    navigation.navigate("ForgotPw");
  };

  // TODO: Change toast message to take from the backend
  const showToastHandler = () => {
    showToast(ToastType.success, "success");
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.blue100}
      statusBarColor={StatusBarColor.light}
    >
      <View style={styles.outerContainer1} />
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/logo/logo.png")}
          style={{ width: 270, height: 41 }}
        />
        <AppText
          fontStyle='heading3'
          colorStyle='blue100'
          style={{ marginTop: 60 }}
        >
          {t("login.welcome")}
        </AppText>
        <View style={styles.formContainer}>
          <IconInputField
            iconName='person'
            size={24}
            placeholder={t("shared-auth.username")}
            style={{ backgroundColor: AppColors.blueMuted20 }}
            onChangeText={(text) => setUsername(text)}
          />
          <IconInputField
            style={{ marginTop: 30, backgroundColor: AppColors.blueMuted20 }}
            iconName='lock-closed'
            size={24}
            placeholder={t("shared-auth.password")}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <FlatButton
            fontStyle='bodyMedium'
            colorStyle='white'
            buttonStyle={styles.loginButton}
            onPress={() => {
              handleLogin(username, password);
            }}
          >
            {t("login.login")}
          </FlatButton>
        </View>
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='blue100'
          style={{ lineHeight: 25 }}
          onPress={navigateToForgotPasswordScreen}
        >
          {t("shared-auth.forgot-pw")}
        </FlatButton>
      </View>
      <View style={styles.outerContainer2}>
        <View style={styles.registerContainer}>
          <AppText
            fontStyle='body'
            colorStyle='white'
            style={{ lineHeight: 30 }}
          >
            {t("shared-auth.no-account")}
          </AppText>
          <FlatButton
            fontStyle='bodyMedium'
            colorStyle='white'
            style={{ marginLeft: 5, lineHeight: 30 }}
            onPress={navigateToRegisterScreen}
          >
            {t("shared-auth.register")}
          </FlatButton>
        </View>
      </View>
      <Button title='Show toast' onPress={showToastHandler} />
      <RoutineToast />
    </ScreenWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  outerContainer1: { backgroundColor: AppColors.blue100, flex: 1 },
  outerContainer2: { backgroundColor: AppColors.blue100, flex: 2 },
  innerContainer: {
    backgroundColor: AppColors.white,
    flex: Platform.OS === "ios" ? 18 : 10,
    borderRadius: 20,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 60,
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
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
});
