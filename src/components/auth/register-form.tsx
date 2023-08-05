import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { IFormRegisterInputs } from "../../utils/types/types";
import FlatButton from "../common/buttons/flat-button";
import CheckBox from "../common/checkbox/checkbox";
import IconInputField from "../common/input/icon-input-field";
import AppText from "../common/typography/app-text";

type RegisterFormProps = {
  onErrors: (errors: any) => void;
  onSubmit: (data: IFormRegisterInputs) => void;
};

const windowWidth = Dimensions.get("window").width;

const RegisterForm: React.FC<RegisterFormProps> = ({ onErrors, onSubmit }) => {
  const { control, handleSubmit } = useForm<IFormRegisterInputs>();
  const { t } = useTranslation();

  return (
    <View style={styles.formContainer}>
      <View style={{ position: "relative", top: windowWidth * 0.07 }}>
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
              iconName='mail'
              size={24}
              placeholder={t("shared-auth.email")}
              onBlur={onBlur}
              style={{ backgroundColor: AppColors.blueMuted20, marginTop: 30 }}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='email'
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IconInputField
              style={{
                backgroundColor: AppColors.blueMuted20,
                marginTop: 30,
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <IconInputField
              style={{
                backgroundColor: AppColors.blueMuted20,
                marginTop: 30,
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
          name='repeatPassword'
          rules={{ required: "Password is required." }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <CheckBox onToggle={onChange} isChecked={value} />
              <AppText
                fontStyle='body'
                colorStyle='black64'
                style={{ marginLeft: 20 }}
              >
                {t("register.terms-of-use")}
              </AppText>
            </View>
          )}
          name='agreeTerms'
          rules={{ required: "You must accept the terms and conditions" }}
        />
      </View>
      <FlatButton
        fontStyle='bodyMedium'
        colorStyle='white'
        buttonStyle={styles.registerButton}
        onPress={handleSubmit(onSubmit, onErrors)}
      >
        {t("register.create-account")}
      </FlatButton>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: windowWidth * 0.1,
    flex: 1,
    justifyContent: "space-between",
  },
  checkboxContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: windowWidth * 0.1,
  },
  registerButton: {
    backgroundColor: AppColors.blue100,
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginTop: windowWidth * 0.1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
