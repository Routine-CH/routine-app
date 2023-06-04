import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { API_BASE_URL } from "../../../utils/config/config";
import { UserGoals } from "../../../utils/types/types";
import GoalsCard from "./goals-card";

interface GoalsContainerProps {}

const GoalsContainer: React.FC<GoalsContainerProps> = () => {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);

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
  }, [userGoals]);

  return (
    <View>
      {userGoals.map((goal, index) => (
        <GoalsCard
          key={index}
          // image={goal.image}
          title={goal.title}
          description={goal.description}
        />
      ))}
    </View>
  );
};

export default GoalsContainer;
