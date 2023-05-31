import { Text } from "react-native";
import ToolsContainer from "../components/card/tools/tools-container";
import ScreenWrapper from "../components/common/screen-wrapper";

const DiscoverScreen: React.FC = () => {
  return (
    <ScreenWrapper defaultPadding>
      <Text>Discover</Text>
      <ToolsContainer />
    </ScreenWrapper>
  );
};

export default DiscoverScreen;
