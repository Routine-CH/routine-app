import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../contexts/auth-context";
import useCurrentFullUser from "../hooks/use-current-full-user";

const ProfileScreen: React.FC = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut();
  };

  const { currentUser } = useCurrentFullUser();

  return (
    <View style={styles.outerContainer}>
      <Text>Profile</Text>
      <Button title='Logout' onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 50,
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
  },
});
