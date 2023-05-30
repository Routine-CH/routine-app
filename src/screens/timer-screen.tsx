import { Text } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";

const TimerScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>Timer Screen</Text>
      <BackButton />
    </ScreenWrapper>
  );
};

export default TimerScreen;
