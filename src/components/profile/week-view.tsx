import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import WeekCard from "./week-card";

const WeekView = () => {
    const { t } = useTranslation();
    const data = [7, 12, 3, 19, 2, 0, 4];
    const labels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    return (
        <View style={styles.container}>
            <AppText fontStyle="heading3" style={styles.textColor}>
                {t("profile.gamification.your")}{" "}
                {t("profile.gamification.week")}
            </AppText>
            <View style={styles.statisticsContainer}>
                <AppText fontStyle="heading4" style={styles.textColor}>
                    {t("profile.gamification.reached")}{" "}
                    {t("profile.gamification.todos")}
                </AppText>
                <WeekCard data={data} labels={labels} />
            </View>
        </View>
    );
};

export default WeekView;

const styles = StyleSheet.create({
    textColor: {
        color: AppColors.black64,
    },
    container: {
        marginTop: 60,
    },
    statisticsContainer: {
        marginTop: 30,
    },
});
