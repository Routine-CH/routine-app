import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface userProps {
    currentUser: {};
}

const YearCard: React.FC<userProps> = ({ currentUser }) => {
    const { t } = useTranslation();

    return (
        <View>
            <AppText fontStyle="heading3" style={styles.textColor}>
                {t("profile.gamification.your-year-in-numbers")}
            </AppText>
            <View style={styles.cardContainer}>
                <View style={styles.textContainer}>
                    <AppText fontStyle="bodyMedium" style={styles.text}>
                        32
                    </AppText>
                    <AppText fontStyle="body" style={styles.textColor}>
                        {t("profile.gamification.reached")}{" "}
                        {t("profile.gamification.todos")} ✅
                    </AppText>
                </View>
                <View style={styles.textContainer}>
                    <AppText fontStyle="bodyMedium" style={styles.text}>
                        105
                    </AppText>
                    <AppText fontStyle="body" style={styles.textColor}>
                        {t("profile.gamification.reached")}{" "}
                        {t("profile.gamification.goals")} 🎯
                    </AppText>
                </View>
                <View style={styles.textContainer}>
                    <AppText fontStyle="bodyMedium" style={styles.text}>
                        8
                    </AppText>
                    <AppText fontStyle="body" style={styles.textColor}>
                        {t("profile.gamification.meditated")}{" "}
                        {t("profile.gamification.minutes")} 📿
                    </AppText>
                </View>
                <View style={styles.textContainer}>
                    <AppText fontStyle="bodyMedium" style={styles.text}>
                        24
                    </AppText>
                    <AppText fontStyle="body" style={styles.textColor}>
                        {t("profile.gamification.journal-entries")} 📓
                    </AppText>
                </View>
            </View>
        </View>
    );
};

export default YearCard;

const styles = StyleSheet.create({
    textColor: {
        color: AppColors.black64,
    },
    cardContainer: {
        width: "100%",
        height: 264,
        backgroundColor: AppColors.blueMuted30,
        borderRadius: 13,
        marginTop: 30,
        justifyContent: "center",
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    text: {
        color: AppColors.black64,
        width: 35,
        textAlign: "right",
        marginRight: 40,
        marginLeft: 15,
    },
});
