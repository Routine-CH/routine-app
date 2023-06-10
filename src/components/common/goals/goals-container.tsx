import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { API_BASE_URL } from "../../../utils/config/config";
import AppColors from "../../../utils/constants/colors";
import { UserGoals } from "../../../utils/types/types";
import AddButton from "../buttons/add-button";
import AppText from "../typography/app-text";
import GoalsCard from "./goals-card";

interface GoalsContainerProps {
  displayHorizontalScroll?: boolean;
}

const GoalsContainer: React.FC<GoalsContainerProps> = ({
  displayHorizontalScroll,
}) => {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);
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
  }, [userGoals]);

  return (
    <View>
      {displayHorizontalScroll ? (
        <>
          <ScrollView horizontal style={styles.horizontalScroll}>
            {userGoals.map((goal) => (
              <GoalsCard
                key={goal.id}
                //     image={}
                title={goal.title}
                description={goal.description}
                displayHorizontalScroll={displayHorizontalScroll}
              />
            ))}
            <Pressable style={styles.showAllContainer}>
              <AppText
                fontStyle="heading4"
                colorStyle="white"
                style={{ textAlign: "center" }}
              >
                {t("goals.show-all")}
              </AppText>
            </Pressable>
          </ScrollView>
          <AddButton style={styles.buttonStyles} />
        </>
      ) : (
        <View>
          {userGoals.map((goal) => (
            <GoalsCard
              key={goal.id}
              //     image={}
              title={goal.title}
              description={goal.description}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default GoalsContainer;

const styles = StyleSheet.create({
  horizontalScroll: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  showAllContainer: {
    width: 120,
    height: 120,
    borderRadius: 13,
    backgroundColor: AppColors.blue200,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 60,
    marginLeft: 15,
  },
  buttonStyles: {
    position: "absolute",
    bottom: -30,
    right: 30,
  },
});
