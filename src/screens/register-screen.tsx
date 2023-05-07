import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import FlatButton from "../components/common/buttons/flat-button";
import CheckBox from "../components/common/checkbox/checkbox";
import IconInputField from "../components/common/input/icon-input-field";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { AuthContext } from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const RegisterScreen: React.FC = () => {
  const { register } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  // submit register credentials
  const handleRegisterUser = async (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {
    if (password === repeatPassword) {
      register(username, email, password);
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);
  };

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
        <IconInputField
          iconName='person'
          size={24}
          placeholder={t("shared-auth.username")}
          onChangeText={(text) => setUsername(text)}
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 60 }}
        />
        <IconInputField
          iconName='mail'
          size={24}
          placeholder={t("shared-auth.email")}
          onChangeText={(text) => setEmail(text)}
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 30 }}
        />
        <IconInputField
          iconName='lock-closed'
          size={24}
          placeholder={t("shared-auth.password")}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 30 }}
        />
        <IconInputField
          iconName='lock-closed'
          size={24}
          placeholder={t("shared-auth.repeat-password")}
          secureTextEntry={true}
          onChangeText={(text) => setRepeatPassword(text)}
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 30 }}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox onToggle={handleToggle} isChecked={isChecked} />
          <AppText
            fontStyle='body'
            colorStyle='black64'
            style={{ marginLeft: 20 }}
          >
            {t("register.terms-of-use")}
          </AppText>
        </View>
        <FlatButton
          fontStyle='bodyMedium'
          colorStyle='white'
          buttonStyle={styles.registerButton}
          onPress={() => {
            handleRegisterUser(username, email, password, repeatPassword);
          }}
        >
          {t("register.create-account")}
        </FlatButton>
      </View>
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
  checkboxContainer: {
    height: 53,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  registerButton: {
    backgroundColor: AppColors.blue100,
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
