import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RoutineTool from "../components/card/tools/routine-tool";
import GoalsIcon from "../components/card/tools/tools-svg/goals-icon";
import JournalIcon from "../components/card/tools/tools-svg/journal-icon";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import TimerIcon from "../components/card/tools/tools-svg/timer-icon";
import TodoIcon from "../components/card/tools/tools-svg/todo-icon";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import useUserMe from "../hooks/use-user-me";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

const getIconComponent = (titleKey: string) => {
  switch (titleKey) {
    case "Timer":
      return <TimerIcon />;
    case "Journals":
      return <JournalIcon />;
    case "Todos":
      return <TodoIcon />;
    case "Notes":
      return <NotesIcon />;
    case "Goals":
      return <GoalsIcon />;
    default:
      return null;
  }
};

const HomeScreen: React.FC = () => {
  const { currentUser } = useUserMe();
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();
  const navigateToScreen = (screenName: string) => {
    navigation.navigate("Home", { screen: screenName });
  };

  return currentUser ? (
    <ScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <ScrollView>
        <View style={{ paddingTop: 10 }}>
          <View>
            <AppText fontStyle='heading1' colorStyle='black64'>
              {t("my-day.hey")}
            </AppText>
            <AppText style={styles.userName} colorStyle='black64'>
              {currentUser.username} 😊
            </AppText>
          </View>
          <View style={styles.goalsContainer}>
            <AppText fontStyle='heading3' colorStyle='black64'>
              {t("my-day.your-goals")}
            </AppText>
            <Text>Goals Container here</Text>
          </View>
        </View>
        <View style={styles.toolsContainer}>
          <AppText fontStyle='heading3' colorStyle='black64'>
            {t("my-day.your-tools")}
          </AppText>
          <View style={styles.favouriteToolsContainer}>
            {currentUser.userTools.map((tool) => {
              return (
                <RoutineTool
                  key={tool.tool.titleKey}
                  title={t(tool.tool.titleKey)}
                  navigateTo={() => navigateToScreen(tool.tool.screenName)}
                >
                  {getIconComponent(tool.tool.screenName)}
                </RoutineTool>
              );
            })}
          </View>
        </View>
        <View style={styles.editToolsContainer}>
          <TouchableOpacity>
            <AppText fontStyle='body' colorStyle='black64'>
              {t("general.edit")}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  ) : null;
};

export default HomeScreen;

const styles = StyleSheet.create({
  userName: {
    fontSize: 30,
    fontWeight: "500",
  },
  goalsContainer: {
    marginTop: 60,
  },
  toolsContainer: {
    marginTop: 60,
  },
  favouriteToolsContainer: {
    marginTop: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  editToolsContainer: {
    marginTop: 60,
    alignItems: "center",
  },
});
