import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, View } from "react-native";
import LoginForm from "../components/auth/login-form";
import RegisterNavigation from "../components/auth/register-navigation";
import FlatButton from "../components/common/buttons/flat-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import { AuthContext } from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthStackParamList, IFormInputs } from "../utils/types/types";

const LoginScreen: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");

  // submit login credentials
  const onSubmit = async ({ username, password }: IFormInputs) => {
    const response = await login(username, password);
    if (response.status !== 200) {
      showToast(ToastType.error, response.data.message);
    } else {
      console.log(response);
    }
  };

  // onErrors is a function passed to the LoginForm component
  const onErrors = (errors: any) => {
    if (errors.username && errors.password) {
      setErrorMessage("Both username and password are required.");
    } else if (errors.username) {
      setErrorMessage(errors.username.message);
    } else if (errors.password) {
      setErrorMessage(errors.password.message);
    }
  };

  // check if there's an error message
  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const navigateToForgotPasswordScreen = () => {
    navigation.navigate("ForgotPw");
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
        <LoginForm onErrors={onErrors} onSubmit={onSubmit} />
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
        <RegisterNavigation onPress={navigateToRegisterScreen} />
      </View>
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
});
