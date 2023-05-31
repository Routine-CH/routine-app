import { Text } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";

const GoalsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>Goals Screen</Text>
      <BackButton />
    </ScreenWrapper>
  );
};

export default GoalsScreen;
