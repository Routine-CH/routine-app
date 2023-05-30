import { Text } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";

const TodosScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>Todos Screen</Text>
      <BackButton />
    </ScreenWrapper>
  );
};

export default TodosScreen;
