import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainRoutes from "./main-routes";
import SubRoutes from "./sub-routes";

const AuthenticatedNavigator: React.FC = () => {
  const AuthenticatedStack = createNativeStackNavigator();
  return (
    <AuthenticatedStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthenticatedStack.Screen name='MainRoutes' component={MainRoutes} />
      <AuthenticatedStack.Screen name='SubRoutes' component={SubRoutes} />
    </AuthenticatedStack.Navigator>
  );
};

export default AuthenticatedNavigator;
