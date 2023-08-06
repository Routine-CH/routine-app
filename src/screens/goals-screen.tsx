import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import { LoadingIndicator } from "../components/common/loading-indicator";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import GoalsCard from "../components/goals/goals-card";
import { useGoalStore } from "../store/goals-store";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";

const GoalsScreen: React.FC = () => {
  const { userGoals, loadUserGoals, dataUpdated, isLoading } = useGoalStore();
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();

  useEffect(() => {
    loadUserGoals();
  }, [dataUpdated]);

  const navigateToNewGoalsScreen = () => {
    navigation.navigate("SubRoutes", { screen: "GoalsNew" });
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
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
                    id={goal.id}
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
