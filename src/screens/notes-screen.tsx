import { Text } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";

const NotesScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>Notes Screen</Text>
      <BackButton />
    </ScreenWrapper>
  );
};

export default NotesScreen;