import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import RoutineTool from "../components/card/tools/routine-tool";
import GoalsIcon from "../components/card/tools/tools-svg/goals-icon";
import JournalIcon from "../components/card/tools/tools-svg/journal-icon";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import SelectIcon from "../components/card/tools/tools-svg/select-icon";
import TimerIcon from "../components/card/tools/tools-svg/timer-icon";
import TodoIcon from "../components/card/tools/tools-svg/todo-icon";
import GoalsContainer from "../components/common/goals/goals-container";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
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
  const shouldDisplayHorizontalScroll = true;
  const { currentUser, refetch } = useUserMe();
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();
  const navigateToScreen = (screenName: string) => {
    navigation.navigate("Home", { screen: screenName });
  };

  // refetching of data when changing tabs, so that favourite tools are updated
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return currentUser ? (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      // defaultPadding
    >
      <View style={{ paddingTop: 10, flex: 1 }}>
        <View style={{ marginHorizontal: 30 }}>
          <AppText fontStyle="heading1" colorStyle="black64">
            {t("my-day.hey")}
          </AppText>
          <AppText style={styles.userName} colorStyle="black64">
            {currentUser.username} 😊
          </AppText>
        </View>
        <View style={styles.goalsContainer}>
          <AppText
            fontStyle="heading3"
            colorStyle="black64"
            style={{ marginBottom: 30, marginHorizontal: 30 }}
          >
            {t("my-day.your-goals")}
          </AppText>
          <GoalsContainer
            displayHorizontalScroll={shouldDisplayHorizontalScroll}
          />
        </View>
      </View>
      <View style={styles.toolsContainer}>
        <AppText fontStyle="heading3" colorStyle="black64">
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Home", {
                    screen: "EditTools",
                  })
                }
              >
                <AppText fontStyle="body" colorStyle="black64">
                  {t("general.edit")}
                </AppText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.noToolsContainer}
            onPress={() => navigation.navigate("Home", { screen: "EditTools" })}
          >
            <LinearGradient
              colors={["#296879", "#6F99A5"]}
              style={styles.linearGradient}
            >
              <SelectIcon style={styles.iconPlacement} />
            </LinearGradient>
            <View style={styles.textPlacement}>
              <AppText fontStyle="body" colorStyle="black70">
                {t("my-day.add-tools")}
              </AppText>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollViewScreenWrapper>
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
    marginHorizontal: 30,
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
