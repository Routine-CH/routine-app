import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";

import { IFormLoginInputs } from "../../utils/types/types";
import FlatButton from "../common/buttons/flat-button";
import IconInputField from "../common/input/icon-input-field";

type LoginFormProps = {
  onErrors: (errors: any) => void;
  onSubmit: (data: IFormLoginInputs) => void;
};

const windowHeight = Dimensions.get("window").height;

const LoginForm: React.FC<LoginFormProps> = ({ onErrors, onSubmit }) => {
  const { control, handleSubmit } = useForm<IFormLoginInputs>();
  const { t } = useTranslation();

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <IconInputField
            iconName='person'
            size={24}
            placeholder={t("shared-auth.username")}
            onBlur={onBlur}
            style={{ backgroundColor: AppColors.blueMuted20 }}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='username'
        rules={{ required: "Username ist erforderlich" }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <IconInputField
            style={{
              marginTop: 30,
              backgroundColor: AppColors.blueMuted20,
            }}
            iconName='lock-closed'
            size={24}
            placeholder={t("shared-auth.password")}
            onBlur={onBlur}
            secureTextEntry={true}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='password'
        rules={{ required: "Passwort ist erforderlich" }}
      />
      <FlatButton
        fontStyle='bodyMedium'
        colorStyle='white'
        buttonStyle={styles.loginButton}
        onPress={handleSubmit(onSubmit, onErrors)}
      >
        {t("login.login")}
      </FlatButton>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: windowHeight * 0.06,
    width: "100%",
    marginBottom: windowHeight * 0.027,
  },
  loginButton: {
    backgroundColor: AppColors.blue100,
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginTop: windowHeight * 0.065,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
