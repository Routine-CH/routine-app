import { useTranslation } from "react-i18next";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppText from "../common/typography/app-text";

interface EmptyStateProps {
  description: string;
  style?: StyleProp<ViewStyle>;
}

const EmptyState: React.FC<EmptyStateProps> = ({ description, style }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={[styles.imgContainer, style]}>
        <Image
          source={require("../../assets/misc/task-list.png")}
          style={{ width: 80, height: 93 }}
        />
      </View>
      <AppText fontStyle="heading4" colorStyle="black70">
        {t("todos.no")} {t("profile.gamification.todos")}
      </AppText>
      <AppText
        fontStyle="body"
        colorStyle="black70"
        style={{ marginTop: 15, textAlign: "center" }}
      >
        {description}
      </AppText>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  imgContainer: {
    height: 128,
    width: 128,
    borderRadius: 100,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
