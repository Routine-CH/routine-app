import { Calendar } from "@ui-kitten/components";
import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import AppText from "../components/common/app-text";
import ScreenWrapper from "../components/common/screen-wrapper";
import AuthContext from "../contexts/auth-context";

const HomeScreen: React.FC = () => {
  const { signOut } = useContext(AuthContext)!;
  const [date, setDate] = React.useState(new Date());

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper backgroundColor='white'>
      <View style={{ paddingTop: 20 }}>
        <AppText size={30} weight='bold' color='red'>
          Home Screen
        </AppText>
        <Button title='Logout' onPress={handleLogout} />
        <Calendar date={date} onSelect={(nextDate) => setDate(nextDate)} />
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textContainer: {
    borderColor: "black",
    borderWidth: 1,
    fontSize: 30,
  },
});
