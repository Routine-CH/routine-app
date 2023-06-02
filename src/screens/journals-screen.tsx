import { Text } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";

const JournalsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>Journals Screen</Text>
      <BackButton />
    </ScreenWrapper>
  );
};

export default JournalsScreen;