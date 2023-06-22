import { StyleSheet, View } from "react-native";
import AudioContainer from "../components/audio/audio-container";
import Chip from "../components/calendar/chip";
import ToolsContainer from "../components/card/tools/tools-container";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const DiscoverScreen: React.FC = () => {
  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View style={styles.filterContainer}>
        <Chip text="Produktivität" style={styles.filter} />
        <Chip text="Achtsamkeit" style={styles.filter} />
        <Chip text="Schlaf" style={styles.filter} />
        <Chip text="Emotionen" style={styles.filter} />
      </View>
      <ToolsContainer />
      <AudioContainer />
    </ScrollViewScreenWrapper>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filter: {
    width: "48%",
    backgroundColor: AppColors.blue300,
    marginBottom: 15,
  },
});
