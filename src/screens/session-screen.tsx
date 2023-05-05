import React, { useContext } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../components/common/app-text";
import ScreenWrapper, {
  StatusBarColor,
} from "../components/common/screen-wrapper";
import AuthContext from "../contexts/auth-context";
import AppColors from "../utils/constants/colors";

const SessionScreen: React.FC = () => {
  const { signIn } = useContext(AuthContext)!;

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
          WILLKOMMEN ZURÜCK
        </AppText>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon
              name='person'
              size={24}
              color='rgba(0, 0, 0, 0.6)'
              style={{ marginLeft: 18, marginRight: 20 }}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Benutzername'
              placeholderTextColor='rgba(0,0,0,0.7))'
            />
          </View>
          <View style={[styles.inputContainer, { marginTop: 30 }]}>
            <Icon
              name='lock-closed'
              size={24}
              color='rgba(0, 0, 0, 0.6)'
              style={{ marginLeft: 18, marginRight: 20 }}
            />
            <TextInput
              style={styles.textInput}
              placeholder='Passwort'
              placeholderTextColor='rgba(0,0,0,0.7))'
            />
          </View>
          <Pressable style={styles.loginButton}>
            <AppText
              fontStyle='bodyMedium'
              colorStyle='white'
              fontSize={18}
              style={{ paddingVertical: 12, paddingHorizontal: 16 }}
            >
              LOGIN
            </AppText>
          </Pressable>
        </View>
        <Pressable>
          <AppText
            fontStyle='bodyMedium'
            colorStyle='blue100'
            fontSize={18}
            style={{ lineHeight: 25 }}
          >
            Passwort vergessen?
          </AppText>
        </Pressable>
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
          <Pressable>
            <AppText
              fontStyle='bodyMedium'
              colorStyle='white'
              fontSize={18}
              style={{ marginLeft: 5, lineHeight: 30 }}
            >
              Registrier dich!
            </AppText>
          </Pressable>
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
  inputContainer: {
    backgroundColor: "rgba(185, 209, 217, 0.2);",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderColor: "transparent",
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: "Ubuntu_400Regular",
    color: "rgba(0,0,0,0.7))",
    marginRight: 20,
  },
  loginButton: {
    backgroundColor: "#296879",
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 60,
  },
  registerContainer: {
    width: "100%",
    marginTop: 21,
    flexDirection: "row",
    justifyContent: "center",
  },
});
