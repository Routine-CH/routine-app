import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import GoalsCard from "../components/common/goals/goals-card";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { API_BASE_URL } from "../utils/config/config";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { UserGoals } from "../utils/types/types";

const GoalsScreen: React.FC = () => {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);
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

  const navigateToNewGoalsScreen = () => {
    navigation.navigate("SubRoutes", { screen: "GoalsNew" });
  };

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor='white'
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <AppText
          fontStyle='heading3'
          colorStyle='black70'
          style={{ marginVertical: 30 }}
        >
          {t("my-day.your-goals")}
        </AppText>
        <View style={{ marginBottom: 30 }}>
          {userGoals.length > 0 &&
            userGoals.map((goal) => {
              return (
                <View key={goal.id} style={styles.goalContainer}>
                  <GoalsCard
                    title={goal.title}
                    description={goal.description}
                  />
                </View>
              );
            })}
        </View>
      </ScrollViewScreenWrapper>
      <AddButton navigateTo={() => navigateToNewGoalsScreen()} />
    </>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  goalContainer: {
    flex: 1,
    position: "relative",
  },
});
