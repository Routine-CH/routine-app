import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import RegisterForm from "../components/auth/register-form";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import { AuthContext } from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { IFormRegisterInputs } from "../utils/types/types";

const RegisterScreen: React.FC = () => {
  const { register } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  // submit register credentials
  const onSubmit = async ({
    username,
    email,
    password,
    repeatPassword,
  }: IFormRegisterInputs) => {
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      register(username, email, password);
    }
  };

  // onErrors is a function passed to the LoginForm component
  const onErrors = (errors: any) => {
    console.log(errors);
    if (
      errors.username ||
      errors.email ||
      errors.password ||
      errors.repeatPassword ||
      errors.agreeTerms
    ) {
      if (errors.username) {
        setErrorMessage(errors.username.message);
      } else if (errors.email) {
        setErrorMessage(errors.email.message);
      } else if (errors.password) {
        setErrorMessage(errors.password.message);
      } else if (errors.repeatPassword) {
        setErrorMessage(errors.repeatPassword.message);
      } else if (errors.agreeTerms) {
        setErrorMessage(errors.agreeTerms.message);
      }
    }
  };

  // check if there's an error message
  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={StatusBarColor.dark}
    >
      <ImageBackground
        source={require("../assets/misc/ellipse.png")}
        style={styles.splatterContainer}
        resizeMode='contain'
      >
        <View style={styles.textPlacement}>
          <AppText fontStyle='bodyMedium' colorStyle='white'>
            {t("register.welcome-1")}
          </AppText>
          <AppText
            fontStyle='bodyMedium'
            colorStyle='white'
            style={{ marginTop: 5 }}
          >
            {t("register.welcome-2")}
          </AppText>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <BackButton />
        <View style={{ marginTop: 26 }}>
          <AppText fontStyle='heading1' colorStyle='black64'>
            {t("register.register")}
          </AppText>
          <AppText fontStyle='heading1' colorStyle='black64'>
            {t("register.yourself")}
          </AppText>
        </View>
        <RegisterForm onSubmit={onSubmit} onErrors={onErrors} />
      </View>
      <RoutineToast />
    </ScreenWrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  splatterContainer: {
    position: "absolute",
    width: 237,
    height: 223,
    right: 0,
    top: Platform.OS === "ios" ? -20 : -60,
  },
  textPlacement: {
    position: "relative",
    top: 90,
    left: 55,
  },
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 30,
  },
});
