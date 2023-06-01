import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";
import BackButton from "./back-button";

const SaveButton = () => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <BackButton style={styles.buttonStyle} />
            <Pressable style={styles.saveButton}>
                <Icon
                    name="checkmark-outline"
                    size={22}
                    style={styles.textStyle}
                />
                <AppText
                    fontStyle="filters"
                    style={[styles.textStyle, { marginLeft: 10 }]}
                >
                    {t("shared-auth.save")}
                </AppText>
            </Pressable>
        </View>
    );
};

export default SaveButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonStyle: {
        backgroundColor: AppColors.blueMuted20,
        color: AppColors.blue100,
    },
    saveButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 32,
        width: "33%",
        borderRadius: 14,
        backgroundColor: AppColors.blue100,
    },
    textStyle: {
        color: AppColors.white,
    },
});
