import { Calendar } from "@ui-kitten/components";
import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AuthContext from "../contexts/auth-context";
import { StatusBarColor } from "../utils/types/enums";

const HomeScreen: React.FC = () => {
  const { signOut } = useContext(AuthContext)!;
  const [date, setDate] = React.useState(new Date());

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <ScreenWrapper backgroundColor='white' statusBarColor={StatusBarColor.dark}>
      <View style={{ paddingTop: 20 }}>
        <AppText fontStyle='headingBold' colorStyle='red' fontSize={30}>
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
