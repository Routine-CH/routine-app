import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AllBadgesView from "../components/profile/all-badges-view";
import LevelsView from "../components/profile/levels-view";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const BadgesScreen = () => {
  const [selectedView, setSelectedView] = useState<"badges" | "levels">(
    "badges"
  );
  const [slideAnimation] = useState(new Animated.Value(0));

  const handleViewChange = (view: "badges" | "levels") => {
    if (view === "levels") {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setSelectedView(view);
  };

  const badgesViewStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-200, -400],
        }),
      },
    ],
  };

  const levelsViewStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [200, -330],
        }),
      },
    ],
  };

  const { t } = useTranslation();

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleViewChange("badges")}
        >
          <AppText
            fontStyle="body"
            colorStyle="black70"
            style={styles.titleButton}
          >
            {t("profile.gamification.badges")}
          </AppText>
          <View
            style={[
              styles.horizontalLine,
              selectedView === "badges" && styles.selectedHorizontalLine,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleViewChange("levels")}
        >
          <AppText
            fontStyle="body"
            colorStyle="black70"
            style={styles.titleButton}
          >
            {t("profile.gamification.levels")}
          </AppText>
          <View
            style={[
              styles.horizontalLine,
              selectedView === "levels" && styles.selectedHorizontalLine,
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.animatedContainer}>
        <Animated.View style={badgesViewStyle}>
          <AllBadgesView />
        </Animated.View>
        <Animated.View style={levelsViewStyle}>
          <LevelsView />
        </Animated.View>
      </View>
    </ScrollViewScreenWrapper>
  );
};

export default BadgesScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
  },
  titleButton: {
    marginBottom: 10,
  },
  horizontalLine: {
    borderBottomWidth: 4,
    borderRadius: 50,
    borderBottomColor: AppColors.blue300,
    width: 150,
  },
  selectedHorizontalLine: {
    borderBottomColor: AppColors.blue100,
  },
  animatedContainer: {
    flexDirection: "row",
  },
});
