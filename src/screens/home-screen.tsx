import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
import SelectIcon from "../components/card/tools/tools-svg/select-icon";
import TimerIcon from "../components/card/tools/tools-svg/timer-icon";
import TodoIcon from "../components/card/tools/tools-svg/todo-icon";
import ScreenWrapper from "../components/common/screen-wrapper";
import AppText from "../components/common/typography/app-text";
import useUserMe from "../hooks/use-user-me";
import AppColors from "../utils/constants/colors";
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
          {currentUser.userTools.length != 0 ? (
            <>
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
              <View style={styles.editToolsContainer}>
                <TouchableOpacity>
                  <AppText fontStyle='body' colorStyle='black64'>
                    {t("general.edit")}
                  </AppText>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity style={styles.noToolsContainer}>
              <LinearGradient
                colors={["#296879", "#6F99A5"]}
                style={styles.linearGradient}
              >
                <SelectIcon style={styles.iconPlacement} />
              </LinearGradient>
              <View style={styles.textPlacement}>
                <AppText fontStyle='body' colorStyle='black70'>
                  {t("my-day.add-tools")}
                </AppText>
              </View>
            </TouchableOpacity>
          )}
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
  noToolsContainer: {
    marginTop: 30,
    width: "100%",
    height: 100,
    borderRadius: 13,
    backgroundColor: AppColors.blue300,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  linearGradient: {
    display: "flex",
    borderRadius: 10,
    height: 72,
    width: 72,
  },
  iconPlacement: {
    position: "relative",
    top: 5,
  },
  textPlacement: {
    width: 200,
    height: 55,
    justifyContent: "center",
  },
});
