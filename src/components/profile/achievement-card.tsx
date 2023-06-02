import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

const AchievementCard = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.achievementContainer}>
            <View style={styles.achievementContent}>
                <AppText
                    fontStyle="bodyMedium"
                    style={[styles.textColor, { marginBottom: 5 }]}
                >
                    4
                </AppText>
                <AppText fontStyle="body" style={styles.textColor}>
                    {t("profile.gamification.badges")}
                </AppText>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.achievementContent}>
                <AppText
                    fontStyle="bodyMedium"
                    style={[styles.textColor, { marginBottom: 5 }]}
                >
                    80
                </AppText>
                <AppText fontStyle="body" style={styles.textColor}>
                    {t("profile.gamification.points")}
                </AppText>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.achievementContent}>
                <AppText
                    fontStyle="bodyMedium"
                    style={[styles.textColor, { marginBottom: 5 }]}
                >
                    2
                </AppText>
                <AppText fontStyle="body" style={styles.textColor}>
                    {t("profile.gamification.level")}
                </AppText>
            </View>
        </View>
    );
};

export default AchievementCard;

const styles = StyleSheet.create({
    achievementContainer: {
        marginTop: 60,
        height: 83,
        borderRadius: 13,
        backgroundColor: AppColors.blueMuted40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    achievementContent: {
        alignItems: "center",
        marginHorizontal: 15,
    },
    textColor: {
        color: AppColors.black64,
    },
    verticalLine: {
        height: "80%",
        width: 1,
        backgroundColor: AppColors.white,
        marginHorizontal: 15,
    },
});
