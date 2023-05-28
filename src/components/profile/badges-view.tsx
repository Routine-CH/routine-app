import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import Badge from "./badge";

const BadgesView = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.badgesContainer}>
            <View style={styles.textContainer}>
                <AppText fontStyle="heading3" style={styles.textColor}>
                    {t("profile.gamification.badges")}
                </AppText>
                <View style={styles.textContainer}>
                    <AppText fontStyle="body" style={styles.textColor}>
                        {t("profile.gamification.all")}
                    </AppText>
                    <Icon
                        name="chevron-forward"
                        size={20}
                        color={AppColors.black64}
                    />
                </View>
            </View>
            <Badge />
        </View>
    );
};

export default BadgesView;

const styles = StyleSheet.create({
    badgesContainer: {
        marginTop: 30,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    textColor: {
        color: AppColors.black64,
    },
});
