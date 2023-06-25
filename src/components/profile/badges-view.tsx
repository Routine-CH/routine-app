import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

type BadgesViewProps = {
  navigateTo: () => void;
};

const BadgesView: React.FC<BadgesViewProps> = ({ navigateTo }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.badgesContainer}>
      <View style={styles.textContainer}>
        <AppText fontStyle="heading3" colorStyle="black64">
          {t("profile.gamification.badges")}
        </AppText>
        <TouchableOpacity onPress={navigateTo} style={styles.textContainer}>
          <AppText fontStyle="body" colorStyle="black64">
            {t("profile.gamification.all")}
          </AppText>
          <Icon name="chevron-forward" size={20} color={AppColors.black64} />
        </TouchableOpacity>
      </View>
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
  },
});
