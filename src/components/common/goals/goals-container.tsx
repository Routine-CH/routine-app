import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import { API_BASE_URL } from "../../../utils/config/config";
import AppColors from "../../../utils/constants/colors";
import { UserGoals } from "../../../utils/types/types";
import AddButton from "../buttons/add-button";
import AppText from "../typography/app-text";
import GoalsCard from "./goals-card";
import WorldIcon from "./icons-svg/world-icon";

const GoalsContainer: React.FC = () => {
  const [userGoals, setUserGoals] = useState<UserGoals[]>([]);
  const [isDisplayHorizontallScroll, setIsDisplayHorizontalScroll] =
    useState<boolean>(false);
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

  return userGoals.length > 0 ? (
    <View>
      {isDisplayHorizontallScroll ? (
        <>
          <ScrollView horizontal style={styles.horizontalScroll}>
            {userGoals.map((goal) => (
              <GoalsCard
                key={goal.id}
                //     image={}
                title={goal.title}
                description={goal.description}
                displayHorizontalScroll={isDisplayHorizontallScroll}
              />
            ))}
            <Pressable style={styles.showAllContainer}>
              <AppText
                fontStyle='heading4'
                colorStyle='white'
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
  ) : (
    <View style={styles.noGoalsContainer}>
      <View style={styles.noGoalsCard}>
        <Svg width='72' height='72'>
          <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <Stop offset='0%' stopColor='rgba(41, 104, 121, 1)' />
            <Stop offset='100%' stopColor='rgba(111, 153, 165, 1)' />
          </LinearGradient>
          <Rect
            x='0'
            y='0'
            width='72'
            height='72'
            rx='10'
            fill='url(#gradient)'
          />
          <View style={styles.iconContainer}>
            <WorldIcon />
          </View>
        </Svg>
        <View style={styles.textfields}>
          <AppText fontStyle='body' colorStyle='black64'>
            Woooh! All caught up!
          </AppText>
          <AppText fontStyle='body' colorStyle='black64'>
            Keep the work up!
          </AppText>
        </View>
      </View>
      <AddButton style={styles.buttonStyles} />
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
  noGoalsContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  noGoalsCard: {
    width: "100%",
    height: 120,
    backgroundColor: AppColors.blueMuted40,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  textfields: {
    width: 210,
    marginLeft: 15,
  },
});
