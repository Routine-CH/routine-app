import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { API_BASE_URL } from "../../utils/config/config";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import { AuthenticatedStackParamList } from "../../utils/types/routes/types";
import { UserGoals } from "../../utils/types/types";
import AddButton from "../common/buttons/add-button";
import AppText from "../common/typography/app-text";
import GoalsCard from "./goals-card";
import GoalsScrollView from "./goals-container/goals-scroll-view";
import NoGoalsCard from "./goals-container/no-goals-card";

const windowWidth = Dimensions.get("window").width;

const GoalsContainer: React.FC = () => {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);
  const [_, setIsDisplayHorizontalScroll] = useState<boolean>(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();

  useEffect(() => {
    async function getUserGoals() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}goals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserGoals(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get user goals", error);
      }
    }

    getUserGoals();
  }, []);

  useEffect(() => {
    setIsDisplayHorizontalScroll(userGoals.length > 0);
  }, [userGoals]);

  const navigateToAllGoals = () => {
    navigation.navigate("SubRoutes", { screen: "Goals" });
  };

  const navigateToNewGoalsScreen = () => {
    navigation.navigate("SubRoutes", { screen: "GoalsNew" });
  };

  return (
    <View style={styles.relativeContainer}>
      {userGoals.length === 0 ? (
        <View style={styles.container}>
          <NoGoalsCard />
          <AddButton style={styles.buttonStyles} />
        </View>
      ) : (
        <GoalsScrollView>
          {userGoals.slice(0, 3).map((goal) => (
            <GoalsCard
              key={goal.id}
              id={goal.id}
              title={goal.title}
              description={goal.description}
              displayHorizontalScroll={true}
            />
          ))}
          {userGoals.length > 3 && (
            <Pressable
              style={styles.showAllButton}
              onPress={navigateToAllGoals}
            >
              <AppText
                colorStyle='white'
                style={{
                  fontFamily: AppFontStyle.body.fontFamily,
                  fontSize: AppFontStyle.bodyMedium.fontSize,
                  textAlign: "center",
                }}
              >
                {t("goals.show-all")}
              </AppText>
            </Pressable>
          )}
        </GoalsScrollView>
      )}
      <AddButton
        style={styles.buttonStyles}
        navigateTo={() => navigateToNewGoalsScreen()}
      />
    </View>
  );
};

export default GoalsContainer;

const styles = StyleSheet.create({
  relativeContainer: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
  },
  buttonStyles: {
    position: "absolute",
    bottom: -30,
    right: windowWidth * 0.06,
  },
  showAllButton: {
    backgroundColor: AppColors.blue200,
    borderRadius: 13,
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowWidth * 0.05,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: windowWidth * 0.35,
  },
});
