import { useContext } from "react";
import { Button, Text } from "react-native";
import { AuthContext } from "../contexts/auth-context";

const ProfileScreen: React.FC = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <>
      <Text>Profile</Text>
      <Button title='Logout' onPress={handleLogout} />
    </>
  );
};

export default ProfileScreen;
