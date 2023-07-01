import { useTranslation } from "react-i18next";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppColors from "../../utils/constants/colors";
import JournalIcon from "../card/tools/tools-svg/journal-icon";
import NotesIcon from "../card/tools/tools-svg/notes-icon";
import AppText from "../common/typography/app-text";

interface EmptyStateProps {
  type: string;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={[styles.imgContainer, style]}>
        {type === "todo" && (
          <Image
            source={require("../../assets/misc/task-list.png")}
            style={{ width: 80, height: 93 }}
          />
        )}
        {type === "journal" && (
          <JournalIcon width={100} height={100} fill={AppColors.black70} />
        )}
        {type === "notes" && (
          <NotesIcon width={100} height={100} fill={AppColors.blue100} />
        )}
      </View>
      <AppText fontStyle="heading4" colorStyle="black70">
        {title}
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
