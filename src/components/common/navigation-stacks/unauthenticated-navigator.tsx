import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPasswordScreen from "../../../screens/forgot-password-screen";
import LoginScreen from "../../../screens/login-screen";
import RegisterScreen from "../../../screens/register-screen";

const UnauthenticatedNavigator: React.FC = () => {
  const UnauthenticatedStack = createNativeStackNavigator();

  return (
    <UnauthenticatedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UnauthenticatedStack.Screen name='Login' component={LoginScreen} />
      <UnauthenticatedStack.Screen name='Register' component={RegisterScreen} />
      <UnauthenticatedStack.Screen
        name='ForgotPw'
        component={ForgotPasswordScreen}
      />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedNavigator;
