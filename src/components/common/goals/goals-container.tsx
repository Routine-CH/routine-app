import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { API_BASE_URL } from "../../../utils/config/config";
import { UserGoals } from "../../../utils/types/types";
import AddButton from "../buttons/add-button";
import GoalsCard from "./goals-card";
import GoalsScrollView from "./goals-container/goals-scroll-view";
import NoGoalsCard from "./goals-container/no-goals-card";

const GoalsContainer: React.FC = () => {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);
  const [_, setIsDisplayHorizontalScroll] = useState<boolean>(false);

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

  return (
    <View style={styles.relativeContainer}>
      {userGoals.length === 0 ? (
        <View style={styles.container}>
          <NoGoalsCard />
          <AddButton style={styles.buttonStyles} />
        </View>
      ) : (
        <GoalsScrollView>
          {userGoals.map((goal) => (
            <GoalsCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
            />
          ))}
        </GoalsScrollView>
      )}
      <AddButton style={styles.buttonStyles} />
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
    paddingHorizontal: 30,
  },
  buttonStyles: {
    position: "absolute",
    bottom: -30,
    right: 35,
  },
});
