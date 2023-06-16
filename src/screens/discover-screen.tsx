import { Text } from "react-native";
import AudioContainer from "../components/audio/audio-container";
import ToolsContainer from "../components/card/tools/tools-container";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import { StatusBarColor } from "../utils/types/enums";

const DiscoverScreen: React.FC = () => {
  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <Text>Discover</Text>
      <ToolsContainer />
      <AudioContainer />
      {/* <AudioPlayer
        title="Progressive Muskelrelaxtion"
        time="10 Minuten"
        image={require("../assets/misc/waves.jpg")}
      /> */}
    </ScrollViewScreenWrapper>
  );
};

export default DiscoverScreen;
