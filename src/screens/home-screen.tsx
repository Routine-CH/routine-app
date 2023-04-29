import { Container } from "native-base";
import React, { useContext } from "react";
import { Button, Text } from "react-native";
import ScreenWrapper from "../components/common/screen-wrapper";
import AuthContext from "../contexts/auth-context";

const HomeScreen: React.FC = () => {
  const { signOut } = useContext(AuthContext)!;

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper backgroundColor='white'>
      <Container style={{ paddingTop: 20 }}>
        <Text>Home Screen</Text>
        <Button title='Logout' onPress={handleLogout} />
      </Container>
    </ScreenWrapper>
  );
};

export default HomeScreen;
