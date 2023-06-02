import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";

import { IFormLoginInputs } from "../../utils/types/types";
import FlatButton from "../common/buttons/flat-button";
import IconInputField from "../common/input/icon-input-field";

type LoginFormProps = {
  onErrors: (errors: any) => void;
  onSubmit: (data: IFormLoginInputs) => void;
};

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
        rules={{ required: "Username is required." }}
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
        rules={{ required: "Password is required." }}
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
});
