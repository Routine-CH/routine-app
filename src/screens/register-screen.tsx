import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import RegisterForm from "../components/auth/register-form";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import { AuthContext } from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { IFormRegisterInputs } from "../utils/types/types";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

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
      const response = await register(username, email, password);
      if (response.status !== 201) {
        showToast(ToastType.error, response.data.message);
      }
    }
  };

  // onErrors is a function passed to the LoginForm component
  const onErrors = (errors: any) => {
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
      defaultPadding
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
        <View style={{ marginTop: windowWidth * 0.05 }}>
          <AppText
            colorStyle='black64'
            style={{
              position: "relative",
              top: windowWidth * 0.05,
              fontSize: windowWidth * 0.1,
              fontFamily: AppFontStyle.heading1.fontFamily,
            }}
          >
            {t("register.register")}
          </AppText>
          <AppText
            colorStyle='black64'
            style={{
              position: "relative",
              top: windowWidth * 0.05,
              fontSize: windowWidth * 0.1,
              fontFamily: AppFontStyle.heading1.fontFamily,
            }}
          >
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
    width: windowWidth * 0.6,
    height: windowHeight * 0.24,
    right: 0,
    top: windowWidth * -0.09,
  },
  textPlacement: {
    position: "relative",
    top: windowWidth * 0.2,
    left: windowWidth * 0.15,
  },
  container: {
    flex: 1,
  },
});
