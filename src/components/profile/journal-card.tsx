import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

const JournalCard = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.outerContainer}>
            <View style={[styles.innerContainer, styles.noEntryContainer]}>
                <AppText fontStyle="body" style={styles.noEntryText}>
                    {t("profile.gamification.mon")}
                </AppText>
            </View>
            <View
                style={[styles.innerContainer, styles.entryAvailableContainer]}
            >
                <AppText fontStyle="body" style={styles.entryAvailableText}>
                    {t("profile.gamification.tue")}
                </AppText>
            </View>
            <View
                style={[styles.innerContainer, styles.entryAvailableContainer]}
            >
                <AppText fontStyle="body" style={styles.entryAvailableText}>
                    {t("profile.gamification.wed")}
                </AppText>
            </View>
            <View
                style={[styles.innerContainer, styles.entryAvailableContainer]}
            >
                <AppText fontStyle="body" style={styles.entryAvailableText}>
                    {t("profile.gamification.thu")}
                </AppText>
            </View>
            <View style={[styles.innerContainer, styles.noEntryContainer]}>
                <AppText fontStyle="body" style={styles.noEntryText}>
                    {t("profile.gamification.fri")}
                </AppText>
            </View>
            <View style={[styles.innerContainer, styles.noEntryContainer]}>
                <AppText fontStyle="body" style={styles.noEntryText}>
                    {t("profile.gamification.sat")}
                </AppText>
            </View>
            <View
                style={[styles.innerContainer, styles.entryAvailableContainer]}
            >
                <AppText fontStyle="body" style={styles.entryAvailableText}>
                    {t("profile.gamification.sun")}
                </AppText>
            </View>
        </View>
    );
};

export default JournalCard;
const styles = StyleSheet.create({
    outerContainer: {
        height: 77,
        width: "100%",
        marginTop: 30,
        borderRadius: 13,
        backgroundColor: AppColors.blueMuted40,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    innerContainer: {
        height: 43,
        width: 43,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    noEntryContainer: {
        backgroundColor: AppColors.white,
    },
    noEntryText: {
        color: AppColors.black64,
    },
    entryAvailableContainer: {
        backgroundColor: AppColors.blue200,
    },
    entryAvailableText: {
        color: AppColors.white,
    },
});
