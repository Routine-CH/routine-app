import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import FlatButton from "../components/common/buttons/flat-button";
import CheckBox from "../components/common/checkbox/checkbox";
import IconInputField from "../components/common/input/icon-input-field";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const RegisterScreen: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useTranslation();

  // submit register credentials
  const handleRegisterUser = async () => {
    const token = "your_jwt_token";
  };

  const handleToggle = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.white}
      statusBarColor={StatusBarColor.dark}
    >
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
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 60 }}
        />
        <IconInputField
          iconName='mail'
          size={24}
          placeholder={t("shared-auth.email")}
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 30 }}
        />
        <IconInputField
          iconName='lock-closed'
          size={24}
          placeholder={t("shared-auth.password")}
          style={{ backgroundColor: AppColors.blueMuted20, marginTop: 30 }}
        />
        <IconInputField
          iconName='lock-closed'
          size={24}
          placeholder={t("shared-auth.repeat-password")}
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
          onPress={handleRegisterUser}
        >
          {t("register.create-account")}
        </FlatButton>
      </View>
    </ScreenWrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
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
