import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthStackParamList } from "../utils/types/types";

const RegisterScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // submit login credentials
  const handleResetPw = async () => {
    const token = "your_jwt_token";
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.blueMuted30}
      statusBarColor={StatusBarColor.dark}
    >
      <></>
    </ScreenWrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
