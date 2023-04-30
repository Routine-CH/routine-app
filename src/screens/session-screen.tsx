import React, { useContext, useState } from "react";
import {
  Image,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppText from "../components/common/app-text";
import ScreenWrapper from "../components/common/screen-wrapper";
import AuthContext from "../contexts/auth-context";

const SessionScreen: React.FC = () => {
  const { signIn } = useContext(AuthContext)!;
  const [parentHeight, setParentHeight] = useState(0);

  const handleLogin = async () => {
    const token = "your_jwt_token";
    await signIn(token);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setParentHeight(height);
  };

  const marginTopPercentage = 0.079;
  const marginBottomPercentage = 0.2;

  return (
    <ScreenWrapper backgroundColor='#296879' onLayout={onLayout}>
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            source={require("../assets/logo/logo.png")}
            style={{ width: 270, height: 41, marginTop: 94 }}
          />
          <AppText
            size={25}
            weight='bold'
            color='#296879'
            style={{ marginTop: 88 }}
          >
            WILLKOMMEN ZURÜCK
          </AppText>
          <View style={styles.formContainer}>
            <View style={styles.emailContainer}>
              <Icon
                name='person'
                size={24}
                color='rgba(0, 0, 0, 0.6)'
                style={{ marginLeft: 18, marginRight: 20 }}
              />
              <TextInput style={styles.textInput} placeholder='Benutzername' />
            </View>
            <View style={styles.passwordContainer}>
              <Icon
                name='lock-closed'
                size={24}
                color='rgba(0, 0, 0, 0.6)'
                style={{ marginLeft: 18, marginRight: 20 }}
              />
              <TextInput style={styles.textInput} placeholder='Passwort' />
            </View>
          </View>
          <Pressable style={styles.loginButton}>
            <AppText
              size={18}
              color='#fff'
              weight='medium'
              style={{ paddingVertical: 12, paddingHorizontal: 16 }}
            >
              LOGIN
            </AppText>
          </Pressable>
          <Pressable style={styles.forgotPwButton}>
            <AppText
              color='#296879'
              size={18}
              weight='medium'
              style={{ lineHeight: 25 }}
            >
              Passwort vergessen?
            </AppText>
          </Pressable>
        </View>
        <View style={styles.registerContainer}>
          <AppText
            color='#fff'
            size={18}
            weight='medium'
            style={{ lineHeight: 30 }}
          >
            Noch kein account?
          </AppText>
          <Pressable>
            <AppText
              color='#fff'
              size={18}
              weight='medium'
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    alignItems: "center",
    borderRadius: 20,
  },
  formContainer: {
    marginTop: 30,
    width: "100%",
    marginBottom: 60,
  },
  emailContainer: {
    backgroundColor: "rgba(185, 209, 217, 0.2);",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordContainer: {
    backgroundColor: "rgba(185, 209, 217, 0.2);",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  textInput: {
    flex: 1,
    borderColor: "transparent",
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: "Ubuntu_400Regular",
    color: "rgba(0,0,0,0.7))",
    marginRight: 20,
    placeholderTextColor: "rgba(0,0,0,0.7))",
  },
  loginButton: {
    backgroundColor: "#296879",
    width: "100%",
    alignItems: "center",
    borderRadius: 13,
    marginBottom: 27.5,
  },
  forgotPwButton: {
    marginBottom: 65.5,
  },
  registerContainer: {
    width: "100%",
    marginTop: 21,
    flexDirection: "row",
    justifyContent: "center",
  },
});
