import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AllBadgesView from "../components/profile/all-badges-view";
import LevelsView from "../components/profile/levels-view";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const { width: screenWidth } = Dimensions.get("window");
const MAX_TRANSLATION_PERCENT = -50; // Adjust this value as needed
const MIN_TRANSLATION_PERCENT = 42; // Adjust this value as needed

const windowWidth = Dimensions.get("window").width;

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
        toValue: 0,
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
          outputRange: [
            (screenWidth * MIN_TRANSLATION_PERCENT) / 100,
            (screenWidth * MAX_TRANSLATION_PERCENT) / 50,
          ],
        }),
      },
    ],
  };

  const levelsViewStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            screenWidth,
            (screenWidth * -MIN_TRANSLATION_PERCENT) / 100,
          ],
        }),
      },
    ],
  };

  const { t } = useTranslation();

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollViewScreenWrapper
      backgroundColor='white'
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
            fontStyle='body'
            colorStyle='black70'
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
            fontStyle='body'
            colorStyle='black70'
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
        <Animated.View style={[styles.viewContainer, badgesViewStyle]}>
          <AllBadgesView />
        </Animated.View>
        <Animated.View style={[styles.viewContainer, levelsViewStyle]}>
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
    width: windowWidth * 0.39,
  },
  selectedHorizontalLine: {
    borderBottomColor: AppColors.blue100,
  },
  animatedContainer: {
    flexDirection: "row",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  viewContainer: {
    width: "100%",
    alignItems: "center",
  },
});
