import { Pressable, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface JournalCardProps {
  title: string;
}

const JournalCard: React.FC<JournalCardProps> = ({ title }) => {
  return (
    <Pressable style={styles.container}>
      <View>
        <AppText
          fontStyle="body"
          colorStyle="black70"
          style={[styles.textStyle, { marginBottom: 5 }]}
        >
          {title}
        </AppText>
      </View>
    </Pressable>
  );
};

export default JournalCard;

const styles = StyleSheet.create({
  container: {
    height: 72,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginLeft: 5,
    marginBottom: 15,
    backgroundColor: AppColors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    width: 165,
  },
});
